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
      <el-table-column label="Select" :min-width="scenario.round">
        <template slot-scope="props">
          <el-checkbox
            :value="selectedIdList.includes(props.row.id)"
            @change="toggleSelection(props.row.id)"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="round"
        label="Round"
        :min-width="scenario.round"
        sortable
        :sort-orders="['ascending', 'descending']"
      />
      <el-table-column
        prop="scenarioName"
        label="Scenario Name"
        sortbale
        :min-width="scenario.scenarioName"
        :sort-orders="['ascending', 'descending']"
      />
      <el-table-column
        label="Airline Contracts"
        :min-width="scenario.airlineContracts"
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
        label="Contract Targets"
        :min-width="scenario.contractTargets"
      >
        <template slot-scope="props">
          <i
            v-if="props.row.contractTargets"
            class="fas fa-check
          icon-spacer"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="Preferred Airlines"
        :min-width="scenario.preferredAirlines"
      >
        <template slot-scope="props">
          <i
            v-if="props.row.preferredAirlines"
            class="fas fa-check
          icon-spacer"
          />
        </template>
      </el-table-column>
      <el-table-column label="Paramters" :min-width="scenario.parameters">
        {{ 'Hist' }}
      </el-table-column>
      <el-table-column
        label="Trip Distribution"
        :min-width="scenario.tripDistribution"
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
        label="Effective Savings"
        :min-width="scenario.effectiveSavings"
      >
        {{ ' ' }}
      </el-table-column>
      <el-table-column label="Actions">
        <template slot-scope="props">
          <el-tooltip effect="dark" content="Edit Scenario" placement="top">
            <i
              class="fas fa-pencil-alt icon-spacer"
              @click="showEditScenarioModal"
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
import { formatDate, formatPercent, pluralize } from '@/helper';
import NewScenarioModal from './NewScenarioModal';
import EditScenarioModal from './EditScenarioModal';
import { scenario } from '@/config';
export default {
  name: 'ScenarioSettings',
  components: {
    NewScenarioModal,
    EditScenarioModal
  },
  data() {
    return {
      scenarioList: [
        {
          id: 1,
          round: 'Baseline',
          scenarioName: 'test-scenario',
          airlineContracts: true,
          contractTargets: true,
          preferredAirlines: true,
          parameters: 'HIST',
          tripDistribution: true,
          effectiveSavings: ''
        },
        {
          id: 2,
          round: 'P1',
          scenarioName: 'test-scenario',
          airlineContracts: true,
          contractTargets: true,
          preferredAirlines: true,
          parameters: 'HIST',
          tripDistribution: true,
          effectiveSavings: ''
        }
      ],
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
      this.$modal.show('new-scenario');
    },
    showEditScenarioModal() {
      this.$modal.show('edit-scenario');
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
