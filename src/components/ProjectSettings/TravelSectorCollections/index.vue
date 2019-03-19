<template>
  <div class="table-spacer">
    <div class="section-header title-row space-between">
      <span>{{
        pluralize('travel sector collection', travelSectorCollectionList.length)
      }}</span>
      <button v-if="travelSectorCollectionList.length > 1" class="button">
        + NEW TRAVEL SECTOR
      </button>
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
          <i
            class="far fa-copy icon-spacer"
            @click="showNewTravelSector(scope.row)"
          ></i>
          <i
            v-if="scope.row.id !== 1"
            class="fas fa-pencil-alt icon-spacer"
            @click="showEditTravelSector(scope.row)"
          ></i>
          <i
            v-if="scope.row.id !== 1"
            class="fas fa-trash-alt"
            @click="showDeleteTravelSector(scope.row)"
          ></i>
        </template>
      </el-table-column>
    </el-table>
    <NewTravelSectorCollectionModal @toggle-row="toggleRow" />
    <EditTravelSectorCollectionModal @toggle-row="toggleRow" />
    <DeleteTravelSectorCollectionModal @toggle-row="toggleRow" />
  </div>
</template>

<script>
import { pluralize, formatDate } from '@/helper';
import { tableColumnWidth } from '@/config';
import { GET_TRAVEL_SECTOR_COLLECTION_LIST } from '@/graphql/queries';
import SectorTable from './SectorTable';
import NewTravelSectorCollectionModal from './NewTravelSectorCollectionModal';
import EditTravelSectorCollectionModal from './EditTravelSectorCollectionModal';
import DeleteTravelSectorCollectionModal from './DeleteTravelSectorCollectionModal';
export default {
  name: 'TravelSectorCollections',
  components: {
    SectorTable,
    NewTravelSectorCollectionModal,
    EditTravelSectorCollectionModal,
    DeleteTravelSectorCollectionModal
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
    },
    showNewTravelSector(collection) {
      this.$modal.show('new-travel-sector-collection', { collection });
    },
    showEditTravelSector(collection) {
      this.$modal.show('edit-travel-sector-collection', { collection });
    },
    showDeleteTravelSector(collection) {
      this.$modal.show('delete-travel-sector-collection', { collection });
    },
    toggleRow(id) {
      const row = this.$refs.travelSectorCollection.data.filter(
        collection => collection.id === id
      )[0];
      this.$refs.travelSectorCollection.toggleRowExpansion(row);
    }
  }
};
</script>
