<template>
  <div class="table-spacer">
    <div class="section-header title-row space-between">
      {{
        pluralize('airline group collection', airlineGroupCollectionList.length)
      }}
    </div>
    <el-table
      ref="airlineGroupCollection"
      v-loading="$apollo.loading"
      :data="airlineGroupCollectionList"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <button
            v-if="!props.row.standard"
            class="button long collection-add"
            @click="showNewAirlineGroup(props.row)"
          >
            + NEW AIRLINE GROUP
          </button>
          <AirlineGroup
            :collection-id="props.row.id"
            :collection-name="props.row.name"
            :project-id="project.id"
            @toggle-row="toggleRow"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="Airline Group Collection"
        :min-width="collection.name"
        sortable
        :sort-orders="['ascending', 'descending']"
      />
      <el-table-column
        prop="airlineGroupCount"
        label="Groups"
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
            @change="toggleAirlineGroupCollection(scope.row.id)"
          />
        </template>
      </el-table-column>
      <el-table-column label="Actions" :min-width="collection.actions">
        <template slot-scope="scope">
          <el-tooltip effect="dark" content="Edit" placement="top">
            <i
              v-if="!scope.row.standard"
              class="fas fa-pencil-alt icon-spacer"
              @click="showEditAirlineGroupCollection(scope.row)"
            />
          </el-tooltip>
          <el-tooltip effect="dark" content="Delete" placement="top">
            <i
              v-if="!scope.row.standard"
              class="fas fa-trash-alt icon-spacer"
              @click="showDeleteAirlineGroupCollection(scope.row.id)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <EditAirlineGroupCollectionModal @toggle-row="toggleRow" />
    <DeleteAirlineGroupCollectionModal />
  </div>
</template>

<script>
import { pluralize, formatDate } from '@/helper';
import { collection } from '@/config';
import {
  GET_AIRLINE_GROUP_COLLECTION_LIST,
  GET_PROJECT,
  GET_CLIENT
} from '@/graphql/queries';
import { TOGGLE_AIRLINE_GROUP_COLLECTION } from '@/graphql/mutations';
import AirlineGroup from './AirlineGroup';
import EditAirlineGroupCollectionModal from './EditAirlineGroupCollectionModal';
import DeleteAirlineGroupCollectionModal from './DeleteAirlineGroupCollectionModal';
export default {
  name: 'AirlineGroupCollections',
  components: {
    AirlineGroup,
    EditAirlineGroupCollectionModal,
    DeleteAirlineGroupCollectionModal
  },
  apollo: {
    client: {
      query: GET_CLIENT
    },
    project: {
      query: GET_PROJECT
    },
    airlineGroupCollectionList: {
      query: GET_AIRLINE_GROUP_COLLECTION_LIST,
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
      airlineGroupCollectionList: [],
      toggleRowId: null,
      collection
    };
  },
  updated() {
    if (this.toggleRowId) {
      const row = this.$refs.airlineGroupCollection.data.find(
        c => c.id === this.toggleRowId
      );
      this.$refs.airlineGroupCollection.toggleRowExpansion(row, true);
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
    showEditAirlineGroupCollection(collection) {
      this.$modal.show('edit-airline-group-collection', {
        collection,
        project: this.project,
        client: this.client
      });
    },
    showDeleteAirlineGroupCollection(id) {
      this.$modal.show('delete-airline-group-collection', {
        id,
        clientId: this.client.id,
        projectId: this.project.id
      });
    },
    showNewAirlineGroup(collection) {
      this.$modal.show('new-airline-group', {
        collection,
        project: this.project,
        client: this.client
      });
    },
    toggleRow(id) {
      this.toggleRowId = id;
    },
    toggleAirlineGroupCollection(id) {
      if (this.airlineGroupCollectionList.length) {
        this.$apollo.mutate({
          mutation: TOGGLE_AIRLINE_GROUP_COLLECTION,
          variables: {
            id,
            projectId: this.project.id
          },
          refetchQueries: () => [
            {
              query: GET_AIRLINE_GROUP_COLLECTION_LIST,
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
