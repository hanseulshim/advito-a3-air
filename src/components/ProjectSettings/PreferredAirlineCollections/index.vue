<template>
  <div class="table-spacer">
    <div class="section-header title-row space-between">
      <span>{{
        pluralize(
          'preferred airline collection',
          preferredAirlineCollectionList.length
        )
      }}</span>
      <button class="button" @click="showNewPreferredAirline">
        + NEW AIRLINE
      </button>
    </div>
    <el-table
      ref="preferredAirlineCollection"
      :data="preferredAirlineCollectionList"
    >
      <el-table-column type="expand" :width="tableColumnWidth.expand">
        <template slot-scope="props">
          <AirlineTable :airline-list="props.row.airlineList" />
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="Preferred Airline Collection"
        :width="tableColumnWidth.name"
        sortable
      />
      <el-table-column
        prop="airlineList.length"
        label="Airlines"
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
            class="fas fa-pencil-alt icon-spacer"
            @click="showEditPreferredAirlineCollection(scope.row)"
          ></i>
          <i
            class="fas fa-trash-alt"
            @click="showDeletePreferredAirlineCollection(scope.row)"
          ></i>
        </template>
      </el-table-column>
    </el-table>
    <EditPreferredAirlineCollectionModal @toggle-row="toggleRow" />
    <NewPreferredAirlineModal @toggle-row="toggleRow"/>
    <DeletePreferredAirlineCollectionModal />
  </div>
</template>

<script>
import { pluralize, formatDate } from '@/helper';
import { tableColumnWidth } from '@/config';
import { GET_PREFERRED_AIRLINE_COLLECTION_LIST } from '@/graphql/queries';
import AirlineTable from './AirlineTable';
import EditPreferredAirlineCollectionModal from './EditPreferredAirlineCollectionModal';
import NewPreferredAirlineModal from './NewPreferredAirlineModal';
import DeletePreferredAirlineCollectionModal from './DeletePreferredAirlineCollectionModal';
export default {
  name: 'PreferredAirlineCollections',
  components: {
    AirlineTable,
    EditPreferredAirlineCollectionModal,
    NewPreferredAirlineModal,
    DeletePreferredAirlineCollectionModal
  },
  apollo: {
    preferredAirlineCollectionList: {
      query: GET_PREFERRED_AIRLINE_COLLECTION_LIST
    }
  },
  data() {
    return {
      preferredAirlineCollectionList: [],
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
    showNewPreferredAirline() {
      this.$modal.show('new-preferred-airline');
    },
    showEditPreferredAirlineCollection(collection) {
      this.$modal.show('edit-preferred-airline-collection', { collection });
    },
    showDeletePreferredAirlineCollection(collection) {
      this.$modal.show('delete-preferred-airline-collection', { collection });
    },
    toggleRow(id) {
      const row = this.$refs.preferredAirlineCollection.data.filter(
        collection => collection.id === id
      )[0];
      this.$refs.preferredAirlineCollection.toggleRowExpansion(row);
    }
  }
};
</script>
