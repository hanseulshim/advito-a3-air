<template>
  <div>
    <div class="title-row space-between">
      <div class="section-header">
        {{ pluralize('scenario', scenarioList.length) }}
      </div>
      <button class="button long">
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
          {{ props.row.airlineContracts ? `checkmark` : '—' }}
        </template>
      </el-table-column>
      <el-table-column
        label="Contract Targets"
        :min-width="scenario.contractTargets"
      >
        <template slot-scope="props">
          {{ props.row.contractTargets ? `checkmark` : '—' }}
        </template>
      </el-table-column>
      <el-table-column
        label="Preferred Airlines"
        :min-width="scenario.preferredAirlines"
      >
        <template slot-scope="props">
          {{ props.row.preferredAirlines ? `checkmark` : '—' }}
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
          {{ props.row.tripDistribution ? `checkmark` : '—' }}
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
          <el-tooltip effect="dark" content="Edit Discount" placement="top">
            <i class="fas fa-pencil-alt icon-spacer" />
          </el-tooltip>
          <el-tooltip effect="dark" content="Delete Discount" placement="top">
            <i class="fas fa-trash-alt" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { formatDate, formatPercent, pluralize } from '@/helper';
import { scenario } from '@/config';
export default {
  name: 'ScenarioSettings',
  data() {
    return {
      scenarioList: [
        {
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
    }
  }
};
</script>
