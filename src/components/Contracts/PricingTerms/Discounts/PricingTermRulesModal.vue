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
export default {
  name: 'PricingTermRulesModal',
  apollo: {},
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
      discount: {
        name: ''
      },
      ruleTypes,
      ruleList: [
        // {
        //   id: 1,
        //   type: 'TicketingDates',
        //   title: 'Ticketing Dates',
        //   active: true
        // },
        // {
        //   id: 2,
        //   type: 'TravelDates',
        //   title: 'Travel Dates',
        //   active: false
        // }
      ],
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
      this.$modal.hide('pricingTermRulesModal');
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
      this.discount = event.params.discount;
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
