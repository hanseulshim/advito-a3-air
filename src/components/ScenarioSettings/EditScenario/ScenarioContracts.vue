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
      />
      <el-table-column label="Point of Sale" prop="pointOfSale" />
    </el-table>
    <div class="save-container">
      <button class="button" type="button" @click="saveContracts">SAVE</button>
    </div>
  </div>
</template>
<script>
import { formatDate } from '@/helper';
export default {
  name: 'ScenarioContracts',
  components: {},
  props: {
    scenario: {
      default: null,
      type: Object
    }
  },
  apollo: {},
  data() {
    return {
      scenarioContractList: [
        {
          id: 1,
          name: 'Aeroflot POS CH',
          round: 'P1',
          airlineGroup: 'Delta JV',
          effectiveFrom: 1514782800000,
          effectiveTo: 1514782800000,
          pointOfSale: 'Country, Country'
        },
        {
          id: 2,
          name: 'Aeroflot POS CH',
          round: 'P1',
          airlineGroup: 'Delta JV',
          effectiveFrom: 1514782800000,
          effectiveTo: 1514782800000,
          pointOfSale: 'Country...'
        },
        {
          id: 3,
          name: 'Aeroflot POS CH',
          round: 'P1',
          airlineGroup: 'Delta JV',
          effectiveFrom: 1514782800000,
          effectiveTo: 1514782800000,
          pointOfSale: 'Country...'
        },
        {
          id: 4,
          name: 'Aeroflot POS CH',
          round: 'P1',
          airlineGroup: 'Delta JV',
          effectiveFrom: 1514782800000,
          effectiveTo: 1514782800000,
          pointOfSale: 'Country...'
        },
        {
          id: 5,
          name: 'Aeroflot POS CH',
          round: 'P1',
          airlineGroup: 'Delta JV',
          effectiveFrom: 1514782800000,
          effectiveTo: 1514782800000,
          pointOfSale: 'Country...'
        },
        {
          id: 6,
          name: 'Aeroflot POS CH',
          round: 'P1',
          airlineGroup: 'Delta JV',
          effectiveFrom: 1514782800000,
          effectiveTo: 1514782800000,
          pointOfSale: 'Country...'
        }
      ],
      selectedIdList: []
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
