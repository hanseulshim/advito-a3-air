<template>
  <div class="fixed-table-container">
    <div class="annualize-container">
      <div class="enable-annualization">
        <p>Annualization</p>
        <el-switch v-model="annualized"/>
      </div>
      <div class="annualize-controls" v-if="annualized">
        <el-input v-model="annualizeAllBy" type="number" size="mini"/>
        <button class="button annualization" v-on:click="setAnnMonthsGlobal">ANNUALIZE ALL</button>
      </div>
    </div>
    <el-table :data="dataSetCountryListCopy" show-summary :summary-method="getTotal">
      <el-table-column prop="name">
        <template slot="header">
          <span class="header-container">
            <div class="updated-date"/>
            <span class="header-text">Countries</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="numberDatasets" align="center">
        <template slot="header">
          <span class="header-container">
            <div class="updated-date"/>
            <span class="header-text"># Datasets</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column v-if="annualized" align="right">
        <template slot="header">
          <span class="header-container">
            <div class="updated-date"/>
            <span class="header-text">Ann. Months</span>
          </span>
        </template>
        <template slot-scope="props">
          <el-input type="number" size="mini" v-model.number="props.row.annMonths"/>
        </template>
      </el-table-column>
      <el-table-column
        :prop="selectorTotal"
        align="right"
        :formatter="row => formatNumber(row[selectorTotal])"
        :class-name="tableRowClassName()"
      >
        <template slot="header">
          <span class="header-container">
            <div class="updated-date"/>
            <span class="header-text">Total</span>
          </span>
        </template>
        <template slot-scope="props">
          <div>{{ calcRowTotal(props.row) }}</div>
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
  props: {
    selected: String
  },
  apollo: {
    dataSetCountryList: {
      query: GET_DATA_SET_COUNTRY_LIST,
      result({ data: { dataSetCountryList } }) {
        this.dataSetCountryListCopy = dataSetCountryList.map(country => ({
          ...country,
          annMonths: country.numberDatasets
        }));
      }
    }
  },
  data() {
    return {
      dataSetCountryList: [],
      dataSetCountryListCopy: [],
      annualized: false,
      annualizeAllBy: 12
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
    getTotal(param) {
      const { columns, data } = param;
      const lastIdx = columns.length;

      if (!this.annualized) {
        return columns.map((col, i) => {
          if (i === 0) {
            return "TOTAL";
          } else if (i === lastIdx - 1) {
            return this.formatNumber(
              data.reduce((a, b) => a + b[this.selectorTotal], 0)
            );
          }
        });
      } else {
        return columns.map((col, i) => {
          if (i === 0) {
            return "TOTAL";
          } else if (i === lastIdx - 1) {
            return this.formatNumber(
              data.reduce(
                (a, b) => a + b[this.selectorTotal] * (12 / b.annMonths),
                0
              )
            );
          }
        });
      }
    },
    setAnnMonthsGlobal() {
      return (this.dataSetCountryListCopy = this.dataSetCountryListCopy.map(
        country => ({
          ...country,
          annMonths: this.annualizeAllBy
        })
      ));
    },
    tableRowClassName() {
      if (this.annualized) {
        return "active";
      } else return "";
    },
    calcRowTotal(row) {
      const multiplier = 12 / row.annMonths;
      if (this.annualized) {
        return this.formatNumber(row[this.selectorTotal] * multiplier);
      } else {
        return this.formatNumber(row[this.selectorTotal]);
      }
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
  justify-content: space-between;
}

.enable-annualization {
  display: flex;
  align-items: center;
  p {
    margin-right: 10%;
  }
}

.active {
  color: $tree-poppy;
}

.annualize-controls {
  display: flex;
  .el-input {
    width: 65px;

    &:focus {
      border: 1px solid $tree-poppy;
    }
  }
  button {
    margin-left: 10px;
  }
}
</style>




