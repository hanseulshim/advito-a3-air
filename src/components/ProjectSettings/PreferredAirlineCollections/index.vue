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
          <AirlineTable
            :airline-list="props.row.airlineList"
            :collection-id="props.row.id"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="Preferred Airline Collection"
        :min-width="collection.name"
        sortable
      />
      <el-table-column label="Airlines" :min-width="collection.count" sortable>
        <template slot-scope="scope">
          <span :class="{ warning: !scope.row.airlineList.length }">{{
            scope.row.airlineList.length
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
    <EditPreferredAirlineModal @toggle-row="toggleRow" />
    <NewPreferredAirlineModal @toggle-row="toggleRow" />
    <DeletePreferredAirlineCollectionModal />
    <DeletePreferredAirlineModal @toggle-row="toggleRow" />
  </div>
</template>

<script>
import { pluralize, formatDate } from '@/helper';
import { collection } from '@/config';
import { GET_PREFERRED_AIRLINE_COLLECTION_LIST } from '@/graphql/queries';
import { TOGGLE_PREFERRED_AIRLINE_COLLECTION } from '@/graphql/mutations';
import AirlineTable from './AirlineTable';
import EditPreferredAirlineCollectionModal from './EditPreferredAirlineCollectionModal';
import NewPreferredAirlineModal from './NewPreferredAirlineModal';
import DeletePreferredAirlineCollectionModal from './DeletePreferredAirlineCollectionModal';
import EditPreferredAirlineModal from './EditPreferredAirlineModal';
import DeletePreferredAirlineModal from './DeletePreferredAirlineModal';
export default {
  name: 'PreferredAirlineCollections',
  components: {
    AirlineTable,
    EditPreferredAirlineCollectionModal,
    NewPreferredAirlineModal,
    DeletePreferredAirlineCollectionModal,
    EditPreferredAirlineModal,
    DeletePreferredAirlineModal
  },
  apollo: {
    preferredAirlineCollectionList: {
      query: GET_PREFERRED_AIRLINE_COLLECTION_LIST
    }
  },
  data() {
    return {
      preferredAirlineCollectionList: [],
      collection
    };
  },
  methods: {
    pluralize(word, count) {
      return pluralize(word, count);
    },
    formatDate(row) {
      return formatDate(row.dateUpdated);
    },
    showNewPreferredAirline(collection) {
      this.$modal.show('new-preferred-airline', { collection });
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
    },
    togglePreferredAirlineCollection(id) {
      if (this.preferredAirlineCollectionList.length) {
        this.$apollo.mutate({
          mutation: TOGGLE_PREFERRED_AIRLINE_COLLECTION,
          variables: {
            id
          }
        });
      }
    },
    checkAirlineWarning() {
      const invalidStatus = this.preferredAirlineCollectionList.every(
        collection => !collection.airlineList.length
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
