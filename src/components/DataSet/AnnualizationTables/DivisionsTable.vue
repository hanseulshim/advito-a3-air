<template>
  <div class="fixed-table-container">
    <div class="annualize-container">
      <div class="enable-annualization">
        <p>Annualization</p>
        <el-switch v-model="annualized" />
      </div>
      <div v-if="annualized" class="annualize-controls">
        <el-input v-model="annualizeAllBy" type="number" size="mini" />
        <button class="button annualization" @click="setAnnMonthsGlobal">
          ANNUALIZE ALL
        </button>
      </div>
    </div>
    <el-table
      :data="dataSetDivisionListCopy"
      show-summary
      :summary-method="getTotal"
    >
      <el-table-column prop="name">
        <template slot="header">
          <span class="header-container">
            <div class="updated-date" />
            <span class="header-text">Countries</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="numberDatasets" align="center">
        <template slot="header">
          <span class="header-container">
            <div class="updated-date" />
            <span class="header-text"># Datasets</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column v-if="annualized" align="center">
        <template slot="header">
          <span class="header-container">
            <div class="updated-date" />
            <span class="header-text">Ann. Months</span>
          </span>
        </template>
        <template slot-scope="props">
          <el-input
            v-model.number="props.row.annMonths"
            type="number"
            size="mini"
          />
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
            <div class="updated-date" />
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
import { formatNumber, formatDataSetCol, formatDateTime } from '@/helper';
import { GET_DATA_SET_DIVISION_LIST } from '@/graphql/queries';
export default {
  name: 'DivisionsTable',
  props: {
    selected: {
      type: String,
      required: true
    }
  },
  apollo: {
    dataSetDivisionList: {
      query: GET_DATA_SET_DIVISION_LIST,
      result({ data: { dataSetDivisionList } }) {
        this.dataSetDivisionListCopy = dataSetDivisionList.map(division => ({
          ...division,
          annMonths: division.numberDatasets
        }));
      }
    }
  },
  data() {
    return {
      dataSetDivisionList: [],
      dataSetDivisionListCopy: [],
      annualized: false,
      annualizeAllBy: 12
    };
  },
  computed: {
    selector() {
      const { path } = this.$route.params;
      return path === 'tickets'
        ? 'tickets'
        : path === 'segments'
        ? 'segments'
        : path === 'fare-paid'
        ? 'farePaid'
        : '';
    },
    selectorTotal() {
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

    getTotal(param) {
      const { columns, data } = param;
      const lastIdx = columns.length;

      if (!this.annualized) {
        return columns.map((col, i) => {
          if (i === 0) {
            return 'TOTAL';
          } else if (i === lastIdx - 1) {
            return this.formatNumber(
              data.reduce((a, b) => a + b[this.selectorTotal], 0)
            );
          }
        });
      } else {
        return columns.map((col, i) => {
          if (i === 0) {
            return 'TOTAL';
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
      return (this.dataSetDivisionListCopy = this.dataSetDivisionListCopy.map(
        division => ({
          ...division,
          annMonths: this.annualizeAllBy
        })
      ));
    },
    tableRowClassName() {
      if (this.annualized) {
        return 'active';
      } else return '';
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
