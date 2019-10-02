<template>
  <div class="container">
    <el-table
      ref="preferredAirlineList"
      v-loading="$apollo.loading"
      :data="scenarioPreferredAirlineList"
      :default-sort="{ prop: 'name', order: 'ascending' }"
      :max-height="500"
    >
      <el-table-column>
        <template slot-scope="props">
          <el-checkbox @change="toggleSelection(props.row)" />
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="Airlines"
        :min-width="contract.name"
      />
      <el-table-column label="Contract">
        <template slot-scope="props">
          <i v-if="checkContract(props.row.code)" class="fas fa-check" />
        </template>
      </el-table-column>
      <el-table-column
        v-for="sector in scenarioTravelSectorList"
        :key="sector.id"
        :label="sector.shortName"
        :min-width="contract.name"
      >
        <template slot-scope="props">
          <el-select
            :value="setTierValue(props.row, props.column.label)"
            @change="
              value => changeSectorTier(value, props.row, props.column.label)
            "
          >
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
  GET_SCENARIO_PREFERRED_AIRLINE_LIST,
  GET_SCENARIO,
  GET_PROJECT
} from '@/graphql/queries';
import { UPDATE_SCENARIO_PREFERRED_CARRIERS } from '@/graphql/mutations';
import { formatDate, removeTypename } from '@/helper';
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
    scenarioPreferredAirlineList: {
      query: GET_SCENARIO_PREFERRED_AIRLINE_LIST,
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
      },
      result({ data: { scenarioPreferredCarrierList } }) {
        this.scenarioPreferredCarrierListCopy = scenarioPreferredCarrierList.map(
          carrier => ({
            id: carrier.id,
            scenarioId: carrier.scenarioId,
            sectorId: carrier.sectorId,
            carrierCode: carrier.carrierCode,
            tier: carrier.tier
          })
        );
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
      scenarioPreferredCarrierListCopy: [],
      scenarioPreferredCarrierTierList: [],
      scenarioTravelSectorList: [],
      scenarioPreferredAirlineList: [],
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
    toggleSelection(row) {},
    changeSectorTier(tier, row, sector) {
      const sectorId = this.scenarioTravelSectorList.find(
        v => v.shortName === sector
      ).id;

      const { code, id } = row;
      const carrier = this.scenarioPreferredCarrierListCopy.find(
        carrier => carrier.id === id && carrier.sectorId === sectorId
      );
      if (carrier) {
        carrier.tier = tier;
      } else {
        this.scenarioPreferredCarrierListCopy.push({
          id: null,
          scenarioId: this.scenarioId,
          sectorId,
          carrierCode: code,
          tier
        });
      }
    },
    setTierValue(row, sector) {
      const sectorId = this.scenarioTravelSectorList.find(
        v => v.shortName === sector
      ).id;

      const { code } = row;
      const carrier = this.scenarioPreferredCarrierListCopy.find(
        carrier => carrier.carrierCode === code && carrier.sectorId === sectorId
      );

      if (carrier) {
        return carrier.tier;
      } else return 'Select';
    },
    checkContract(code) {
      return this.scenarioPreferredContractCarrierList.indexOf(code) !== -1;
    },
    async saveContracts() {
      try {
        await this.$apollo.mutate({
          mutation: UPDATE_SCENARIO_PREFERRED_CARRIERS,
          variables: {
            carrierList: [...this.scenarioPreferredCarrierListCopy]
          }
        });
        this.$modal.show('success', {
          message: 'Preferred carrier list updated.'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
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
