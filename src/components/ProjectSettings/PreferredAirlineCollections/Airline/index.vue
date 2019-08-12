<template>
  <div>
    <el-table
      ref="preferredAirlineList"
      v-loading="$apollo.loading"
      :data="preferredAirlineList"
      class="level-two-table"
    >
      <el-table-column
        prop="name"
        label="Airline Name"
        :min-width="airline.name"
      />
      <el-table-column
        prop="preferenceLevelName"
        label="Preference Level"
        :min-width="airline.preferenceLevel"
      />
      <el-table-column
        prop="effectiveStartDate"
        label="Effective Start Date"
        :formatter="row => formatDate(row, 'effectiveStartDate')"
        :width="airline.date"
      />
      <el-table-column
        prop="effectiveEndDate"
        label="Effective End Date"
        :formatter="row => formatDate(row, 'effectiveEndDate')"
        :width="airline.date"
      />
      <el-table-column label="PoS" :min-width="airline.pos">
        <template slot-scope="props">
          {{ getPosList(props.row.posList) }}
        </template>
      </el-table-column>
      <el-table-column label="Status" :min-width="airline.status">
        <template slot-scope="props">
          {{ props.row.active ? 'Active' : 'Inactive' }}
        </template>
      </el-table-column>
      <el-table-column label="Actions" :width="airline.actions">
        <template slot-scope="scope">
          <el-tooltip effect="dark" content="Edit" placement="top">
            <i
              class="fas fa-pencil-alt icon-spacer"
              @click="showEditPreferredAirline(scope.row.id)"
            />
          </el-tooltip>
          <el-tooltip effect="dark" content="Delete" placement="top">
            <i
              class="fas fa-trash-alt"
              @click="showDeletePreferredAirline(scope.row.id)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <NewPreferredAirlineModal @toggle-row="toggleRow" />
    <EditPreferredAirlineModal @toggle-row="toggleRow" />
    <DeletePreferredAirlineModal @toggle-row="toggleRow" />
  </div>
</template>

<script>
import { GET_PREFERRED_AIRLINE_LIST } from '@/graphql/queries';
import { formatDate } from '@/helper';
import { airline } from '@/config';
import NewPreferredAirlineModal from './NewPreferredAirlineModal';
import EditPreferredAirlineModal from './EditPreferredAirlineModal';
import DeletePreferredAirlineModal from './DeletePreferredAirlineModal';
export default {
  name: 'Airline',
  components: {
    NewPreferredAirlineModal,
    EditPreferredAirlineModal,
    DeletePreferredAirlineModal
  },
  apollo: {
    preferredAirlineList: {
      query: GET_PREFERRED_AIRLINE_LIST,
      variables() {
        return {
          groupId: this.groupId
        };
      }
    }
  },
  props: {
    groupId: {
      type: Number,
      required: true
    },
    collectionName: {
      type: String,
      required: true
    },
    projectId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      airline,
      preferredAirlineList: []
    };
  },
  methods: {
    formatDate(row, param) {
      return row[param] ? formatDate(row[param]) : 'Undefined';
    },
    showEditPreferredAirline(id) {
      this.$modal.show('edit-preferred-airline', {
        preferredAirlineList: this.preferredAirlineList,
        collectionName: this.collectionName,
        groupId: this.groupId,
        projectId: this.projectId,
        id
      });
    },
    showDeletePreferredAirline(id) {
      this.$modal.show('delete-preferred-airline', {
        id,
        groupId: this.groupId,
        projectId: this.projectId
      });
    },
    toggleRow(id) {
      this.$emit('toggle-row', id);
    },
    getPosList(posList) {
      return posList.map(pos => pos.code).join(', ');
    }
  }
};
</script>
