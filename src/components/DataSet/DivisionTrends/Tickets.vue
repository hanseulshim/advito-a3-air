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
          prop="ticketsTotal"
          align="right"
          :formatter="row => formatNumber(row.ticketsTotal)"
        >
          <template slot="header">
            <span class="header-container">
              <div class="updated-date" />
              <span class="header-text">
                Tickets
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
        <div class="icon-container">
          <div
            class="icon-text-container"
            :class="{ active: column.status === 'accept' }"
            @click="toggleDivisionTrend(column.id, 'accept')"
          >
            Accept
            <i class="fas fa-circle accept" />
          </div>
          <div
            class="icon-text-container"
            :class="{ active: column.status === null }"
            @click="toggleDivisionTrend(column.id, null)"
          >
            QC
            <i class="fas fa-circle" />
          </div>
          <div
            class="icon-text-container"
            :class="{ active: column.status === 'reject' }"
            @click="toggleDivisionTrend(column.id, 'reject')"
          >
            Reject
            <i class="fas fa-circle reject" />
          </div>
        </div>
        <el-table
          :data="column.data"
          show-summary
          :summary-method="getSummaries"
          :row-class-name="tableRowClassName(column.status)"
        >
          <el-table-column
            align="right"
            :formatter="row => formatNumber(row.tickets)"
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
  name: 'Tickets',
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
            return a + b.tickets;
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
            return a + b.ticketsTotal;
          }, 0)
        );
      });
    },
    toggleDivisionTrend(id, status) {
      this.$apollo.mutate({
        mutation: TOGGLE_DIVISION_TREND,
        variables: {
          id,
          status
        }
      });
    },
    tableRowClassName(status) {
      if (status === null || status === 'reject') {
        return 'need-qc-row';
      }
      return '';
    }
  }
};
</script>
