<template>
  <div>
    <div class="section-header title-row space-between">
      <div>
        {{ pluralize('location collection', locationCollectionList.length) }}
      </div>
      <div>
        <img
          :style="{ cursor: 'pointer' }"
          alt="import-errors"
          src="@/assets/airportListing.png"
          @click="toggleAirportListing"
        />
        <img
          :style="{ cursor: 'pointer' }"
          alt="import-errors"
          src="@/assets/bookingClassMappings.png"
          @click="toggleBookingClass"
        />
      </div>
    </div>
    <el-table ref="locationCollection" :data="locationCollectionList">
      <el-table-column type="expand" :width="tableColumnWidth.expand">
        <template slot-scope="props">
          <button
            v-if="props.row.id !== 1"
            class="button collection-add"
            @click="showNewRegionCollection(props.row)"
          >
            + NEW REGION
          </button>
          <el-table :data="props.row.regionList" class="level-two-table">
            <el-table-column label="Region" :width="tableColumnWidth.name">
              <template slot-scope="scope">
                {{ scope.row.name }} ({{ scope.row.code }})
              </template>
            </el-table-column>
            <el-table-column
              prop="countryList.length"
              label="Countries"
              :width="tableColumnWidth.code"
            />
            <el-table-column label="Country Name">
              <template slot-scope="scope">
                {{ getCountryNames(scope.row.countryList) }}
              </template>
            </el-table-column>
            <el-table-column label="Actions" :width="tableColumnWidth.actions">
              <template slot-scope="scope">
                <i
                  v-if="props.row.id !== 1"
                  class="fas fa-pencil-alt icon-spacer"
                  @click="showEditRegionModal(props.row, scope.row)"
                />
                <i
                  v-if="props.row.id !== 1"
                  class="fas fa-trash-alt"
                  @click="showDeleteRegionModal(props.row, scope.row)"
                ></i>
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
          <el-switch
            :value="scope.row.active"
            @change="toggleLocationCollection(scope.row.id)"
          />
        </template>
      </el-table-column>
      <el-table-column label="Actions" :width="tableColumnWidth.actions">
        <template slot-scope="scope">
          <i
            class="far fa-copy icon-spacer"
            @click="showNewLocationCollection(scope.row)"
          ></i>
          <i
            v-if="scope.row.id !== 1"
            class="fas fa-pencil-alt icon-spacer"
            @click="showEditLocationCollection(scope.row)"
          ></i>
          <i
            v-if="scope.row.id !== 1"
            class="fas fa-trash-alt"
            @click="showDeleteLocationCollection(scope.row)"
          ></i>
        </template>
      </el-table-column>
    </el-table>
    <NewLocationCollectionModal @toggle-row="toggleRow" />
    <EditLocationCollectionModal @toggle-row="toggleRow" />
    <DeleteLocationCollectionModal />
    <NewRegionModal @toggle-row="toggleRow" />
    <EditRegionModal @toggle-row="toggleRow" />
    <DeleteRegionModal @toggle-row="toggleRow" />
  </div>
</template>

<script>
import { pluralize, formatDate } from '@/helper';
import { tableColumnWidth } from '@/config';
import { GET_LOCATION_COLLECTION_LIST } from '@/graphql/queries';
import { TOGGLE_LOCATION_COLLECTION } from '@/graphql/mutations';
import NewLocationCollectionModal from './NewLocationCollectionModal';
import EditLocationCollectionModal from './EditLocationCollectionModal';
import DeleteLocationCollectionModal from './DeleteLocationCollectionModal';
import NewRegionModal from './NewRegionModal';
import EditRegionModal from './EditRegionModal';
import DeleteRegionModal from './DeleteRegionModal';

export default {
  name: 'LocationCollections',
  components: {
    NewLocationCollectionModal,
    EditLocationCollectionModal,
    DeleteLocationCollectionModal,
    NewRegionModal,
    EditRegionModal,
    DeleteRegionModal
  },
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
      const countryListCopy = countryList.map(country => country.name);
      return countryListCopy.length > 10
        ? countryListCopy.slice(0, 9).join(', ') + '...'
        : countryListCopy.join(', ');
    },
    showNewLocationCollection(collection) {
      this.$modal.show('new-location-collection', { collection });
    },
    showNewRegionCollection(collection) {
      this.$modal.show('new-region', { collection });
    },
    showEditLocationCollection(collection) {
      this.$modal.show('edit-location-collection', { collection });
    },
    showDeleteLocationCollection(collection) {
      this.$modal.show('delete-location-collection', { collection });
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
          }
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
.collection-add {
  margin-bottom: 2em;
}
</style>
