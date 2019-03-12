<template>
  <div>
    <div class="section-header title-row space-between">
      {{ pluralize('location collection', locationCollectionList.length) }}
    </div>
    <el-table ref="locationCollection" :data="locationCollectionList">
      <el-table-column type="expand" :width="tableColumnWidth.expand">
        <template slot-scope="props">
          <el-table :data="props.row.regionList" class="level-two-table">
            <el-table-column
              prop="name"
              label="Region"
              :width="tableColumnWidth.name"
            />
            <el-table-column
              prop="countryList.length"
              label="Countries"
              :width="tableColumnWidth.count"
            />
            <el-table-column label="Country Name">
              <template slot-scope="scope">
                {{ getCountryNames(scope.row.countryList) }}
              </template>
            </el-table-column>
            <el-table-column label="Actions" :width="tableColumnWidth.actions">
              <template>
                <i class="fas fa-pencil-alt icon-spacer"></i>
                <i class="fas fa-trash-alt"></i>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="Location Collection"
        :width="tableColumnWidth.name"
        sortable
      />
      <el-table-column
        prop="regionList.length"
        label="Regions"
        :width="tableColumnWidth.count"
        sortable
      />
      <el-table-column prop="description" label="Description" />
      <el-table-column
        prop="dateUpdated"
        label="Date Updated"
        sortable
        :formatter="formatDate"
        :width="tableColumnWidth.date"
      />
      <el-table-column label="Status" :width="tableColumnWidth.icon">
        <template slot-scope="scope">
          <el-switch :value="scope.row.active" />
        </template>
      </el-table-column>
      <el-table-column label="Actions" :width="tableColumnWidth.actions">
        <template slot-scope="scope">
          <i class="far fa-copy icon-spacer"></i>
          <i
            v-if="scope.row.id !== 1"
            class="fas fa-pencil-alt icon-spacer"
          ></i>
          <i v-if="scope.row.id !== 1" class="fas fa-trash-alt"></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { pluralize, formatDate } from '@/helper';
import { tableColumnWidth } from '@/config';
import { GET_LOCATION_COLLECTION_LIST } from '@/graphql/queries';
export default {
  name: 'LocationCollections',
  apollo: {
    locationCollectionList: {
      query: GET_LOCATION_COLLECTION_LIST
    }
  },
  data() {
    return {
      locationCollectionList: [],
      tableColumnWidth
    };
  },
  methods: {
    pluralize(word, count) {
      return pluralize(word, count);
    },
    formatDate(row) {
      return formatDate(row.dateUpdated);
    },
    getCountryNames(countryList) {
      return countryList.length > 10
        ? countryList.slice(0, 9).join(', ') + '...'
        : countryList.join(', ');
    }
  }
};
</script>
