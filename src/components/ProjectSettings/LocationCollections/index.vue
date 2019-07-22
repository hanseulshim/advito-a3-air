<template>
  <div>
    <div class="section-header title-row space-between">
      <div>
        {{ pluralize('location collection', locationCollectionList.length) }}
      </div>
      <div class="library-icon-container">
        <el-tooltip effect="dark" content="Airport Listing" placement="top">
          <div class="library-icon">
            <img
              alt="import-errors"
              src="@/assets/airportListing.png"
              @click="toggleAirportListing"
            />
          </div>
        </el-tooltip>
        <el-tooltip
          effect="dark"
          content="Booking Class Mapping"
          placement="top"
        >
          <div class="library-icon">
            <img
              alt="import-errors"
              src="@/assets/bookingClassMappings.png"
              @click="toggleBookingClass"
            />
          </div>
        </el-tooltip>
      </div>
    </div>
    <el-table
      ref="locationCollection"
      v-loading="$apollo.loading"
      :data="locationCollectionList"
    >
      <!-- <el-table-column type="expand">
        <template slot-scope="props">
          <button
            v-if="props.row.id !== 1"
            class="button collection-add"
            @click="showNewRegionCollection(props.row)"
          >
            + NEW REGION
          </button>
          <el-table :data="props.row.regionList" class="level-two-table">
            <el-table-column label="Region" :min-width="region.name">
              <template slot-scope="scope">
                {{ scope.row.name }} ({{ scope.row.code }})
              </template>
            </el-table-column>
            <el-table-column
              prop="countryList.length"
              label="Countries"
              :min-width="region.countries"
            />
            <el-table-column
              label="Country Name"
              :min-width="region.countryName"
            >
              <template slot-scope="scope">
                {{ getCountryNames(scope.row.countryList) }}
              </template>
            </el-table-column>
            <el-table-column label="Actions" :min-width="region.actions">
              <template slot-scope="scope">
                <el-tooltip effect="dark" content="Edit" placement="top">
                  <i
                    v-if="props.row.id !== 1"
                    class="fas fa-pencil-alt icon-spacer"
                    @click="showEditRegionModal(props.row, scope.row)"
                  />
                </el-tooltip>
                <el-tooltip effect="dark" content="Delete" placement="top">
                  <i
                    v-if="props.row.id !== 1"
                    class="fas fa-trash-alt"
                    @click="showDeleteRegionModal(props.row, scope.row)"
                  />
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>-->
      <el-table-column
        prop="name"
        label="Location Collection"
        :min-width="collection.name"
        sortable
        :sort-orders="['ascending', 'descending']"
      />
      <el-table-column
        prop="regionCount"
        label="Regions"
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
            @change="toggleLocationCollection(scope.row.id)"
          />
        </template>
      </el-table-column>
      <el-table-column label="Actions" :min-width="collection.actions">
        <template slot-scope="scope">
          <el-tooltip effect="dark" content="Copy" placement="top">
            <i
              class="far fa-copy icon-spacer"
              @click="showCopyLocationCollection(scope.row)"
            />
          </el-tooltip>
          <el-tooltip effect="dark" content="Edit" placement="top">
            <i
              v-if="scope.row.id !== 1"
              class="fas fa-pencil-alt icon-spacer"
              @click="showEditLocationCollection(scope.row)"
            />
          </el-tooltip>
          <el-tooltip effect="dark" content="Delete" placement="top">
            <i
              v-if="scope.row.id !== 1"
              class="fas fa-trash-alt"
              @click="showDeleteLocationCollection(scope.row)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <CopyLocationCollectionModal />
    <EditLocationCollectionModal @toggle-row="toggleRow" />
    <DeleteLocationCollectionModal />
    <NewRegionModal @toggle-row="toggleRow" />
    <EditRegionModal @toggle-row="toggleRow" />
    <DeleteRegionModal @toggle-row="toggleRow" />
  </div>
</template>

<script>
import { pluralize, formatDate } from '@/helper';
import { collection, region } from '@/config';
import {
  GET_LOCATION_COLLECTION_LIST,
  GET_PROJECT,
  GET_CLIENT
} from '@/graphql/queries';
import { TOGGLE_LOCATION_COLLECTION } from '@/graphql/mutations';
import CopyLocationCollectionModal from './CopyLocationCollectionModal';
import EditLocationCollectionModal from './EditLocationCollectionModal';
import DeleteLocationCollectionModal from './DeleteLocationCollectionModal';
import NewRegionModal from './NewRegionModal';
import EditRegionModal from './EditRegionModal';
import DeleteRegionModal from './DeleteRegionModal';

export default {
  name: 'LocationCollections',
  components: {
    CopyLocationCollectionModal,
    EditLocationCollectionModal,
    DeleteLocationCollectionModal,
    NewRegionModal,
    EditRegionModal,
    DeleteRegionModal
  },
  apollo: {
    client: {
      query: GET_CLIENT
    },
    project: {
      query: GET_PROJECT
    },
    locationCollectionList: {
      query: GET_LOCATION_COLLECTION_LIST,
      variables() {
        return {
          projectId: this.project.id
        };
      }
    }
  },
  data() {
    return {
      locationCollectionList: [],
      project: {},
      client: {},
      collection,
      region
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
      const countryListCopy = countryList.map(country => country.name);
      return countryListCopy.length > 10
        ? countryListCopy.slice(0, 9).join(', ') + '...'
        : countryListCopy.join(', ');
    },
    showCopyLocationCollection(collection) {
      this.$modal.show('copy-location-collection', {
        collection,
        client: this.client,
        project: this.project
      });
    },
    showNewRegionCollection(collection) {
      this.$modal.show('new-region', { collection });
    },
    showEditLocationCollection(collection) {
      this.$modal.show('edit-location-collection', {
        collection,
        client: this.client,
        project: this.project
      });
    },
    showDeleteLocationCollection({ id }) {
      this.$modal.show('delete-location-collection', {
        id,
        projectId: this.project.id
      });
    },
    showEditRegionModal(collection, region) {
      this.$modal.show('edit-region', { collection, region });
    },
    showDeleteRegionModal(collection, region) {
      this.$modal.show('delete-region', { collection, region });
    },
    toggleRow(id) {
      const row = this.$refs.locationCollection.data.filter(
        collection => collection.id === id
      )[0];
      this.$refs.locationCollection.toggleRowExpansion(row);
    },
    toggleLocationCollection(id) {
      if (this.locationCollectionList.length) {
        this.$apollo.mutate({
          mutation: TOGGLE_LOCATION_COLLECTION,
          variables: {
            id
          },
          refetchQueries: () => [
            {
              query: GET_LOCATION_COLLECTION_LIST,
              variables: { projectId: this.project.id }
            }
          ]
        });
      }
    },
    toggleAirportListing() {
      this.$modal.show('airport-listing');
    },
    toggleBookingClass() {
      this.$modal.show('booking-class');
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/global.scss';
.collection-add {
  margin-bottom: 2em;
}
.library-icon-container {
  display: flex;
  .library-icon {
    border: 1px solid $tree-poppy;
    border-radius: 100%;
    padding: 10px;
    margin-right: 10px;
    width: 35px;
    height: 35px;
    cursor: pointer;
    img {
      width: 100%;
    }
  }
}
</style>
