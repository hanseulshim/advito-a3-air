<template>
  <div>
    <div class="collection-title-row">
      <div class="section-header">
        {{ locationCollectionList.length }} location collections
      </div>
      <div class="collection-button-container">
        <button class="button">+ NEW COLLECTION</button>
        <i class="fas fa-info" @click="showInfoModal" />
      </div>
    </div>
    <el-table
      :data="locationCollectionList"
      style="width: 100%"
      header-cell-class-name="table-header-cell"
      max-height="750"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table
            :data="props.row.regionList"
            style="width: 100%"
            max-height="750"
          >
            <el-table-column prop="name" label="Region" />
            <el-table-column prop="countryList" label="Countries" />
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Location Collection" sortable />
      <el-table-column label="Regions" sortable>
        <template slot-scope="scope">
          <div>{{ scope.row.regionList.length }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="Description" />
      <el-table-column
        prop="dateUpdated"
        label="Date Updated"
        sortable
        :formatter="formatDate"
      />
      <el-table-column label="Status">
        <template slot-scope="scope">
          <el-switch :value="scope.row.active" active-color="#ff9e16">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="Edit">
        <template slot-scope="scope">
          <i class="fas fa-pencil-alt" @click="editProject(scope.row)"></i>
          <i class="fas fa-trash-alt" @click="deleteProject(scope.row.id)"></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { GET_LOCATION_COLLECTION_LIST } from '@/graphql/queries';
import { formatDate } from '@/helper';
export default {
  name: 'LocationCollections',
  apollo: {
    locationCollectionList: {
      query: GET_LOCATION_COLLECTION_LIST
    }
  },
  data() {
    return {
      locationCollectionList: []
    };
  },
  methods: {
    formatDate(row) {
      return formatDate(row.dateUpdated);
    },
    showInfoModal() {
      this.$modal.show('info');
    }
  }
};
</script>

<style lang="scss">
.collection-title-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  .collection-button-container {
    display: flex;
    .fa-info {
      margin-left: 10px;
    }
  }
}
</style>
