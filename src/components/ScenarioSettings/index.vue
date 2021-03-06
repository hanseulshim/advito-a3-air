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
            :value="selectedIdList.includes(props.row.id)"
            @change="toggleSelection(props.row.id)"
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
            <i
              class="fas fa-trash-alt"
              @click="showDeleteScenarioModal(props.row)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <NewScenarioModal />
    <EditScenarioModal />
    <DeleteScenarioModal />
  </div>
</template>
<script>
import {
  GET_USER,
  GET_CLIENT,
  GET_SCENARIO_LIST,
  GET_PROJECT
} from '@/graphql/queries';
import { pluralize } from '@/helper';
import NewScenarioModal from './NewScenarioModal';
import EditScenarioModal from './EditScenarioModal';
import DeleteScenarioModal from './DeleteScenarioModal';
import { scenario } from '@/config';
export default {
  name: 'ScenarioSettings',
  components: {
    NewScenarioModal,
    EditScenarioModal,
    DeleteScenarioModal
  },
  apollo: {
    user: {
      query: GET_USER
    },
    client: {
      query: GET_CLIENT
    },
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
      user: null,
      client: null,
      project: null,
      scenarioList: [],
      scenario,
      selectedIdList: []
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
      this.$modal.show('new-scenario', {
        user: this.user,
        client: this.client,
        project: this.project
      });
    },
    showEditScenarioModal(scenario) {
      this.$modal.show('edit-scenario', {
        scenario
      });
    },
    showDeleteScenarioModal(scenario) {
      this.$modal.show('delete-scenario', {
        id: scenario.id,
        projectId: scenario.projectId
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
