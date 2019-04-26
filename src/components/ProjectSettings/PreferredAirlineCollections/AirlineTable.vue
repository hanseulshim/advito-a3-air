<template>
  <el-table ref="airlineList" :data="airlineList" class="level-two-table">
    <el-table-column
      prop="name"
      label="Airline Name"
      :min-width="airline.name"
    />
    <el-table-column
      prop="preferenceLevel"
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
        {{ props.row.pos.join(', ') }}
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
            @click="showEditPreferredAirline(airlineList, scope.row.id)"
          />
        </el-tooltip>
        <el-tooltip effect="dark" content="Delete" placement="top">
          <i
            class="fas fa-trash-alt"
            @click="showDeletePreferredAirline(scope.row)"
          />
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { formatDate } from '@/helper';
import { airline } from '@/config';
export default {
  name: 'AirlineTable',
  props: {
    airlineList: {
      type: Array,
      required: true
    },
    collectionId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      airline
    };
  },
  methods: {
    formatDate(row, param) {
      return row[param] ? formatDate(row[param]) : 'Undefined';
    },
    showEditPreferredAirline(airlineList, id) {
      this.$modal.show('edit-preferred-airline', {
        airlineList,
        collectionId: this.collectionId,
        id
      });
    },
    showDeletePreferredAirline(airline) {
      this.$modal.show('delete-preferred-airline', {
        airline,
        collectionId: this.collectionId
      });
    }
  }
};
</script>
