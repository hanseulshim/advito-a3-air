<template>
  <div v-loading="$apollo.loading" class="rule-container">
    <p class="rule-title">Marketing Airline</p>
    <i
      v-if="!editMode"
      class="fas fa-pencil-alt edit-rule"
      @click="saveRules"
    />
    <button v-if="editMode" class="save-rule" @click="saveRules">Save</button>
    <div v-if="editMode" class="control-row">
      <el-select
        v-model="selectedAirline"
        filterable
        :filter-method="setQueryString"
        placeholder="Select"
        size="mini"
        clearable
        multiple
      >
        <el-option
          v-for="item in filteredAirlineList"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        ></el-option>
      </el-select>
      <label for="exclude">Exclude:</label>
      <el-checkbox v-model="exclude" name="exclude" />
      <button @click="createTag">Add</button>
    </div>
    <div class="rule-tags">
      <label v-if="includedRules.length">Included:</label>
      <el-tag
        v-for="rule in includedRules"
        :key="rule.index"
        type="info"
        size="small"
        closable
        @close="deleteTag(rule)"
        >{{ rule.carrierCode }}</el-tag
      >
    </div>
    <div class="rule-tags">
      <label v-if="excludedRules.length">Excluded:</label>
      <el-tag
        v-for="rule in excludedRules"
        :key="rule.index"
        type="info"
        size="small"
        closable
        @close="deleteTag(rule)"
        >{{ rule.carrierCode }}</el-tag
      >
    </div>
  </div>
</template>
<script>
import { removeTypename, filterByNameAndCode } from '@/helper';
import {
  GET_AIRLINE_LIST,
  GET_AIRLINE_RULE_LIST,
  GET_DISCOUNT,
  GET_TARGET_TERM,
  GET_PRICING_TERM,
  GET_CONTRACT
} from '@/graphql/queries';
import { UPDATE_AIRLINE_RULE } from '@/graphql/mutations';
import { PRICING_TERM_LOOKUP } from '@/graphql/constants';
export default {
  name: 'MarketingAirline',
  props: {
    parentId: {
      default: null,
      type: Number
    },
    tableId: {
      default: null,
      type: Number
    },
    parentType: {
      default: null,
      type: Number
    },
    pricingTermId: {
      default: null,
      type: Number
    },
    contractId: {
      default: null,
      type: Number
    }
  },
  apollo: {
    airlineList: {
      query: GET_AIRLINE_LIST
    },
    airlineRuleList: {
      query: GET_AIRLINE_RULE_LIST,
      variables() {
        return {
          parentId: this.parentId,
          parentType: this.parentType,
          airlineType: PRICING_TERM_LOOKUP.MARKETING_AIRLINE_RULETYPE
        };
      },
      result({ data: { airlineRuleList } }) {
        return removeTypename(airlineRuleList);
      }
    }
  },
  data() {
    return {
      airlineList: [],
      airlineRuleList: [],
      query: '',
      exclude: false,
      editMode: false,
      selectedAirline: [],
      discountQueries: [
        {
          query: GET_AIRLINE_RULE_LIST,
          variables: {
            parentId: this.parentId,
            parentType: this.parentType,
            airlineType: PRICING_TERM_LOOKUP.MARKETING_AIRLINE_RULETYPE
          }
        },
        {
          query: GET_DISCOUNT,
          variables: {
            id: this.parentId
          }
        },
        {
          query: GET_PRICING_TERM,
          variables: {
            id: this.pricingTermId
          }
        },
        {
          query: GET_CONTRACT,
          variables: {
            id: this.contractId
          }
        }
      ],
      targetTermQueries: [
        {
          query: GET_AIRLINE_RULE_LIST,
          variables: {
            parentId: this.parentId,
            parentType: this.parentType,
            airlineType: PRICING_TERM_LOOKUP.MARKETING_AIRLINE_RULETYPE
          }
        },
        {
          query: GET_TARGET_TERM,
          variables: {
            id: this.parentId
          }
        },
        {
          query: GET_CONTRACT,
          variables: {
            id: this.contractId
          }
        }
      ]
    };
  },
  computed: {
    excludedRules() {
      return this.airlineRuleList.filter(rule => rule.exclude);
    },
    includedRules() {
      return this.airlineRuleList.filter(rule => !rule.exclude);
    },
    filteredAirlineList() {
      if (this.query) {
        return filterByNameAndCode(this.airlineList, this.query).filter(
          airline =>
            !this.airlineRuleList.some(
              rule => rule.carrierCode === airline.code
            )
        );
      } else
        return this.airlineList.filter(
          airline =>
            !this.airlineRuleList.some(
              rule => rule.carrierCode === airline.code
            )
        );
    }
  },
  methods: {
    async saveRules() {
      try {
        if (this.editMode && !this.airlineRuleList.length) {
          this.$emit('delete-rule', 'MarketingAirline');
        } else if (this.editMode) {
          await this.$apollo.mutate({
            mutation: UPDATE_AIRLINE_RULE,
            variables: {
              parentId: this.parentId,
              parentType: this.parentType,
              airlineRuleList: this.airlineRuleList,
              airlineType: PRICING_TERM_LOOKUP.MARKETING_AIRLINE_RULETYPE
            },
            refetchQueries: () =>
              this.parentType === 1
                ? this.discountQueries
                : this.targetTermQueries
          });
        }
        if (this.parentType === 1) {
          this.$emit('toggle-row', this.pricingTermId);
        }
        this.editMode = !this.editMode;
        this.selectedAirline = [];
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    createTag() {
      const ruleContainerId = this.airlineRuleList.length
        ? this.airlineRuleList[0].ruleContainerId
        : null;

      if (this.selectedAirline.length) {
        this.selectedAirline.map(v => {
          this.airlineRuleList.push({
            id: null,
            ruleContainerId,
            ruleType: PRICING_TERM_LOOKUP.MARKETING_AIRLINE_RULETYPE,
            carrierCode: v,
            exclude: this.exclude,
            isDeleted: false
          });
        });

        this.selectedAirline = [];
      } else {
        this.$modal.show('error', {
          message: 'Please select an airline'
        });
      }
    },
    async deleteTag(tag) {
      try {
        const idx = this.airlineRuleList.indexOf(tag);
        this.airlineRuleList[idx].isDeleted = true;

        await this.$apollo
          .mutate({
            mutation: UPDATE_AIRLINE_RULE,
            variables: {
              parentId: this.parentId,
              parentType: this.parentType,
              airlineRuleList: this.airlineRuleList,
              airlineType: PRICING_TERM_LOOKUP.MARKETING_AIRLINE_RULETYPE
            },
            refetchQueries: () =>
              this.parentType === 1
                ? this.discountQueries
                : this.targetTermQueries
          })
          .then(() => {
            const rulesRemaining = this.airlineRuleList.some(
              rule => !rule.isDeleted
            );
            if (!this.airlineRuleList.length || !rulesRemaining) {
              this.$emit('delete-rule', 'MarketingAirline');
              this.$emit('toggle-row', this.pricingTermId);
            }
          });
        if (this.parentType === 1) {
          this.$emit('toggle-row', this.pricingTermId);
        }
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    setQueryString(query) {
      this.query = query;
    }
  }
};
</script>
<style lang="scss">
@import './ruleStyles.scss';
</style>
