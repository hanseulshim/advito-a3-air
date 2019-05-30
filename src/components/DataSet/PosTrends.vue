<template>
  <div class="data-set-table-container">
    <CountriesTable :selected="selector" />
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
            />
          </el-tooltip>
          <el-tooltip effect="dark" content="Reject" placement="top">
            <i
              class="fas fa-times data-icon reject"
              :class="{ active: column.status === 'reject' }"
              @click="toggleDataSet(column.id, 'reject')"
            />
          </el-tooltip>
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
          :data="column.posTrendList"
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
                <span class="updated-date">{{
                  formatDateTime(column.dateUpdated)
                }}</span>
                <span class="header-text">{{
                  formatDataSetCol(column.name)
                }}</span>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { formatNumber, formatDataSetCol, formatDateTime } from '@/helper';
import {
  GET_DATA_SET_COUNTRY_LIST,
  GET_DATA_SET_COLUMN_LIST
} from '@/graphql/queries';
import CountriesTable from './AnnualizationTables/CountriesTable';
import { TOGGLE_DATA_SET, DELETE_DATA_SET } from '@/graphql/mutations';
export default {
  name: 'PosTrends',
  components: {
    CountriesTable
  },
  props: {
    filteredDataSetList: {
      required: true,
      type: Array
    },
    checkStatus: {
      required: true,
      type: Function
    }
  },
  apollo: {
    dataSetCountryList: {
      query: GET_DATA_SET_COUNTRY_LIST
    }
  },
  data() {
    return {
      dataSetCountryList: []
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

<style lang="scss">
@import '@/styles/global.scss';
.data-set-table-container {
  margin-top: 2em;
  display: flex;
  max-height: 750px;
  overflow: auto;
  .el-table {
    .cell {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .header-container {
      height: 45px;
      display: flex;
      flex-direction: column;
      &.content {
        align-items: center;
      }
      .updated-date {
        height: 19px;
        font-weight: 300;
      }
    }
    .need-qc-row {
      background: $ebb;
    }
  }
  .fixed-table-container {
    width: 25%;
    margin-right: 15px;
  }
  .column-table-container {
    flex: 1;
    display: flex;
    .column-table {
      width: 175px;
    }
  }
  .icon-container {
    display: flex;
    height: 40px;
    justify-content: space-evenly;
    align-items: center;
    .delete {
      cursor: pointer;
    }
    .reject-hide {
      opacity: 0;
    }
    .data-icon {
      border: 1px solid;
      padding: 5px;
      border-radius: 100%;
      width: 10px;
      height: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      opacity: 0.7;
      &.accept {
        color: $wild-willow;
        border-color: $wild-willow;
      }
      &.reject {
        color: $monza;
        border-color: $monza;
      }
      &.active {
        color: $white;
        opacity: 1;
        &.qc {
          background: $dove-gray;
        }
        &.accept {
          background: $wild-willow;
        }
        &.reject {
          background: $monza;
        }
      }
    }
  }
}
</style>
