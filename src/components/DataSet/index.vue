<template>
  <div>
    <Navigation
      :filter-select-list="filterSelectList"
      :selected-filter="selectedFilter"
      @update-filter="updateFilter"
    />
    <router-view :filtered-data-set-list="filteredDataSetList" />
  </div>
</template>

<script>
import Navigation from './Navigation';
import { GET_DATA_SET_COLUMN_LIST } from '@/graphql/queries';
export default {
  name: 'DataSet',
  components: {
    Navigation
  },
  apollo: {
    dataSetColumnList: {
      query: GET_DATA_SET_COLUMN_LIST
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
        return this.dataSetColumnList.filter(set => set.status === null);
      } else if (this.selectedFilter === 'accept') {
        return this.dataSetColumnList.filter(set => set.status === 'accept');
      } else if (this.selectedFilter === 'reject') {
        return this.dataSetColumnList.filter(set => set.status === 'reject');
      }
      return [];
    },
    filterSelectList() {
      const all = this.dataSetColumnList.length;
      const need = this.dataSetColumnList.filter(set => set.status === null)
        .length;
      const accepted = this.dataSetColumnList.filter(
        set => set.status === 'accept'
      ).length;
      const rejected = this.dataSetColumnList.filter(
        set => set.status === 'reject'
      ).length;
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
    }
  }
};
</script>
