<template>
  <div class="rule-container">
    <p class="rule-title">Market</p>
    <i
      v-if="!editMode"
      class="fas fa-pencil-alt edit-rule"
      @click="saveRules"
    />
    <button v-if="editMode" class="save-rule" @click="saveRules">Save</button>
    <div v-if="editMode" class="control-row">
      <label>Origin:</label>
      <el-select
        v-model="origin"
        filterable
        clearable
        remote
        size="mini"
        reserve-keyword
        placeholder="Please enter a keyword"
        :remote-method="filterOriginMarkets"
        :loading="loadingOrigin"
        value-key="name"
      >
        <el-option
          v-for="item in originOptions"
          :key="item.index"
          :label="item.name"
          :value="item"
        >
        </el-option>
      </el-select>
      <label>Destination:</label>
      <el-select
        v-model="arrival"
        filterable
        clearable
        remote
        size="mini"
        reserve-keyword
        placeholder="Please enter a keyword"
        :remote-method="filterArrivalMarkets"
        :loading="loadingArrival"
        value-key="name"
      >
        <el-option
          v-for="item in arrivalOptions"
          :key="item.index"
          :label="item.name"
          :value="item"
        >
        </el-option>
      </el-select>
      <label>Exclude:</label>
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
        >{{ `${rule.origin} - ${rule.arrival}` }}</el-tag
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
        >{{ `${rule.origin} - ${rule.arrival}` }}</el-tag
      >
    </div>
  </div>
</template>
<script>
import { removeTypename } from '@/helper';
import {
  GET_MARKET_LIST,
  GET_MARKET_RULE_LIST,
  GET_DISCOUNT,
  GET_TARGET_TERM
} from '@/graphql/queries';
import { UPDATE_MARKET_RULE } from '@/graphql/mutations';
export default {
  name: 'Market',
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
    }
  },
  apollo: {
    marketList: {
      query: GET_MARKET_LIST
    },
    marketRuleList: {
      query: GET_MARKET_RULE_LIST,
      variables() {
        return {
          parentId: this.parentId,
          parentType: this.parentType
        };
      },
      result({ data: { marketRuleList } }) {
        return removeTypename(marketRuleList);
      }
    }
  },
  data() {
    return {
      marketList: [],
      originOptions: [],
      arrivalOptions: [],
      exclude: false,
      loadingOrigin: false,
      loadingArrival: false,
      editMode: false,
      origin: {},
      arrival: {},
      marketRuleList: []
    };
  },
  computed: {
    excludedRules() {
      return this.marketRuleList.filter(rule => rule.exclude);
    },
    includedRules() {
      return this.marketRuleList.filter(rule => !rule.exclude);
    }
  },
  methods: {
    async saveRules() {
      try {
        if (this.editMode && !this.marketRuleList.length) {
          this.$emit('delete-rule', 'Market');
        } else if (this.editMode) {
          await this.$apollo.mutate({
            mutation: UPDATE_MARKET_RULE,
            variables: {
              parentId: this.parentId,
              marketRuleList: this.marketRuleList,
              parentType: this.parentType
            },
            refetchQueries: () => [
              {
                query: GET_MARKET_RULE_LIST,
                variables: {
                  parentId: this.parentId,
                  parentType: this.parentType
                }
              },
              {
                query: this.parentType === 1 ? GET_DISCOUNT : GET_TARGET_TERM,
                variables: {
                  id: this.parentId
                }
              }
            ]
          });
        }
        this.editMode = !this.editMode;
        this.origin = {};
        this.arrival = {};
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    createTag() {
      if (this.origin.locationType && this.arrival.locationType) {
        const ruleContainerId = this.marketRuleList.length
          ? this.marketRuleList[0].ruleContainerId
          : null;

        this.marketRuleList.push({
          id: null,
          ruleContainerId,
          origin: this.origin.name,
          originType: this.origin.locationType,
          arrival: this.arrival.name,
          arrivalType: this.arrival.locationType,
          exclude: this.exclude,
          isDeleted: false
        });

        this.selectedCountry = [];
        this.origin = {};
        this.arrival = {};
      } else {
        this.$modal.show('error', {
          message:
            'Origin/Arrival cannot be found or is ambiguous, please make selection from the list'
        });
      }
    },
    async deleteTag(tag) {
      try {
        const idx = this.marketRuleList.indexOf(tag);
        this.marketRuleList[idx].isDeleted = true;

        await this.$apollo
          .mutate({
            mutation: UPDATE_MARKET_RULE,
            variables: {
              parentId: this.parentId,
              marketRuleList: this.marketRuleList,
              parentType: this.parentType
            },
            refetchQueries: () => [
              {
                query: GET_MARKET_RULE_LIST,
                variables: {
                  parentId: this.parentId,
                  parentType: this.parentType
                }
              }
            ]
          })
          .then(() => {
            const rulesRemaining = this.marketRuleList.some(
              rule => !rule.isDeleted
            );
            if (!this.marketRuleList.length || !rulesRemaining) {
              this.$emit('delete-rule', 'Market');
            }
          });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    filterOriginMarkets(query) {
      if (query !== '') {
        this.loadingOrigin = true;
        this.originOptions = this.marketList.filter(item => {
          return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
        });
        this.loadingOrigin = false;
      } else {
        this.originOptions = [];
      }
    },
    filterArrivalMarkets(query) {
      if (query !== '') {
        this.loadingArrival = true;
        this.arrivalOptions = this.marketList.filter(item => {
          return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
        });
        this.loadingArrival = false;
      } else {
        this.arrivalOptions = [];
      }
    }
  }
};
</script>
<style lang="scss">
@import './ruleStyles.scss';
</style>
