<template>
  <div>
    <div class="section-header title-row">
      <i class="fas fa-exclamation-circle" />
      {{ pluralize('unaccepted data set', unacceptedDataSetList.length) }}
    </div>
    <el-table
      ref="locationCollection"
      :data="unacceptedDataSetList"
      style="width: 100%"
      max-height="750"
    >
      <el-table-column prop="id" label="Data Set Id" width="250" />
    </el-table>
  </div>
</template>

<script>
import { GET_DATA_SET_LIST } from '@/graphql/queries';
import { pluralize, formatDate } from '@/helper';

export default {
  name: 'DefaultData',
  apollo: {
    dataSetList: {
      query: GET_DATA_SET_LIST
    }
  },
  data() {
    return {
      dataSetList: []
    };
  },
  computed: {
    unacceptedDataSetList() {
      return this.dataSetList.filter(dataSet => !dataSet.status);
    },
    acceptedDataSetList() {
      return this.dataSetList.filter(dataSet => dataSet.status === 'accept');
    },
    rejectedDataSetList() {
      return this.dataSetList.filter(dataSet => dataSet.status === 'reject');
    }
  },
  methods: {
    pluralize(word, count) {
      return pluralize(word, count);
    },
    formatDate(row) {
      return formatDate(row.dateUpdated);
    }
  }
};
</script>
