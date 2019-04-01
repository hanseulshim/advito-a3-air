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
        <div class="icon-container" @click="togglePosTrend(column.id)">
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
            align="center"
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
import { tableColumnWidth } from '@/config';
import { GET_POS_TRENDS_COUNTRY_LIST } from '@/graphql/queries';
import { TOGGLE_POS_TREND } from '@/graphql/mutations';
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
      posTrendsColumnList: [],
      tableColumnWidth
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
    togglePosTrend(id) {
      this.$apollo.mutate({
        mutation: TOGGLE_POS_TREND,
        variables: {
          id
        }
      });
    }
  }
};
</script>

<style lang="scss">
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
        height: 25px;
        font-weight: 300;
      }
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
    justify-content: center;
    height: 30px;
    .fa-circle {
      cursor: pointer;
    }
  }
}
</style>
