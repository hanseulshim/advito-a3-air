<template>
  <div class="process-container">
    <div class="info-container">
      <div class="info">
        <div class="info-text">
          <span class="info-text-value">{{ process.contracts }}</span>
          <span class="info-text-label">CONTRACTS</span>
        </div>
        <div class="info-text">
          <span class="info-text-value">{{ process.dataSets }}</span>
          <span class="info-text-label">DATASETS</span>
        </div>
        <div class="info-text">
          <span class="info-text-value">{{
            formatNumberLarge(process.records)
          }}</span>
          <span class="info-text-label">RECORDS</span>
        </div>
        <div class="info-text">
          <span class="info-text-value processed">{{
            lastProcessed && lastProcessed.contracts
          }}</span>
          <span class="info-text-label">Processed Contracts</span>
        </div>
        <div class="info-text">
          <span class="info-text-value processed">{{
            lastProcessed && lastProcessed.dataSets
          }}</span>
          <span class="info-text-label">Processed Datasets</span>
        </div>
        <div class="info-text">
          <span class="info-text-value processed">{{
            lastProcessed && formatNumberLarge(lastProcessed.records)
          }}</span>
          <span class="info-text-label">Processed Records</span>
        </div>
      </div>
      <div class="last-processed info-text">
        <span>Last Processed</span>
        <span class="processed">{{ lastProcessedDate }}</span>
      </div>
    </div>
    <div class="progress-container">
      <el-progress
        type="circle"
        color="#5AB7B2"
        :stroke-width="10"
        :percentage="25"
      />
      <button class="button">PROCESS</button>
      <div>* Data and Contracts have to be 100% QC'ed before Processing</div>
    </div>
    <div class="recent-container">
      <div class="section-header title-row space-between">
        <div>
          {{ pluralize('recent process', process.recentProcessList.length) }}
        </div>
      </div>
      <el-table :data="process.recentProcessList">
        <el-table-column
          prop="date"
          label="Date"
          :formatter="row => formatDateTime(row.date)"
          :min-width="processCol.date"
        />
        <el-table-column
          prop="contracts"
          label="Contracts"
          align="right"
          :min-width="processCol.contracts"
        />
        <el-table-column
          prop="dataSets"
          label="Datasets"
          align="right"
          :min-width="processCol.dataSets"
        />
        <el-table-column
          prop="totalRecords"
          label="Total records"
          align="right"
          :formatter="row => formatNumber(row.totalRecords)"
          :min-width="processCol.totalRecords"
        />
        <el-table-column
          prop="processDuration"
          label="Process duration"
          align="right"
          :formatter="row => formatTime(row.processDuration)"
          :min-width="processCol.processDuration"
        />
        <el-table-column
          prop="status"
          label="Status"
          :formatter="row => formatStatus(row.status)"
          :min-width="processCol.status"
        />
        <el-table-column
          prop="processedBy"
          label="Processed By"
          :min-width="processCol.processedBy"
        />
      </el-table>
    </div>
  </div>
</template>

<script>
import { GET_PROCESS } from '@/graphql/queries';
import { processCol } from '@/config';
import {
  formatNumber,
  formatNumberLarge,
  formatTime,
  formatPercent,
  formatDateFromNow,
  formatDateTime,
  pluralize
} from '@/helper';
export default {
  name: 'Process',
  apollo: {
    process: {
      query: GET_PROCESS
    }
  },
  data() {
    return {
      process: {
        contracts: null,
        dataSets: null,
        recentProcessList: [],
        records: null
      },
      processCol
    };
  },
  computed: {
    lastProcessed: function() {
      const maxDate = Math.max(
        ...this.process.recentProcessList.map(v => v.date)
      );
      return this.process.recentProcessList.filter(v => v.date === maxDate)[0];
    },
    lastProcessedDate: function() {
      if (this.lastProcessed) {
        return `${this.formatDateTime(
          this.lastProcessed.date
        )} (${formatDateFromNow(this.lastProcessed.date)})`;
      }
      return null;
    }
  },
  methods: {
    pluralize(word, count) {
      return pluralize(word, count);
    },
    formatNumber(num) {
      return formatNumber(num);
    },
    formatNumberLarge(num) {
      return formatNumberLarge(num);
    },
    formatTime(time) {
      const timeFormat = formatTime(time).split(':');
      const hours = parseInt(this.formatNumber(timeFormat[1]));
      const minutes = this.formatNumber(timeFormat[2]);
      return hours ? `${hours} hr ${minutes} min` : `${minutes} min`;
    },
    formatDateTime(date) {
      return formatDateTime(date);
    },
    formatStatus(status) {
      return `${formatPercent(status)} Complete`;
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/global.scss';
.process-container {
  padding: 2% 10%;
  display: grid;
  grid-template-areas:
    'info progress'
    'recent recent';
  grid-template-columns: 50% 50%;
  grid-column-gap: 2em;
  .info-container {
    grid-area: info;
    .info {
      padding: 2em;
      display: grid;
      grid-template-areas:
        'contracts dataSets records'
        'contracts dataSets records';
      grid-gap: 2em 0;
    }
    .info-text {
      display: flex;
      flex-direction: column;
      .info-text-value {
        font-size: 40px;
      }
      .processed {
        color: $tradewind;
      }
      .info-text-label {
        margin-top: 10px;
      }
    }
    .last-processed {
      background: $gallery;
      padding: 1em 2em;
    }
  }
  .progress-container {
    grid-area: progress;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 2em;
  }
  .recent-container {
    grid-area: recent;
    margin-top: 3em;
  }
  .info-container,
  .progress-container {
    border: 1px solid $gray-nurse;
    border-radius: 10px;
  }
  .el-progress--circle {
    .el-progress__text {
      font-size: 30px !important;
      color: $tradewind;
    }
  }
}
</style>
