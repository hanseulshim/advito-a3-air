<template>
  <div class="fixed-table-container">
    <div class="annualize-container">
      <p>Annualization</p>
      <el-switch v-model="annualized"/>
    </div>
    <el-table :data="dataSetCountryList" show-summary :summary-method="getTotal">
      <el-table-column prop="name" label="Countries">
        <template slot="header">
          <span class="header-container">
            <div class="updated-date"/>
            <span class="header-text">Countries</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column v-if="annualized" prop="numberDatasets" align="right">
        <template slot="header">
          <span class="header-container">
            <div class="updated-date"/>
            <span class="header-text"># Datasets</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column v-if="annualized" prop="numberDatasets" align="right">
        <template slot="header">
          <span class="header-container">
            <div class="updated-date"/>
            <span class="header-text">Annualization Months</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="importedTicketsTotal"
        align="right"
        :formatter="row => formatNumber(row.ticketsTotal)"
      >
        <template slot="header">
          <span class="header-container">
            <div class="updated-date"/>
            <span class="header-text">Tickets</span>
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { formatNumber, formatDataSetCol, formatDateTime } from "@/helper";
import { GET_DATA_SET_COUNTRY_LIST } from "@/graphql/queries";
export default {
  name: "CountriesTable",
  props: {},
  apollo: {
    dataSetCountryList: {
      query: GET_DATA_SET_COUNTRY_LIST
    }
  },
  data() {
    return {
      dataSetCountryList: [],
      annualized: false,
      annualizeAllBy: null
    };
  },
  computed: {
    selector: function() {
      const { path } = this.$route.params;
      return path === "tickets"
        ? "tickets"
        : path === "segments"
        ? "segments"
        : path === "fare-paid"
        ? "farePaid"
        : "";
    },
    selectorTotal: function() {
      return this.selector ? `${this.selector}Total` : "";
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
          return "TOTAL";
        }
        return this.formatNumber(
          data.reduce((a, b) => a + b[this.selectorTotal], 0)
        );
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/global.scss";
.annualize-container {
  display: flex;
  height: 40px;
  align-items: center;
}
</style>




