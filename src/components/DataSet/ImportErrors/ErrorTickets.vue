<template>
  <div class="data-set-table-container">
    <div class="fixed-table-container">
      <div class="icon-container" />
      <el-table
        :data="importErrorsCountryList"
        show-summary
        :summary-method="getTotal"
      >
        <el-table-column prop="name" label="Countries">
          <template slot="header">
            <span class="header-container">
              <div class="updated-date" />
              <span class="header-text">
                Countries
              </span>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="errorTicketsTotal"
          align="right"
          :formatter="row => formatNumber(row.errorTicketsTotal)"
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
          <i
            class="fas fa-check data-icon accept"
            :class="{ active: column.status === 'accept' }"
            @click="toggleImportError(column.id, 'accept')"
          />
          <i
            class="fas fa-minus data-icon qc"
            :class="{ active: column.status === null }"
            @click="toggleImportError(column.id, null)"
          />
          <i
            class="fas fa-times data-icon reject"
            :class="{ active: column.status === 'reject' }"
            @click="toggleImportError(column.id, 'reject')"
          />
          <i
            v-if="column.status === 'reject'"
            class="fas fa-trash-alt"
            @click="deleteImportError(column.id)"
          />
        </div>
        <el-table
          :data="column.data"
          show-summary
          :summary-method="getSummaries"
          :row-class-name="tableRowClassName(column.status)"
        >
          <el-table-column
            align="right"
            :formatter="row => formatNumber(row.errorTickets)"
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
  GET_IMPORT_ERRORS_COUNTRY_LIST,
  GET_IMPORT_ERRORS_COLUMN_LIST
} from '@/graphql/queries';
import { TOGGLE_IMPORT_ERROR, DELETE_IMPORT_ERROR } from '@/graphql/mutations';
export default {
  name: 'ErrorTickets',
  props: {
    filteredDataSetList: {
      required: true,
      type: Array
    }
  },
  apollo: {
    importErrorsCountryList: {
      query: GET_IMPORT_ERRORS_COUNTRY_LIST
    }
  },
  data() {
    return {
      importErrorsCountryList: []
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
            return a + b.errorTickets;
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
            return a + b.errorTicketsTotal;
          }, 0)
        );
      });
    },
    toggleImportError(id, status) {
      this.$apollo.mutate({
        mutation: TOGGLE_IMPORT_ERROR,
        variables: {
          id,
          status
        }
      });
    },
    deleteImportError(id) {
      this.$apollo.mutate({
        mutation: DELETE_IMPORT_ERROR,
        variables: { id },
        update: (store, data) => {
          const id = data.data.deleteImportError;
          const newData = store.readQuery({
            query: GET_IMPORT_ERRORS_COLUMN_LIST
          });
          const index = newData.importErrorsColumnList.filter(
            col => col.id === id
          )[0];
          newData.importErrorsColumnList.splice(index, 1);
          store.writeQuery({
            query: GET_IMPORT_ERRORS_COLUMN_LIST,
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
