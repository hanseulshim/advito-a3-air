<template>
  <div class="table-spacer">
    <div class="section-header title-row space-between">
      {{
        pluralize('travel sector collection', travelSectorCollectionList.length)
      }}
    </div>
    <el-table ref="travelSectorCollection" :data="travelSectorCollectionList">
      <el-table-column type="expand" :width="tableColumnWidth.expand">
        <template slot-scope="props">
          <SectorTable :sector-list="props.row.sectorList" />
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="Travel Sector Collection"
        :width="tableColumnWidth.name"
        sortable
      />
      <el-table-column
        prop="sectorList.length"
        label="Sectors"
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
import { GET_TRAVEL_SECTOR_COLLECTION_LIST } from '@/graphql/queries';
import SectorTable from './SectorTable';
export default {
  name: 'TravelSectorCollections',
  components: {
    SectorTable
  },
  apollo: {
    travelSectorCollectionList: {
      query: GET_TRAVEL_SECTOR_COLLECTION_LIST
    }
  },
  data() {
    return {
      travelSectorCollectionList: [],
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
