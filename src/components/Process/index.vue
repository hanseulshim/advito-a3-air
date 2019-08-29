<template>
  <div class="process-container">
    <div class="metrics-container">
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
            <span class="info-text-label">O&D RECORDS</span>
          </div>
          <div class="info-text">
            <span class="info-text-value processed">{{
              process.processing
                ? '—'
                : lastProcessed && lastProcessed.contracts
            }}</span>
            <span class="info-text-label">Processed Contracts</span>
          </div>
          <div class="info-text">
            <span class="info-text-value processed">{{
              process.processing ? '—' : lastProcessed && lastProcessed.dataSets
            }}</span>
            <span class="info-text-label">Processed Datasets</span>
          </div>
          <div class="info-text">
            <span class="info-text-value processed">{{
              process.processing
                ? '—'
                : lastProcessed && formatNumberLarge(lastProcessed.records)
            }}</span>
            <span class="info-text-label">Processed O&D Records</span>
          </div>
        </div>
        <div class="last-processed">
          <span>{{
            process.processing ? 'Process Started: ' : 'Last Processed: '
          }}</span>
          <span class="processed">{{
            process.processing
              ? getProcessDate(process.processStartDate)
              : getProcessDate(lastProcessed && lastProcessed.date)
          }}</span>
        </div>
      </div>
      <div class="progress-container">
        <el-progress
          v-loading="process.processing"
          type="circle"
          color="#5AB7B2"
          :stroke-width="10"
          :percentage="100"
          :show-text="!process.processing"
        />
        <button
          v-if="process.processing"
          class="button"
          @click="showCancelProcessModal"
        >
          CANCEL
        </button>
        <button v-else class="button" @click="startProcess">PROCESS</button>
        <div>* Data and Contracts have to be 100% QC'ed before Processing</div>
      </div>
    </div>
    <div class="recent-container">
      <div class="section-header title-row space-between">
        <div>
          {{ pluralize('recent process', process.recentProcessList.length) }}
        </div>
      </div>
      <el-table
        :data="process.recentProcessList"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
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
          prop="records"
          label="Total records"
          align="right"
          :formatter="row => formatNumber(row.records)"
          :min-width="processCol.records"
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
    <CancelProcessModal />
  </div>
</template>

<script>
import CancelProcessModal from './CancelProcessModal';
import { GET_PROCESS } from '@/graphql/queries';
import { START_PROCESS } from '@/graphql/mutations';
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
  components: {
    CancelProcessModal
  },
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
    lastProcessed() {
      const maxDate = Math.max(
        ...this.process.recentProcessList.map(v => v.date)
      );
      return this.process.recentProcessList.filter(v => v.date === maxDate)[0];
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
    },
    getProcessDate(date) {
      return `${this.formatDateTime(date)} (${formatDateFromNow(date)})`;
    },
    startProcess() {
      this.$apollo.mutate({
        mutation: START_PROCESS,
        update: (store, data) => {
          const startProcess = data.data.startProcess;
          const newData = store.readQuery({
            query: GET_PROCESS
          });
          newData.process = startProcess;
          store.writeQuery({
            query: GET_PROCESS,
            data: newData
          });
        }
      });
    },
    showCancelProcessModal() {
      this.$modal.show('cancel-process');
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/global.scss';
.process-container {
  padding: 2% 10%;
  display: flex;
  flex-direction: column;
  .metrics-container {
    display: flex;
    .info-container {
      flex: 1;
      margin-right: 2em;
      .info {
        padding: 2em 2em 0em 2em;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        position: relative;
      }
      .info-text {
        width: 30%;
        margin-bottom: 2em;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        .info-text-value {
          font-size: 40px;
        }
        .info-text-label {
          margin-top: 10px;
        }
      }
      .last-processed {
        background: $gallery;
        padding: 1em 2em;
        height: 3em;
        flex: 1;
        position: relative;
        bottom: 0;
      }

      .processed {
        color: $tradewind;
      }
    }
    .progress-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 2em;
    }
  }

  .recent-container {
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
