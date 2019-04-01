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
import {
  GET_POS_TRENDS_COLUMN_LIST,
  GET_DIVISION_TRENDS_COLUMN_LIST,
  GET_IMPORT_ERRORS_COLUMN_LIST
} from '@/graphql/queries';
export default {
  name: 'DataSet',
  components: {
    Navigation
  },
  apollo: {
    posTrendsColumnList: {
      query: GET_POS_TRENDS_COLUMN_LIST
    },
    divisionTrendsColumnList: {
      query: GET_DIVISION_TRENDS_COLUMN_LIST
    },
    importErrorsColumnList: {
      query: GET_IMPORT_ERRORS_COLUMN_LIST
    }
  },
  data() {
    return {
      posTrendsColumnList: [],
      divisionTrendsColumnList: [],
      importErrorsColumnList: [],
      selectedFilter: 'all'
    };
  },
  computed: {
    dataSetList() {
      if (this.$route.path.includes('pos-trends')) {
        return this.posTrendsColumnList.slice();
      } else if (this.$route.path.includes('division-trends')) {
        return this.divisionTrendsColumnList.slice();
      } else if (this.$route.path.includes('import-errors')) {
        return this.importErrorsColumnList.slice();
      }
      return [];
    },
    filteredDataSetList() {
      if (this.selectedFilter === 'all') {
        return this.dataSetList;
      } else if (this.selectedFilter === 'need') {
        return this.dataSetList.filter(set => set.status === null);
      } else if (this.selectedFilter === 'accept') {
        return this.dataSetList.filter(set => set.status === 'accept');
      } else if (this.selectedFilter === 'reject') {
        return this.dataSetList.filter(set => set.status === 'reject');
      }
      return [];
    },
    filterSelectList() {
      const all = this.dataSetList.length;
      const need = this.dataSetList.filter(set => set.status === null).length;
      const accepted = this.dataSetList.filter(set => set.status === 'accept')
        .length;
      const rejected = this.dataSetList.filter(set => set.status === 'reject')
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
    }
  }
};
</script>
