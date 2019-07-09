<template>
  <div v-loading="$apollo.loading">
    <Navigation
      :filter-select-list="filterSelectList"
      :selected-filter="selectedFilter"
      @update-filter="updateFilter"
    />
    <router-view
      :filtered-data-set-list="filteredDataSetList"
      :check-status="checkStatus"
    />
  </div>
</template>

<script>
import Navigation from './Navigation';
import { GET_DATA_SET_COLUMN_LIST } from '@/graphql/queries';
import { UPDATE_PROJECT_STATUS } from '@/graphql/mutations';
export default {
  name: 'DataSet',
  components: {
    Navigation
  },
  apollo: {
    dataSetColumnList: {
      query: GET_DATA_SET_COLUMN_LIST,
      result({ data }) {
        this.checkStatus(data.dataSetColumnList);
      }
    }
  },
  data() {
    return {
      dataSetColumnList: [],
      selectedFilter: 'all'
    };
  },
  computed: {
    filteredDataSetList() {
      if (this.selectedFilter === 'all') {
        return this.dataSetColumnList;
      } else if (this.selectedFilter === 'need') {
        return this.dataSetColumnList.filter(set => set.qc === null);
      } else if (this.selectedFilter === 'accept') {
        return this.dataSetColumnList.filter(set => set.qc);
      } else if (this.selectedFilter === 'reject') {
        return this.dataSetColumnList.filter(set => set.qc === false);
      }
      return [];
    },
    filterSelectList() {
      const all = this.dataSetColumnList.length;
      const need = this.dataSetColumnList.filter(set => set.qc === null).length;
      const accepted = this.dataSetColumnList.filter(set => set.qc).length;
      const rejected = this.dataSetColumnList.filter(set => set.qc === false)
        .length;
      return [
        {
          value: 'all',
          name: `All Datasets (${all})`
        },
        {
          value: 'need',
          name: `Need QC (${need})`
        },
        {
          value: 'accept',
          name: `Accepted (${accepted})`
        },
        {
          value: 'reject',
          name: `Rejected (${rejected})`
        }
      ];
    }
  },
  methods: {
    updateFilter(value) {
      this.selectedFilter = value;
    },
    checkStatus() {
      const check = this.dataSetColumnList.every(col => col.qc);
      const status = check ? 'valid' : 'invalid';
      this.$apollo.mutate({
        mutation: UPDATE_PROJECT_STATUS,
        variables: {
          id: 2,
          status
        }
      });
    }
  }
};
</script>
