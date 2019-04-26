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
        <div class="icon-container">
          <el-tooltip effect="dark" content="Accept" placement="top">
            <i
              class="fas fa-check data-icon accept"
              :class="{ active: column.status === 'accept' }"
              @click="toggleDivisionTrend(column.id, 'accept')"
            />
          </el-tooltip>
          <el-tooltip effect="dark" content="Need QC" placement="top">
            <i
              class="fas fa-minus data-icon qc"
              :class="{ active: column.status === null }"
              @click="toggleDivisionTrend(column.id, null)"
          /></el-tooltip>
          <el-tooltip effect="dark" content="Reject" placement="top">
            <i
              class="fas fa-times data-icon reject"
              :class="{ active: column.status === 'reject' }"
              @click="toggleDivisionTrend(column.id, 'reject')"
          /></el-tooltip>
          <el-tooltip
            v-if="column.status === 'reject'"
            effect="dark"
            content="Delete"
            placement="top"
          >
            <i
              class="fas fa-trash-alt delete"
              @click="deleteDivisionTrend(column.id)"
            />
          </el-tooltip>
          <i v-else class="fas fa-trash-alt reject-hide" />
        </div>
        <el-table
          :data="column.data"
          show-summary
          :summary-method="getSummaries"
          :row-class-name="tableRowClassName(column.status)"
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
import {
  GET_DIVISION_TRENDS_LIST,
  GET_DIVISION_TRENDS_COLUMN_LIST
} from '@/graphql/queries';
import {
  TOGGLE_DIVISION_TREND,
  DELETE_DIVISION_TREND
} from '@/graphql/mutations';
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
    toggleDivisionTrend(id, status) {
      this.$apollo.mutate({
        mutation: TOGGLE_DIVISION_TREND,
        variables: {
          id,
          status
        }
      });
    },
    deleteDivisionTrend(id) {
      this.$apollo.mutate({
        mutation: DELETE_DIVISION_TREND,
        variables: { id },
        update: (store, data) => {
          const id = data.data.deleteDivisionTrend;
          const newData = store.readQuery({
            query: GET_DIVISION_TRENDS_COLUMN_LIST
          });
          const index = newData.divisionTrendsColumnList.filter(
            col => col.id === id
          )[0];
          newData.divisionTrendsColumnList.splice(index, 1);
          store.writeQuery({
            query: GET_DIVISION_TRENDS_COLUMN_LIST,
            variables: { id },
            data: newData
          });
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
