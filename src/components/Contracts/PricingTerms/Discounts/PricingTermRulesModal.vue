<template>
  <modal
    classes="modal-container"
    name="pricingTermRulesModal"
    :height="600"
    width="800px"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="scroll-container">
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
        :pricing-term-id="discount.pricingTermId"
        :parent-type="parentType"
        :contract-id="selectedContract.id"
        @delete-rule="deleteRule"
      ></component>
    </div>
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
import AdvanceTicketing from '../../Rules/AdvancedTicketing';
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
import {
  GET_RULE_LIST,
  GET_DISCOUNT,
  GET_SELECTED_CONTRACT
} from '@/graphql/queries';
export default {
  name: 'PricingTermRulesModal',
  apollo: {
    ruleList: {
      query: GET_RULE_LIST,
      fetchPolicy: 'network-only',
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
    PublishedBookingClass,
    RequiredBookingClass,
    Market,
    MarketingAirline,
    ValidatingAirline,
    OperatingAirline,
    AdvanceTicketing,
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
      selectedRule: '',
      parentType: 1,
      selectedContract: null
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
      this.renderedRules.unshift(match);
      this.selectedRule = '';
    },
    async deleteRule(ruleType) {
      const matched = this.renderedRules.filter(
        rule => rule.value === ruleType
      )[0];
      this.renderedRules.splice(this.renderedRules.indexOf(matched), 1);
      await this.$apollo.query({
        query: GET_RULE_LIST,
        fetchPolicy: 'network-only',
        variables: {
          parentId: this.discount.id,
          parentType: 1
        },
        result({ data }) {
          this.ruleList = data.ruleList;
        }
      });
      await this.$apollo.query({
        query: GET_DISCOUNT,
        fetchPolicy: 'network-only',
        variables: {
          id: this.discount.id
        }
      });
    },
    beforeOpen(event) {
      this.discount = event.params.discount;
    },
    beforeClose() {
      this.discount = {};
      this.ruleList = [];
      this.renderedRules = [];
      this.selectedRule = '';
    }
  }
};
</script>
<style lang="scss">
.scroll-container {
  height: 100%;
  overflow: auto;
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
