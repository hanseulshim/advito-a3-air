<template>
  <modal
    classes="modal-container"
    name="targetTermRulesModal"
    height="auto"
    scrollable
    :width="800"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="scroll-container">
      <div class="title-row space-between">
        <div class="section-header">Term : {{ term.name }}</div>
        <el-tooltip effect="dark" content="Close Modal" placement="top">
          <i class="fas fa-times close-modal-button" @click="hideModal" />
        </el-tooltip>
      </div>
      <div class="rules-menu-container">
        <p class="rule-count">{{ `${renderedRules.length} Rules` }}</p>
        <el-select
          v-model="selectedRule"
          placeholder="Create New Rule"
          size="small"
          filterable
          @change="createRule"
        >
          <el-option
            v-for="rule in rulesInDropdown"
            :key="rule.index"
            :label="rule.label"
            :value="rule.id"
          ></el-option>
        </el-select>
      </div>
      <component
        :is="rule.value"
        v-for="rule in renderedRules"
        :key="rule.id"
        :parent-id="term.id"
        :table-id="rule.id"
        :parent-type="parentType"
        :contract-id="selectedContract.id"
        @delete-rule="deleteRule"
      ></component>
    </div>
  </modal>
</template>

<script>
import TicketingDates from '../Rules/TicketingDates';
import TravelDates from '../Rules/TravelDates';
import PointOfSale from '../Rules/PoS';
import PointOfOrigin from '../Rules/PoO';
import Market from '../Rules/Market';
import MarketingAirline from '../Rules/MarketingAirline';
import ValidatingAirline from '../Rules/ValidatingAirline';
import OperatingAirline from '../Rules/OperatingAirline';
import { ruleTypes } from '../Rules/helper';
import { TARGET_TERM_LOOKUP } from '@/graphql/constants';
import {
  GET_RULE_LIST,
  GET_TARGET_TERM,
  GET_SELECTED_CONTRACT
} from '@/graphql/queries';
export default {
  name: 'TargetTermRulesModal',
  apollo: {
    ruleList: {
      query: GET_RULE_LIST,
      fetchPolicy: 'network-only',
      variables() {
        return {
          parentId: this.term.id,
          parentType: TARGET_TERM_LOOKUP.RULE_TYPE
        };
      },
      result({ data }) {
        if (data && this.term.id) {
          this.renderedRules = data.ruleList.map(
            ruleId => this.ruleTypes.filter(v => v.id === ruleId)[0]
          );
        }
      }
    },
    selectedContract: {
      query: GET_SELECTED_CONTRACT
    }
  },
  components: {
    TicketingDates,
    TravelDates,
    PointOfSale,
    PointOfOrigin,
    Market,
    MarketingAirline,
    ValidatingAirline,
    OperatingAirline
  },
  data() {
    return {
      term: {},
      parentType: TARGET_TERM_LOOKUP.RULE_TYPE,
      ruleTypes,
      ruleList: [],
      renderedRules: [],
      selectedRule: '',
      selectedContract: null
    };
  },
  computed: {
    rulesInDropdown() {
      if (this.renderedRules.length) {
        return this.ruleTypes.filter(
          rule =>
            !this.renderedRules.some(v => v.id === rule.id) &&
            rule.targetTermRule
        );
      } else {
        return this.ruleTypes.filter(rule => rule.targetTermRule);
      }
    }
  },
  methods: {
    hideModal() {
      this.$modal.hide('targetTermRulesModal');
    },
    createRule(selected) {
      const match = this.ruleTypes.filter(rule => rule.id === selected)[0];
      this.renderedRules.unshift(match);
      this.selectedRule = '';
    },
    async deleteRule(ruleType) {
      try {
        const matched = this.renderedRules.filter(
          rule => rule.value === ruleType
        )[0];
        this.renderedRules.splice(this.renderedRules.indexOf(matched), 1);
        //Call Apollo refetch of RuleList here!
        await this.$apollo.query({
          query: GET_RULE_LIST,
          fetchPolicy: 'network-only',
          variables: {
            parentId: this.term.id,
            parentType: TARGET_TERM_LOOKUP.RULE_TYPE
          },
          result({ data }) {
            this.ruleList = data.ruleList;
          }
        });
        await this.$apollo.query({
          query: GET_TARGET_TERM,
          fetchPolicy: 'network-only',
          variables: {
            id: this.term.id
          }
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    beforeOpen(event) {
      this.term = event.params.term;
    },
    beforeClose() {
      this.term = {};
      this.renderedRules = [];
      this.ruleList = [];
      this.selectedRule = '';
    }
  }
};
</script>
<style lang="scss" scoped>
.scroll-container {
  height: 100%;
  overflow: auto;
  padding-right: 25px;
}

.rules-menu-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1em;

  .rule-count {
    flex: 2;
  }

  .el-select {
    flex: 1;
  }
}
</style>
