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
        <div class="icon-container">
          <i
            class="fas fa-check data-icon accept"
            :class="{ active: column.status === 'accept' }"
            @click="togglePosTrend(column.id, 'accept')"
          />
          <i
            class="fas fa-minus data-icon qc"
            :class="{ active: column.status === null }"
            @click="togglePosTrend(column.id, null)"
          />
          <i
            class="fas fa-times data-icon reject"
            :class="{ active: column.status === 'reject' }"
            @click="togglePosTrend(column.id, 'reject')"
          />
          <i
            v-if="column.status === 'reject'"
            class="fas fa-trash-alt"
            @click="deletePosTrend(column.id)"
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
import {
  GET_POS_TRENDS_COUNTRY_LIST,
  GET_POS_TRENDS_COLUMN_LIST
} from '@/graphql/queries';
import { TOGGLE_POS_TREND, DELETE_POS_TREND } from '@/graphql/mutations';
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
