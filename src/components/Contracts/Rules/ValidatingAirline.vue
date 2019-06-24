<template>
  <div class="rule-container">
    <p class="rule-title">Validating Airline</p>
    <i
      v-if="!editMode"
      class="fas fa-pencil-alt edit-rule"
      @click="saveRules"
    />
    <button v-if="editMode" class="save-rule" @click="saveRules">
      Save
    </button>
    <div v-if="editMode" class="control-row">
      <el-select
        v-model="selectedAirline"
        filterable
        placeholder="Select"
        size="mini"
        clearable
        multiple
      >
        <el-option
          v-for="item in airlineCodeList"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        ></el-option>
      </el-select>
      <label for="exclude"> Exclude: </label>
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
import { removeTypename } from '@/helper';
import {
  GET_AIRLINE_CODE_LIST,
  GET_AIRLINE_RULE_LIST
} from '@/graphql/queries';
import { UPDATE_AIRLINE } from '@/graphql/mutations';
import { PRICING_TERM_LOOKUP } from '@/graphql/constants';
export default {
  name: 'ValidatingAirline',
  props: {
    parentId: {
      default: null,
      type: Number
    },
    tableId: {
      default: null,
      type: Number
    }
  },
  apollo: {
    airlineCodeList: {
      query: GET_AIRLINE_CODE_LIST
    },
    airlineList: {
      query: GET_AIRLINE_RULE_LIST,
      variables() {
        return {
          parentId: this.parentId,
          airlineType: PRICING_TERM_LOOKUP.MARKETING_AIRLINE_RULETYPE
        };
      },
      result({ data: { airlineList } }) {
        return removeTypename(airlineList);
      }
    }
  },
  data() {
    return {
      airlineCodeList: [],
      airlineList: [],
      exclude: false,
      editMode: false,
      selectedAirline: []
    };
  },
  computed: {
    excludedRules() {
      return this.airlineList.filter(rule => rule.exclude);
    },
    includedRules() {
      return this.airlineList.filter(rule => !rule.exclude);
    }
  },
  methods: {
    async saveRules() {
      if (this.editMode && !this.airlineList.length) {
        this.$emit('delete-rule', 'ValidatingAirline');
      } else if (this.editMode) {
        await this.$apollo.mutate({
          mutation: UPDATE_AIRLINE,
          variables: {
            parentId: this.parentId,
            airlineList: this.airlineList,
            airlineType: PRICING_TERM_LOOKUP.VALIDATING_AIRLINE_RULETYPE
          },
          refetchQueries: () => [
            {
              query: GET_AIRLINE_RULE_LIST,
              variables: {
                parentId: this.parentId,
                airlineType: PRICING_TERM_LOOKUP.VALIDATING_AIRLINE_RULETYPE
              }
            }
          ]
        });
      }
      this.editMode = !this.editMode;
      this.selectedAirline = [];
    },
    createTag() {
      const ruleContainerId = this.airlineList.length
        ? this.airlineList[0].ruleContainerId
        : null;

      this.selectedAirline.map(v => {
        this.airlineList.push({
          id: null,
          ruleContainerId,
          ruleType: PRICING_TERM_LOOKUP.VALIDATING_AIRLINE_RULETYPE,
          carrierCode: v,
          exclude: this.exclude,
          isDeleted: false
        });
      });

      this.selectedAirline = [];
    },
    async deleteTag(tag) {
      const idx = this.airlineList.indexOf(tag);
      this.airlineList[idx].isDeleted = true;

      await this.$apollo
        .mutate({
          mutation: UPDATE_AIRLINE,
          variables: {
            parentId: this.parentId,
            airlineList: this.airlineList,
            airlineType: PRICING_TERM_LOOKUP.VALIDATING_AIRLINE_RULETYPE
          },
          refetchQueries: () => [
            {
              query: GET_AIRLINE_RULE_LIST,
              variables: {
                parentId: this.parentId,
                airlineType: PRICING_TERM_LOOKUP.VALIDATING_AIRLINE_RULETYPE
              }
            }
          ]
        })
        .then(() => {
          const rulesRemaining = this.airlineList.some(rule => !rule.isDeleted);
          if (!this.airlineList.length || !rulesRemaining) {
            this.$emit('delete-rule', 'ValidatingAirline');
          }
        });
    }
  }
};
</script>
<style lang="scss">
@import './ruleStyles.scss';
</style>
