<template>
  <div class="container">
    <el-table
      ref="preferredAirlineList"
      v-loading="$apollo.loading"
      :data="preferredAirlineList"
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
      <el-table-column
        prop="airline"
        label="Airlines"
        :min-width="contract.name"
      />
      <el-table-column prop="contract" label="Contract">
        <template slot-scope="props">
          <i v-if="props.row.contract" class="fas fa-check" />
        </template>
      </el-table-column>
      <el-table-column label="CAN-MXCRB" prop="canMxc">
        <template slot-scope="props">
          <el-select
            v-model="props.row.canMxc"
            @change="value => updateCanMxc(value, props.row.id)"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        label="Effective Dates"
        prop="effectiveDates"
        :formatter="formatDate"
        :min-width="contract.effectiveFrom"
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
import { contract } from '@/config';
export default {
  name: 'ScenarioPreferredAirlines',
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
      preferredAirlineList: [
        {
          id: 1,
          airline: 'Acvila Air',
          contract: true,
          canMxc: 'primary',
          intraAfr: 'primary',
          intraAsia: 'secondary',
          intraCan: 'secondary',
          intraCsamr: 'primary'
        },
        {
          id: 2,
          airline: 'Adam Sky Connection',
          contract: true,
          canMxc: 'primary',
          intraAfr: 'primary',
          intraAsia: 'secondary',
          intraCan: 'secondary',
          intraCsamr: 'primary'
        },
        {
          id: 3,
          airline: 'Ai',
          contract: false,
          canMxc: 'primary',
          intraAfr: 'primary',
          intraAsia: 'secondary',
          intraCan: 'secondary',
          intraCsamr: 'primary'
        },
        {
          id: 4,
          airline: 'Adria Airways',
          contract: true,
          canMxc: 'primary',
          intraAfr: 'primary',
          intraAsia: 'secondary',
          intraCan: 'secondary',
          intraCsamr: 'primary'
        },
        {
          id: 5,
          airline: 'Aer Lingus',
          contract: true,
          canMxc: 'secondary',
          intraAfr: 'primary',
          intraAsia: 'secondary',
          intraCan: 'secondary',
          intraCsamr: 'primary'
        },
        {
          id: 6,
          airline: 'Aeroflot',
          contract: true,
          canMxc: 'primary',
          intraAfr: 'primary',
          intraAsia: 'secondary',
          intraCan: 'secondary',
          intraCsamr: 'primary'
        }
      ],
      selectedIdList: [],
      contract,
      options: [
        {
          value: 'primary',
          label: 'Primary'
        },
        {
          value: 'secondary',
          label: 'Secondary'
        }
      ]
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
