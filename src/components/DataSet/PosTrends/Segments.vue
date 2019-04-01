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
          prop="segmentsTotal"
          align="right"
          :formatter="row => formatNumber(row.segmentsTotal)"
        >
          <template slot="header">
            <span class="header-container">
              <div class="updated-date" />
              <span class="header-text">
                Segments
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
            :formatter="row => formatNumber(row.segments)"
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
  name: 'Segments',
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
            return a + b.segments;
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
            return a + b.segmentsTotal;
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
