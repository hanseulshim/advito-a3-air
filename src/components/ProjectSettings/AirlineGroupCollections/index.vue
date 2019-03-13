<template>
  <div class="airline-group-collection-container">
    <div class="section-header title-row space-between">
      {{
        pluralize('airline group collection', airlineGroupCollectionList.length)
      }}
    </div>
    <el-table
      ref="airlineGroupCollection"
      :data="airlineGroupCollectionList"
      @expand-change="updateExpand"
    >
      <el-table-column type="expand" width="0">
        <template slot-scope="props">
          <AirlineGroupTable :airline-group-list="props.row.airlineGroupList" />
        </template>
      </el-table-column>
      <el-table-column width="35">
        <template slot-scope="scope">
          <i
            v-if="expandedRows.indexOf(scope.row.id) === -1"
            class="fas fa-plus table-toggle-icon"
            @click="toggleRow(scope)"
          ></i>
          <i
            v-else
            class="fas fa-minus table-toggle-icon"
            @click="toggleRow(scope)"
          ></i>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="Airline Group Collection"
        width="250"
        sortable
      />
      <el-table-column label="Groups" width="100" sortable>
        <template slot-scope="scope">
          <div>{{ scope.row.airlineGroupList.length }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="Description" />
      <el-table-column
        prop="dateUpdated"
        label="Date Updated"
        sortable
        :formatter="formatDate"
        width="150"
      />
      <el-table-column label="Status" width="100">
        <template slot-scope="scope">
          <el-switch :value="scope.row.active" active-color="#ff9e16">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="Actions" width="75">
        <template slot-scope="scope">
          <div class="edit-project-container">
            <i class="far fa-copy"></i>
            <i v-if="scope.row.id !== 1" class="fas fa-pencil-alt"></i>
            <i v-if="scope.row.id !== 1" class="fas fa-trash-alt"></i>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { pluralize, formatDate } from '@/helper';
import { GET_AIRLINE_GROUP_COLLECTION_LIST } from '@/graphql/queries';
import AirlineGroupTable from './AirlineGroupTable';
export default {
  name: 'AirlineGroupCollections',
  components: {
    AirlineGroupTable
  },
  apollo: {
    airlineGroupCollectionList: {
      query: GET_AIRLINE_GROUP_COLLECTION_LIST
    }
  },
  data() {
    return {
      airlineGroupCollectionList: [],
      expandedRows: []
    };
  },
  methods: {
    pluralize(word, count) {
      return pluralize(word, count);
    },
    formatDate(row) {
      return formatDate(row.dateUpdated);
    },
    showInfoModal() {
      this.$modal.show('info');
    },
    toggleRow(scope) {
      this.$refs.airlineGroupCollection.toggleRowExpansion(scope.row);
    },
    updateExpand(row, expandedRows) {
      this.expandedRows = expandedRows.map(row => row.id);
    },
    getCountryNames(countryList) {
      return countryList.length > 10
        ? countryList.slice(0, 9).join(', ') + '...'
        : countryList.join(', ');
    }
  }
};
</script>

<style lang="scss" scoped>
.airline-group-collection-container {
  margin-top: 5em;
}
</style>
