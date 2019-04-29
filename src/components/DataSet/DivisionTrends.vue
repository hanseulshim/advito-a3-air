<template>
  <div class="data-set-table-container">
    <div class="fixed-table-container">
      <div class="icon-container" />
      <el-table
        :data="dataSetDivisionList"
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
          <el-tooltip effect="dark" content="Accept" placement="top">
            <i
              class="fas fa-check data-icon accept"
              :class="{ active: column.status === 'accept' }"
              @click="toggleDataSet(column.id, 'accept')"
            />
          </el-tooltip>
          <el-tooltip effect="dark" content="Need QC" placement="top">
            <i
              class="fas fa-minus data-icon qc"
              :class="{ active: column.status === null }"
              @click="toggleDataSet(column.id, null)"
          /></el-tooltip>
          <el-tooltip effect="dark" content="Reject" placement="top">
            <i
              class="fas fa-times data-icon reject"
              :class="{ active: column.status === 'reject' }"
              @click="toggleDataSet(column.id, 'reject')"
          /></el-tooltip>
          <el-tooltip
            v-if="column.status === 'reject'"
            effect="dark"
            content="Delete"
            placement="top"
          >
            <i
              class="fas fa-trash-alt delete"
              @click="deleteDataSet(column.id)"
            />
          </el-tooltip>
          <i v-else class="fas fa-trash-alt reject-hide" />
        </div>
        <el-table
          :data="column.divisionTrendList"
          show-summary
          :summary-method="getSummaries"
          :row-class-name="tableRowClassName(column.status)"
        >
          <el-table-column
            align="right"
            :formatter="row => formatNumber(row[selector])"
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
  GET_DATA_SET_DIVISION_LIST,
  GET_DATA_SET_COLUMN_LIST
} from '@/graphql/queries';
import { TOGGLE_DATA_SET, DELETE_DATA_SET } from '@/graphql/mutations';
export default {
  name: 'DivisionTrends',
  props: {
    filteredDataSetList: {
      required: true,
      type: Array
    }
  },
  apollo: {
    dataSetDivisionList: {
      query: GET_DATA_SET_DIVISION_LIST
    }
  },
  data() {
    return {
      dataSetDivisionList: []
    };
  },
  computed: {
    selector: function() {
      const { path } = this.$route.params;
      return path === 'tickets'
        ? 'tickets'
        : path === 'segments'
        ? 'segments'
        : path === 'fare-paid'
        ? 'farePaid'
        : '';
    },
    selectorTotal: function() {
      return this.selector ? `${this.selector}Total` : '';
    }
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
          data.reduce((a, b) => a + b[this.selector], 0)
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
          data.reduce((a, b) => a + b[this.selectorTotal], 0)
        );
      });
    },
    toggleDataSet(id, status) {
      this.$apollo.mutate({
        mutation: TOGGLE_DATA_SET,
        variables: {
          id,
          status
        }
      });
    },
    deleteDataSet(id) {
      this.$apollo.mutate({
        mutation: DELETE_DATA_SET,
        variables: { id },
        update: (store, data) => {
          const id = data.data.deleteDataSet;
          const newData = store.readQuery({
            query: GET_DATA_SET_COLUMN_LIST
          });
          const index = newData.dataSetColumnList.filter(
            col => col.id === id
          )[0];
          newData.dataSetColumnList.splice(index, 1);
          store.writeQuery({
            query: GET_DATA_SET_COLUMN_LIST,
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
