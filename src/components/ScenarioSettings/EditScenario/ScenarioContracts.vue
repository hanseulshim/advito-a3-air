<template>
  <div class="container">
    <el-table
      ref="scenarioContractList"
      v-loading="$apollo.loading"
      :data="contractList"
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
import {
  GET_SCENARIO_CONTRACT_LIST,
  GET_PROJECT,
  GET_CONTRACT_LIST
} from '@/graphql/queries';
import { TOGGLE_SCENARIO_CONTRACT } from '@/graphql/mutations';
import { formatDate } from '@/helper';
import { contract } from '@/config';
export default {
  name: 'ScenarioContracts',
  components: {},
  props: {
    scenarioId: {
      type: Number,
      default: null
    }
  },
  apollo: {
    project: {
      query: GET_PROJECT
    },
    contractList: {
      query: GET_CONTRACT_LIST,
      variables() {
        return {
          projectId: this.project.id
        };
      }
    },
    scenarioContractList: {
      query: GET_SCENARIO_CONTRACT_LIST,
      variables() {
        return {
          scenarioId: this.scenarioId
        };
      }
    }
  },
  data() {
    return {
      contractList: [],
      scenarioContractList: [],
      selectedIdList: [],
      project: null,
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
    async saveContracts() {
      try {
        await this.$apollo.mutate({
          mutation: TOGGLE_SCENARIO_CONTRACT,
          variables: {
            scenarioId: this.scenarioId,
            contractIdList: [...this.selectedIdList]
          }
        });
        this.$modal.show('success', {
          message: 'Scenario contracts successfully updated'
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
