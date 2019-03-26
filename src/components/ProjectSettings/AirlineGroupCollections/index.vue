<template>
  <div class="table-spacer">
    <div class="section-header title-row space-between">
      {{
        pluralize('airline group collection', airlineGroupCollectionList.length)
      }}
    </div>
    <el-table ref="airlineGroupCollection" :data="airlineGroupCollectionList">
      <el-table-column type="expand" :width="tableColumnWidth.expand">
        <template slot-scope="props">
          <button
            v-if="props.row.id !== 1"
            class="button long collection-add"
            @click="showNewAirlineGroup(props.row)"
          >
            + NEW AIRLINE GROUP
          </button>
          <AirlineGroupTable
            :airline-group-list="props.row.airlineGroupList"
            :collection-id="props.row.id"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="Airline Group Collection"
        :width="tableColumnWidth.name"
        sortable
      />
      <el-table-column
        prop="airlineGroupList.length"
        label="Groups"
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
          <el-switch
            :value="scope.row.active"
            @change="toggleAirlineGroupCollection(scope.row.id)"
          />
        </template>
      </el-table-column>
      <el-table-column label="Actions" :width="tableColumnWidth.actions">
        <template slot-scope="scope">
          <i
            v-if="scope.row.id !== 1"
            class="fas fa-pencil-alt icon-spacer"
            @click="showEditAirlineGroupCollection(scope.row)"
          ></i>
          <i
            v-if="scope.row.id !== 1"
            class="fas fa-trash-alt icon-spacer"
            @click="showDeleteAirlineGroupCollection(scope.row)"
          ></i>
        </template>
      </el-table-column>
    </el-table>
    <EditAirlineGroupCollectionModal @toggle-row="toggleRow" />
    <DeleteAirlineGroupCollectionModal />
    <NewAirlineGroupModal @toggle-row="toggleRow" />
    <EditAirlineGroupModal @toggle-row="toggleRow" />
    <DeleteAirlineGroupModal @toggle-row="toggleRow" />
  </div>
</template>

<script>
import { pluralize, formatDate } from '@/helper';
import { tableColumnWidth } from '@/config';
import { GET_AIRLINE_GROUP_COLLECTION_LIST } from '@/graphql/queries';
import { TOGGLE_AIRLINE_GROUP_COLLECTION } from '@/graphql/mutations';
import AirlineGroupTable from './AirlineGroupTable';
import EditAirlineGroupCollectionModal from './EditAirlineGroupCollectionModal';
import DeleteAirlineGroupCollectionModal from './DeleteAirlineGroupCollectionModal';
import NewAirlineGroupModal from './NewAirlineGroupModal';
import EditAirlineGroupModal from './EditAirlineGroupModal';
import DeleteAirlineGroupModal from './DeleteAirlineGroupModal';
export default {
  name: 'AirlineGroupCollections',
  components: {
    AirlineGroupTable,
    EditAirlineGroupCollectionModal,
    DeleteAirlineGroupCollectionModal,
    NewAirlineGroupModal,
    EditAirlineGroupModal,
    DeleteAirlineGroupModal
  },
  apollo: {
    airlineGroupCollectionList: {
      query: GET_AIRLINE_GROUP_COLLECTION_LIST
    }
  },
  data() {
    return {
      airlineGroupCollectionList: [],
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
    showEditAirlineGroupCollection(collection) {
      this.$modal.show('edit-airline-group-collection', { collection });
    },
    showDeleteAirlineGroupCollection(collection) {
      this.$modal.show('delete-airline-group-collection', { collection });
    },
    showNewAirlineGroup(collection) {
      this.$modal.show('new-airline-group', { collection });
    },
    toggleRow(id) {
      const row = this.$refs.airlineGroupCollection.data.filter(
        collection => collection.id === id
      )[0];
      this.$refs.airlineGroupCollection.toggleRowExpansion(row);
    },
    toggleAirlineGroupCollection(id) {
      if (this.airlineGroupCollectionList.length) {
        this.$apollo.mutate({
          mutation: TOGGLE_AIRLINE_GROUP_COLLECTION,
          variables: {
            id
          }
        });
      }
    }
  }
};
</script>
