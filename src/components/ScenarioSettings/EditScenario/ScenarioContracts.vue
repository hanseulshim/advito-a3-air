<template>
  <div class="container">
    <el-table
      ref="scenarioContractList"
      v-loading="$apollo.loading"
      :data="scenarioContractList"
      :default-sort="{ prop: 'name', order: 'ascending' }"
      :max-height="500"
    >
      <el-table-column label="Select">
        <template slot-scope="props">
          <el-checkbox
            :value="selectedIdList.includes(props.row.id)"
            @change="toggleSelection(props.row.id)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Contract Name" />
      <el-table-column prop="round" label="Round" />
      <el-table-column label="Airline Group" prop="airlineGroup" />
      <el-table-column
        label="Effective Dates"
        prop="effectiveDates"
        :formatter="formatDate"
        :min-width="contract.effectiveDates"
      />
      <el-table-column label="Point of Sale" prop="pointOfSale" />
    </el-table>
    <div class="save-container">
      <button class="button" type="button" @click="saveContracts">SAVE</button>
    </div>
  </div>
</template>
<script>
import { GET_SCENARIO_CONTRACT_LIST } from '@/graphql/queries';
import { formatDate } from '@/helper';
import { contract } from '@/config';
export default {
  name: 'ScenarioContracts',
  components: {},
  props: {
    scenario: {
      default: null,
      type: Object
    }
  },
  apollo: {
    scenarioContractList: {
      query: GET_SCENARIO_CONTRACT_LIST,
      variables() {
        return {
          scenarioId: this.scenario.id
        };
      }
    }
  },
  data() {
    return {
      scenarioContractList: [],
      selectedIdList: [],
      contract
    };
  },
  methods: {
    formatDate(row) {
      return `${formatDate(row.effectiveFrom)} — ${formatDate(
        row.effectiveTo
      )}`;
    },
    toggleSelection(id) {
      const index = this.selectedIdList.indexOf(id);
      if (index === -1) {
        this.selectedIdList.push(id);
      } else {
        this.selectedIdList.splice(index, 1);
      }
    },
    saveContracts() {
      alert('contract list saved.');
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
