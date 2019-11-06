<template>
  <div class="data-set-table-container">
    <div class="fixed-table-container">
      <div class="icon-container" />
      <el-table
        :data="dataSetCountryList"
        show-summary
        :summary-method="getTotal"
      >
        <el-table-column prop="name" label="Countries">
          <template slot="header">
            <span class="header-container">
              <div class="updated-date" />
              <span class="header-text">Countries</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="ticketsTotal"
          align="right"
          :formatter="row => formatNumber(row[selectorTotal])"
        >
          <template slot="header">
            <span class="header-container">
              <div class="updated-date" />
              <span class="header-text">Tickets</span>
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
              :class="{ active: column.qc }"
              @click="toggleDataSet(column.name, true)"
            />
          </el-tooltip>
          <el-tooltip effect="dark" content="Need QC" placement="top">
            <i
              class="fas fa-minus data-icon qc"
              :class="{ active: column.qc === null }"
              @click="toggleDataSet(column.name, null)"
            />
          </el-tooltip>
          <el-tooltip effect="dark" content="Reject" placement="top">
            <i
              class="fas fa-times data-icon reject"
              :class="{ active: column.qc === false }"
              @click="toggleDataSet(column.name, false)"
            />
          </el-tooltip>
          <el-tooltip
            v-if="column.qc === false"
            effect="dark"
            content="Delete"
            placement="top"
          >
            <i
              class="fas fa-trash-alt delete"
              @click="showDeleteDatasetModal(column.name)"
            />
          </el-tooltip>
          <i v-else class="fas fa-trash-alt reject-hide" />
        </div>
        <el-table
          v-if="tableRendered"
          :key="column.id"
          :data="column.countryData"
          show-summary
          :summary-method="getSummaries"
          :row-class-name="tableRowClassName(column.qc)"
        >
          <el-table-column
            align="right"
            :formatter="row => formatNumber(row[selector])"
          >
            <template slot="header">
              <span class="header-container content">
                <span class="updated-date">{{
                  formatDateTime(column.dateUpdated)
                }}</span>
                <span class="header-text">{{
                  formatDataSetCol(column.date)
                }}</span>
              </span>
            </template>
          </el-table-column>
        </el-table>
        <p v-if="!tableRendered">Loading....</p>
      </div>
    </div>
    <DeleteDatasetModal @delete-dataset="deleteDataSet" />
  </div>
</template>

<script>
import { formatNumber, formatDataSetCol, formatDateTime } from '@/helper';
import {
  GET_DATA_SET_COUNTRY_LIST,
  GET_DATA_SET_COLUMN_LIST
} from '@/graphql/queries';
import { TOGGLE_DATA_SET, DELETE_DATA_SET } from '@/graphql/mutations';
import DeleteDatasetModal from './DeleteDatasetModal';
export default {
  name: 'ImportErrors',
  components: {
    DeleteDatasetModal
  },
  props: {
    filteredDataSetList: {
      required: true,
      type: Array
    },
    projectId: {
      type: Number,
      required: true
    }
  },
  apollo: {
    dataSetCountryList: {
      query: GET_DATA_SET_COUNTRY_LIST,
      variables() {
        return {
          projectId: this.projectId
        };
      }
    }
  },
  data() {
    return {
      dataSetCountryList: [],
      tableRendered: true
    };
  },
  computed: {
    selector() {
      const { path } = this.$route.params;
      return path === 'imported-tickets'
        ? 'importedTickets'
        : path === 'error-tickets'
        ? 'errorTickets'
        : path === 'error-ratio'
        ? 'errorRatio'
        : '';
    },
    selectorTotal() {
      return this.selector ? `${this.selector}Total` : '';
    }
  },
  watch: {
    filteredDataSetList: {
      deep: true,
      handler() {
        this.rerender();
      }
    }
  },
  methods: {
    formatDataSetCol(date) {
      return formatDataSetCol(date);
    },
    formatDateTime(date) {
      return formatDateTime(date);
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
    async toggleDataSet(name, qc) {
      const [year, month] = name.split('-');
      try {
        await this.$apollo.mutate({
          mutation: TOGGLE_DATA_SET,
          variables: {
            projectId: this.projectId,
            month: parseInt(month),
            year: parseInt(year),
            qc
          },
          refetchQueries: () => [
            {
              query: GET_DATA_SET_COLUMN_LIST,
              variables: {
                projectId: this.projectId
              }
            }
          ]
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    showDeleteDatasetModal(name) {
      this.$modal.show('deleteDataset', {
        id: name
      });
    },
    async deleteDataSet(name) {
      const [year, month] = name.split('-');
      this.tableRendered = false;
      try {
        await this.$apollo.mutate({
          mutation: DELETE_DATA_SET,
          variables: {
            projectId: this.projectId,
            month: parseInt(month),
            year: parseInt(year)
          },
          refetchQueries: () => [
            {
              query: GET_DATA_SET_COLUMN_LIST,
              variables: {
                projectId: this.projectId
              }
            }
          ]
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    tableRowClassName(status) {
      if (status === null || status === false) {
        return 'need-qc-row';
      }
      return '';
    },
    rerender() {
      this.$nextTick(() => {
        this.tableRendered = true;
      });
    }
  }
};
</script>
