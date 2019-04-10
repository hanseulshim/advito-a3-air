<template>
  <div class="data-set-table-container">
    <div class="fixed-table-container">
      <div class="icon-container" />
      <el-table
        :data="posTrendsCountryList"
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
              @click="togglePosTrend(column.id, 'accept')"
            />
          </el-tooltip>
          <el-tooltip effect="dark" content="Need QC" placement="top">
            <i
              class="fas fa-minus data-icon qc"
              :class="{ active: column.status === null }"
              @click="togglePosTrend(column.id, null)"
          /></el-tooltip>
          <el-tooltip effect="dark" content="Reject" placement="top">
            <i
              class="fas fa-times data-icon reject"
              :class="{ active: column.status === 'reject' }"
              @click="togglePosTrend(column.id, 'reject')"
          /></el-tooltip>
          <i
            v-if="column.status === 'reject'"
            class="fas fa-trash-alt delete"
            @click="deletePosTrend(column.id)"
          />
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
import {
  GET_POS_TRENDS_COUNTRY_LIST,
  GET_POS_TRENDS_COLUMN_LIST
} from '@/graphql/queries';
import { TOGGLE_POS_TREND, DELETE_POS_TREND } from '@/graphql/mutations';
export default {
  name: 'Tickets',
  props: {
    filteredDataSetList: {
      required: true,
      type: Array
    }
  },
  apollo: {
    posTrendsCountryList: {
      query: GET_POS_TRENDS_COUNTRY_LIST
    }
  },
  data() {
    return {
      posTrendsCountryList: []
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
    togglePosTrend(id, status) {
      this.$apollo.mutate({
        mutation: TOGGLE_POS_TREND,
        variables: {
          id,
          status
        }
      });
    },
    deletePosTrend(id) {
      this.$apollo.mutate({
        mutation: DELETE_POS_TREND,
        variables: { id },
        update: (store, data) => {
          const id = data.data.deletePosTrend;
          const newData = store.readQuery({
            query: GET_POS_TRENDS_COLUMN_LIST
          });
          const index = newData.posTrendsColumnList.filter(
            col => col.id === id
          )[0];
          newData.posTrendsColumnList.splice(index, 1);
          store.writeQuery({
            query: GET_POS_TRENDS_COLUMN_LIST,
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
