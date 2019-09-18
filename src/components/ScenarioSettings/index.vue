<template>
  <div>
    <div class="title-row space-between">
      <div class="section-header">
        {{ pluralize('scenario', scenarioList.length) }}
      </div>
      <button v-if="selectedIdList.length" class="button long runScenarioBtn">
        RUN SCENARIOS
      </button>
      <button class="button long" @click="showNewScenarioModal">
        + NEW SCENARIO
      </button>
    </div>
    <el-table
      ref="scenarioList"
      v-loading="$apollo.loading"
      :data="scenarioList"
      :default-sort="{ prop: 'name', order: 'ascending' }"
    >
      <el-table-column label="Select">
        <template slot-scope="props">
          <el-checkbox
            :value="selectedIdList.includes(props.row.scenarioId)"
            @change="toggleSelection(props.row.scenarioId)"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="shortName"
        label="Round"
        :min-width="scenario.shortName"
        sortable
        :sort-orders="['ascending', 'descending']"
      />
      <el-table-column
        prop="name"
        label="Scenario Name"
        sortable
        :min-width="scenario.name"
        :sort-orders="['ascending', 'descending']"
      />
      <el-table-column
        label="Airline Contracts"
        :min-width="scenario.airlineContracts"
        align="center"
      >
        <template slot-scope="props">
          <i
            v-if="props.row.airlineContracts"
            class="fas fa-check
          icon-spacer"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="Preferred Airlines"
        :min-width="scenario.preferredAirlines"
        align="center"
      >
        <template slot-scope="props">
          <i
            v-if="props.row.preferredAirlines"
            class="fas fa-check
          icon-spacer"
          />
        </template>
      </el-table-column>
      <el-table-column label="Parameters" :min-width="scenario.parameters">
        <template slot-scope="props">
          {{ props.row.useHistoricalShare ? 'HIST' : ' ' }}
        </template>
      </el-table-column>
      <el-table-column
        label="Trip Distribution"
        :min-width="scenario.tripDistribution"
        align="center"
      >
        <template slot-scope="props">
          <i
            v-if="props.row.tripDistribution"
            class="fas fa-check
          icon-spacer"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="effectiveSavings"
        label="Effective Savings"
        :min-width="scenario.effectiveSavings"
      />
      <el-table-column label="Actions">
        <template slot-scope="props">
          <el-tooltip effect="dark" content="Edit Scenario" placement="top">
            <i
              class="fas fa-pencil-alt icon-spacer"
              @click="showEditScenarioModal(props.row)"
            />
          </el-tooltip>
          <el-tooltip effect="dark" content="Delete Scenario" placement="top">
            <i class="fas fa-trash-alt" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <NewScenarioModal />
    <EditScenarioModal />
  </div>
</template>
<script>
import { GET_SCENARIO_LIST, GET_PROJECT } from '@/graphql/queries';
import { pluralize } from '@/helper';
import NewScenarioModal from './NewScenarioModal';
import EditScenarioModal from './EditScenarioModal';
import { scenario } from '@/config';
export default {
  name: 'ScenarioSettings',
  components: {
    NewScenarioModal,
    EditScenarioModal
  },
  apollo: {
    project: {
      query: GET_PROJECT
    },
    scenarioList: {
      query: GET_SCENARIO_LIST,
      variables() {
        return {
          projectId: this.project.id
        };
      }
    }
  },
  data() {
    return {
      scenarioList: [],
      scenario,
      selectedIdList: [],
      project: {}
    };
  },
  methods: {
    pluralize(word, count) {
      return pluralize(word, count);
    },
    toggleSelection(id) {
      const index = this.selectedIdList.indexOf(id);
      if (index === -1) {
        this.selectedIdList.push(id);
      } else {
        this.selectedIdList.splice(index, 1);
      }
    },
    showNewScenarioModal() {
      this.$modal.show('new-scenario');
    },
    showEditScenarioModal(scenario) {
      this.$modal.show('edit-scenario', {
        scenario
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import '@/styles/global.scss';
.runScenarioBtn {
  margin-left: auto;
  margin-right: 1em;
}
</style>
