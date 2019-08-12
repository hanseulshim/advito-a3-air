<template>
  <div class="table-spacer">
    <div class="section-header title-row space-between">
      <div>
        <el-tooltip v-if="checkAirlineWarning()" placement="top" effect="light">
          <div slot="content">
            You have to have at<br />least one Preferred<br />Airline or this
            Collection<br />
            will be deleted in 48<br />hours.
          </div>
          <i class="fas fa-exclamation-circle" />
        </el-tooltip>
        <span>{{
          pluralize(
            'preferred airline collection',
            preferredAirlineCollectionList.length
          )
        }}</span>
      </div>
    </div>
    <el-table
      ref="preferredAirlineCollection"
      v-loading="$apollo.loading"
      :data="preferredAirlineCollectionList"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <button
            class="button collection-add"
            @click="showNewPreferredAirline(props.row)"
          >
            + NEW AIRLINE
          </button>
          <Airline
            :group-id="props.row.id"
            :collection-name="props.row.name"
            :project-id="project.id"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="Preferred Airline Collection"
        :min-width="collection.name"
        sortable
        :sort-orders="['ascending', 'descending']"
      />
      <el-table-column
        label="Airlines"
        :min-width="collection.count"
        sortable
        :sort-orders="['ascending', 'descending']"
      >
        <template slot-scope="scope">
          <span :class="{ warning: !scope.row.airlineCount }">{{
            scope.row.airlineCount
          }}</span>
        </template>
      </el-table-column>
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
            @change="togglePreferredAirlineCollection(scope.row.id)"
          />
        </template>
      </el-table-column>
      <el-table-column label="Actions" :min-width="collection.actions">
        <template slot-scope="scope">
          <el-tooltip effect="dark" content="Edit" placement="top">
            <i
              class="fas fa-pencil-alt icon-spacer"
              @click="showEditPreferredAirlineCollection(scope.row)"
            />
          </el-tooltip>
          <el-tooltip effect="dark" content="Delete" placement="top">
            <i
              class="fas fa-trash-alt"
              @click="showDeletePreferredAirlineCollection(scope.row.id)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <EditPreferredAirlineCollectionModal @toggle-row="toggleRow" />
    <DeletePreferredAirlineCollectionModal />
  </div>
</template>

<script>
import { pluralize, formatDate } from '@/helper';
import { collection } from '@/config';
import {
  GET_PREFERRED_AIRLINE_COLLECTION_LIST,
  GET_PROJECT,
  GET_CLIENT
} from '@/graphql/queries';
import { TOGGLE_PREFERRED_AIRLINE_COLLECTION } from '@/graphql/mutations';
import Airline from './Airline';
import EditPreferredAirlineCollectionModal from './EditPreferredAirlineCollectionModal';
import DeletePreferredAirlineCollectionModal from './DeletePreferredAirlineCollectionModal';
export default {
  name: 'PreferredAirlineCollections',
  components: {
    Airline,
    EditPreferredAirlineCollectionModal,
    DeletePreferredAirlineCollectionModal
  },
  apollo: {
    client: {
      query: GET_CLIENT
    },
    project: {
      query: GET_PROJECT
    },
    preferredAirlineCollectionList: {
      query: GET_PREFERRED_AIRLINE_COLLECTION_LIST,
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
      preferredAirlineCollectionList: [],
      toggleRowId: null,
      collection
    };
  },
  updated() {
    if (this.toggleRowId) {
      const row = this.$refs.preferredAirlineCollection.data.find(
        c => c.id === this.toggleRowId
      );
      this.$refs.preferredAirlineCollection.toggleRowExpansion(row, true);
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
    showNewPreferredAirline(collection) {
      this.$modal.show('new-preferred-airline', {
        collection,
        project: this.project,
        client: this.client
      });
    },
    showEditPreferredAirlineCollection(collection) {
      this.$modal.show('edit-preferred-airline-collection', {
        collection,
        project: this.project,
        client: this.client
      });
    },
    showDeletePreferredAirlineCollection(id) {
      this.$modal.show('delete-preferred-airline-collection', {
        id,
        clientId: this.client.id,
        projectId: this.project.id
      });
    },
    toggleRow(id) {
      this.toggleRowId = id;
    },
    togglePreferredAirlineCollection(id) {
      if (this.preferredAirlineCollectionList.length) {
        this.$apollo.mutate({
          mutation: TOGGLE_PREFERRED_AIRLINE_COLLECTION,
          variables: {
            id,
            projectId: this.project.id
          },
          refetchQueries: () => [
            {
              query: GET_PREFERRED_AIRLINE_COLLECTION_LIST,
              variables: {
                clientId: this.client.id,
                projectId: this.project.id
              }
            }
          ]
        });
      }
    },
    checkAirlineWarning() {
      const invalidStatus = this.preferredAirlineCollectionList.some(
        collection => !collection.airlineCount
      );
      this.$emit('check-status', invalidStatus ? 'invalid' : 'valid');
      return invalidStatus;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';
.warning {
  color: $monza;
}
</style>
