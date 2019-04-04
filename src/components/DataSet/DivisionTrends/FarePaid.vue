<template>
  <div class="data-set-table-container">
    <div class="fixed-table-container">
      <div class="icon-container" />
      <el-table
        :data="divisionTrendsList"
        show-summary
        :summary-method="getTotal"
      >
        <el-table-column prop="name" label="Countries">
          <template slot="header">
            <span class="header-container">
              <div class="updated-date" />
              <span class="header-text">
                Divisions
              </span>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="farePaidTotal"
          align="right"
          :formatter="row => formatNumber(row.farePaidTotal)"
        >
          <template slot="header">
            <span class="header-container">
              <div class="updated-date" />
              <span class="header-text">
                Fare Paid
              </span>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="column-table-container">
      <div
        v-for="column in filteredDataSetList"
        :key="column.id"
        class="column-table"
      >
        <div class="icon-container" @click="toggleDivisionTrend(column.id)">
          <i v-if="column.status === null" class="fas fa-circle"></i>
          <el-switch
            v-else
            :value="column.status === 'accept'"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </div>
        <el-table
          :data="column.data"
          show-summary
          :summary-method="getSummaries"
        >
          <el-table-column
            align="right"
            :formatter="row => formatNumber(row.farePaid)"
          >
            <template slot="header">
              <span class="header-container content">
                <span class="updated-date">
                  {{ formatDataSetUpdated(column.dateUpdated) }}
                </span>
                <span class="header-text">
                  {{ formatDataSetCol(column.name) }}
                </span>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { formatNumber, formatDataSetCol, formatDataSetUpdated } from '@/helper';
import { GET_DIVISION_TRENDS_LIST } from '@/graphql/queries';
import { TOGGLE_DIVISION_TREND } from '@/graphql/mutations';
export default {
  name: 'FarePaid',
  props: {
    filteredDataSetList: {
      required: true,
      type: Array
    }
  },
  apollo: {
    divisionTrendsList: {
      query: GET_DIVISION_TRENDS_LIST
    }
  },
  data() {
    return {
      divisionTrendsList: []
    };
  },
  methods: {
    formatDataSetCol(date) {
      return formatDataSetCol(date);
    },
    formatDataSetUpdated(date) {
      return formatDataSetUpdated(date);
    },
    formatNumber(num) {
      return formatNumber(num);
    },
    getSummaries(param) {
      const { columns, data } = param;
      return columns.map(() => {
        return this.formatNumber(
          data.reduce((a, b) => {
            return a + b.farePaid;
          }, 0)
        );
      });
    },
    getTotal(param) {
      const { columns, data } = param;
      return columns.map((col, i) => {
        if (i === 0) {
          return 'TOTAL';
        }
        return this.formatNumber(
          data.reduce((a, b) => {
            return a + b.farePaidTotal;
          }, 0)
        );
      });
    },
    toggleDivisionTrend(id) {
      this.$apollo.mutate({
        mutation: TOGGLE_DIVISION_TREND,
        variables: {
          id
        }
      });
    }
  }
};
</script>
