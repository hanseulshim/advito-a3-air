<template>
  <modal
    classes="modal-container"
    name="pricingTermRulesModal"
    height="auto"
    scrollable
    width="800px"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="title-row space-between">
      <div class="section-header">Discount : {{ discount.name }}</div>
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
      :parent-id="discount.id"
      :table-id="rule.id"
      @delete-rule="deleteRule"
    ></component>
  </modal>
</template>

<script>
import TicketingDates from '../../Rules/TicketingDates';
import TravelDates from '../../Rules/TravelDates';
import PointOfSale from '../../Rules/PoS';
import PointOfOrigin from '../../Rules/PoO';
import PublishedBookingClass from '../../Rules/PublishedBookingClass';
import RequiredBookingClass from '../../Rules/RequiredBookingClass';
import Market from '../../Rules/Market';
import MarketingAirline from '../../Rules/MarketingAirline';
import ValidatingAirline from '../../Rules/ValidatingAirline';
import OperatingAirline from '../../Rules/OperatingAirline';
import AdvancedTicketing from '../../Rules/AdvancedTicketing';
import TourCode from '../../Rules/TourCode';
import TicketDesignator from '../../Rules/TicketDesignator';
import TimeOfWeek from '../../Rules/TimeOfWeek';
import MinStay from '../../Rules/MinStay';
import MaxStay from '../../Rules/MaxStay';
import Stops from '../../Rules/Stops';
import ConnectionPoint from '../../Rules/ConnectionPoint';
import FlightNumber from '../../Rules/FlightNumber';
import Blackouts from '../../Rules/Blackouts';
import Distance from '../../Rules/Distance';
import PublishedFareBasis from '../../Rules/PublishedFareBasis';
import CorporateFareBasis from '../../Rules/CorporateFareBasis';
import Cabin from '../../Rules/Cabin';
import FareCategory from '../../Rules/FareCategory';

import { ruleTypes } from '../../Rules/helper';
import { GET_RULE_LIST } from '@/graphql/queries';
export default {
  name: 'PricingTermRulesModal',
  apollo: {
    ruleList: {
      query: GET_RULE_LIST,
      variables() {
        return {
          parentId: this.discount.id
        };
      },
      result({ data }) {
        if (data && this.discount.id) {
          this.renderedRules = data.ruleList.map(
            ruleId => this.ruleTypes.filter(v => v.id === ruleId)[0]
          );
        }
      }
    }
  },
  components: {
    TicketingDates,
    TravelDates,
    PointOfSale,
    PointOfOrigin,
    PublishedBookingClass,
    RequiredBookingClass,
    Market,
    MarketingAirline,
    ValidatingAirline,
    OperatingAirline,
    AdvancedTicketing,
    TourCode,
    TicketDesignator,
    TimeOfWeek,
    MinStay,
    MaxStay,
    Stops,
    ConnectionPoint,
    FlightNumber,
    Blackouts,
    Distance,
    PublishedFareBasis,
    CorporateFareBasis,
    Cabin,
    FareCategory
  },
  data() {
    return {
      discount: {},
      ruleTypes,
      ruleList: [],
      renderedRules: [],
      selectedRule: ''
    };
  },
  computed: {
    rulesInDropdown() {
      if (this.renderedRules.length) {
        return this.ruleTypes.filter(
          rule => !this.renderedRules.some(v => v.id === rule.id)
        );
      } else {
        return this.ruleTypes;
      }
    }
  },
  methods: {
    hideModal() {
      this.$modal.hide('pricingTermRulesModal');
    },
    createRule(selected) {
      const match = this.ruleTypes.filter(rule => rule.id === selected)[0];
      this.renderedRules.push(match);
      this.selectedRule = '';
    },
    async deleteRule(ruleType) {
      const matched = this.renderedRules.filter(
        rule => rule.value === ruleType
      )[0];
      this.renderedRules.splice(this.renderedRules.indexOf(matched), 1);
      //Call Apollo refetch of RuleList here!
      const {
        data: { ruleList }
      } = await this.$apollo.query({
        query: GET_RULE_LIST
      });
      this.data = ruleList;
    },
    beforeOpen(event) {
      this.discount = event.params.discount;
    },
    beforeClose() {
      this.discount = {};
      this.renderedRules = [];
      this.ruleList = [];
      this.selectedRule = '';
    }
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
