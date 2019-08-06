<template>
  <div class="table-spacer">
    <div class="section-header title-row space-between">
      {{
        pluralize('travel sector collection', travelSectorCollectionList.length)
      }}
    </div>
    <el-table
      ref="travelSectorCollection"
      v-loading="$apollo.loading"
      :data="travelSectorCollectionList"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <button
            v-if="!props.row.standard"
            class="button long collection-add"
            @click="showNewTravelSector(props.row)"
          >
            + NEW TRAVEL SECTOR
          </button>
          <TravelSector
            :group-id="props.row.id"
            :collection-name="props.row.name"
            :project="project"
            :client="client"
            @toggle-row="toggleRow"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="Travel Sector Collection"
        :min-width="collection.name"
        sortable
        :sort-orders="['ascending', 'descending']"
      />
      <el-table-column
        prop="sectorCount"
        label="Sectors"
        :min-width="collection.count"
        sortable
        :sort-orders="['ascending', 'descending']"
      />
      <el-table-column
        prop="description"
        label="Description"
        :min-width="collection.description"
      />
      <el-table-column
        prop="dateUpdated"
        label="Date Updated"
        sortable
        :sort-orders="['ascending', 'descending']"
        :formatter="formatDate"
        :min-width="collection.dateUpdated"
      />
      <el-table-column label="Status" :min-width="collection.status">
        <template slot-scope="scope">
          <el-switch
            :value="scope.row.active"
            @change="toggleTravelSectorCollection(scope.row.id)"
          />
        </template>
      </el-table-column>
      <el-table-column label="Actions" :min-width="collection.actions">
        <template slot-scope="scope">
          <el-tooltip effect="dark" content="Copy" placement="top">
            <i
              class="far fa-copy icon-spacer"
              @click="showNewTravelSectorCollection(scope.row)"
            />
          </el-tooltip>
          <el-tooltip effect="dark" content="Edit" placement="top">
            <i
              v-if="!scope.row.standard"
              class="fas fa-pencil-alt icon-spacer"
              @click="showEditTravelSectorCollection(scope.row)"
            />
          </el-tooltip>
          <el-tooltip effect="dark" content="Delete" placement="top">
            <i
              v-if="!scope.row.standard"
              class="fas fa-trash-alt"
              @click="showDeleteTravelSectorCollection(scope.row.id)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <CopyTravelSectorCollectionModal @toggle-row="toggleRow" />
    <EditTravelSectorCollectionModal @toggle-row="toggleRow" />
    <DeleteTravelSectorCollectionModal />
  </div>
</template>

<script>
import { pluralize, formatDate } from '@/helper';
import { collection } from '@/config';
import {
  GET_CLIENT,
  GET_PROJECT,
  GET_TRAVEL_SECTOR_COLLECTION_LIST
} from '@/graphql/queries';
import { TOGGLE_TRAVEL_SECTOR_COLLECTION } from '@/graphql/mutations';
import TravelSector from './TravelSector';
import CopyTravelSectorCollectionModal from './CopyTravelSectorCollectionModal';
import EditTravelSectorCollectionModal from './EditTravelSectorCollectionModal';
import DeleteTravelSectorCollectionModal from './DeleteTravelSectorCollectionModal';
export default {
  name: 'TravelSectorCollections',
  components: {
    TravelSector,
    CopyTravelSectorCollectionModal,
    EditTravelSectorCollectionModal,
    DeleteTravelSectorCollectionModal
  },
  apollo: {
    client: {
      query: GET_CLIENT
    },
    project: {
      query: GET_PROJECT
    },
    travelSectorCollectionList: {
      query: GET_TRAVEL_SECTOR_COLLECTION_LIST,
      fetchPolicy: 'network-only',
      variables() {
        return {
          clientId: this.client.id,
          projectId: this.project.id
        };
      }
    }
  },
  data() {
    return {
      travelSectorCollectionList: [],
      project: {},
      client: {},
      toggleRowId: null,
      collection
    };
  },
  updated() {
    if (this.toggleRowId) {
      const row = this.$refs.travelSectorCollection.data.find(
        c => c.id === this.toggleRowId
      );
      this.$refs.travelSectorCollection.toggleRowExpansion(row, true);
      this.toggleRowId = null;
    }
  },
  methods: {
    pluralize(word, count) {
      return pluralize(word, count);
    },
    formatDate(row) {
      return formatDate(row.dateUpdated);
    },
    showNewTravelSectorCollection(collection) {
      this.$modal.show('new-travel-sector-collection', {
        collection,
        client: this.client,
        project: this.project
      });
    },
    showEditTravelSectorCollection(collection) {
      this.$modal.show('edit-travel-sector-collection', {
        collection,
        client: this.client,
        project: this.project
      });
    },
    showDeleteTravelSectorCollection(id) {
      this.$modal.show('delete-travel-sector-collection', {
        id,
        projectId: this.project.id,
        clientId: this.client.id
      });
    },
    showNewTravelSector(collection) {
      this.$modal.show('new-travel-sector', {
        collection,
        client: this.client,
        project: this.project
      });
    },
    toggleRow(id) {
      this.toggleRowId = id;
    },
    toggleTravelSectorCollection(id) {
      if (this.travelSectorCollectionList.length) {
        this.$apollo.mutate({
          mutation: TOGGLE_TRAVEL_SECTOR_COLLECTION,
          variables: {
            id,
            projectId: this.project.id
          },
          refetchQueries: () => [
            {
              query: GET_TRAVEL_SECTOR_COLLECTION_LIST,
              variables: {
                clientId: this.client.id,
                projectId: this.project.id
              }
            }
          ]
        });
      }
    }
  }
};
</script>
