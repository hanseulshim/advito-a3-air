<template>
  <div class="container">
    <el-table
      ref="preferredAirlineList"
      v-loading="$apollo.loading"
      :data="scenarioPreferredCarrierList"
      :default-sort="{ prop: 'name', order: 'ascending' }"
      :max-height="500"
    >
      <el-table-column>
        <template slot-scope="props">
          <el-checkbox @change="toggleSelection(props.row)" />
        </template>
      </el-table-column>
      <el-table-column
        prop="carrierCode"
        label="Airlines"
        :min-width="contract.name"
      />
      <el-table-column label="Contract">
        <template slot-scope="props">
          <i v-if="checkContract(props.row.carrierCode)" class="fas fa-check" />
        </template>
      </el-table-column>
      <el-table-column
        v-for="sector in scenarioTravelSectorList"
        :key="sector.id"
        :label="sector.shortName"
        :min-width="contract.name"
      >
        <template slot-scope="props">
          <el-select v-model="props.row.tier">
            <el-option
              v-for="tier in scenarioPreferredCarrierTierList"
              :key="tier.id"
              :value="tier.id"
              :label="tier.name"
            />
          </el-select>
        </template>
      </el-table-column>
    </el-table>
    <div class="save-container">
      <button class="button" type="button" @click="saveContracts">SAVE</button>
    </div>
  </div>
</template>
<script>
import {
  GET_SCENARIO_PREFERRED_CONTRACT_CARRIER_LIST,
  GET_SCENARIO_PREFERRED_CARRIER_LIST,
  GET_SCENARIO_TRAVEL_SECTOR_LIST,
  GET_SCENARIO_PREFERRED_CARRIER_TIER_LIST,
  GET_SCENARIO,
  GET_PROJECT
} from '@/graphql/queries';
import { formatDate } from '@/helper';
import { contract } from '@/config';
export default {
  name: 'ScenarioPreferredAirlines',
  components: {},
  props: {
    scenarioId: {
      default: null,
      type: Number
    }
  },
  apollo: {
    project: {
      query: GET_PROJECT
    },
    scenario: {
      query: GET_SCENARIO,
      variables() {
        return {
          id: this.scenarioId
        };
      }
    },
    scenarioPreferredContractCarrierList: {
      query: GET_SCENARIO_PREFERRED_CONTRACT_CARRIER_LIST,
      variables() {
        return {
          projectId: this.project.id
        };
      }
    },
    scenarioTravelSectorList: {
      query: GET_SCENARIO_TRAVEL_SECTOR_LIST,
      variables() {
        return {
          projectId: this.project.id
        };
      }
    },
    scenarioPreferredCarrierList: {
      query: GET_SCENARIO_PREFERRED_CARRIER_LIST,
      variables() {
        return {
          scenarioId: this.scenarioId
        };
      }
    },
    scenarioPreferredCarrierTierList: {
      query: GET_SCENARIO_PREFERRED_CARRIER_TIER_LIST
    }
  },
  data() {
    return {
      scenarioPreferredContractCarrierList: [],
      scenarioPreferredCarrierList: [],
      scenarioPreferredCarrierTierList: [],
      scenarioTravelSectorList: [],
      project: {},
      contract
    };
  },
  methods: {
    formatDate(row) {
      return `${formatDate(row.effectiveFrom)} — ${formatDate(
        row.effectiveTo
      )}`;
    },
    toggleSelection(row) {
      console.log(row);
    },
    checkContract(carrierCode) {
      if (
        this.scenarioPreferredContractCarrierList.find(v => v === carrierCode)
      ) {
        return true;
      } else return false;
    },
    saveContracts() {
      alert('contract list saved.');
    },
    updateCanMxc(v, id) {
      const airline = this.preferredAirlineList.find(
        airline => airline.id === id
      );
      airline.canMxc === v;
    }
  }
};
</script>
<style scoped lang="scss">
.save-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5em;
}
</style>
