<template>
  <modal
    classes="modal-container"
    name="targetTermRulesModal"
    height="auto"
    scrollable
    width="800px"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="title-row space-between">
      <div class="section-header">Term : {{ term.name }}</div>
      <el-tooltip effect="dark" content="Close Modal" placement="top">
        <i class="fas fa-times close-modal-button" @click="hideModal" />
      </el-tooltip>
    </div>
    <div class="rules-menu-container">
      <p class="rule-count">9 RULES</p>
      <el-select
        v-model="selectedRule"
        placeholder="Create New Rule"
        size="small"
        @change="createRule"
      >
        <el-option
          v-for="rule in rulesInDropdown"
          :key="rule.index"
          :label="rule.label"
          :value="rule.value"
        ></el-option>
      </el-select>
    </div>
    <component
      :is="rule.type"
      v-for="rule in ruleList"
      :key="rule.id"
      @delete-rule="deleteRule"
    ></component>
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
export default {
  name: 'TargetTermRulesModal',
  apollo: {},
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
      ruleTypes: ruleTypes,
      ruleList: [],
      selectedRule: ''
    };
  },
  computed: {
    rulesInDropdown() {
      return this.ruleTypes.filter(
        rule => !this.ruleList.some(v => v.type === rule.value)
      );
    }
  },
  methods: {
    hideModal() {
      this.$modal.hide('targetTermRulesModal');
    },
    createRule(selected) {
      this.ruleList.push({
        type: selected
      });
      this.selectedRule = '';
    },
    deleteRule(ruleType) {
      const matched = this.ruleList.filter(rule => rule.type === ruleType)[0];
      this.ruleList.splice(this.ruleList.indexOf(matched), 1);
    },
    beforeOpen(event) {
      this.term = event.params.term;
    },
    beforeClose() {}
  }
};
</script>
<style lang="scss">
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
