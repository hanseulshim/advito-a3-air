<template>
  <el-table
    ref="airlineGroupList"
    :data="airlineGroupList"
    class="level-two-table"
  >
    <el-table-column type="expand">
      <template slot-scope="scope">
        <el-table :data="scope.row.airlineList" class="level-three-table">
          <el-table-column prop="name" label="Airlines" />
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
        </el-table>
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="Airline Group"
      :min-width="airline.name"
    />
    <el-table-column
      prop="airlineList.length"
      label="Airlines"
      :min-width="airline.count"
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
    <el-table-column label="Actions" :width="airline.actions">
      <template slot-scope="scope">
        <i
          v-if="collectionId !== 1"
          class="fas fa-pencil-alt icon-spacer"
          @click="showEditAirlineGroup(scope.row)"
        ></i>
        <i
          v-if="collectionId !== 1"
          class="fas fa-trash-alt"
          @click="showDeleteAirlineGroup(scope.row)"
        ></i>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { formatDate } from '@/helper';
import { airline } from '@/config';
export default {
  name: 'AirlineGroupTable',
  props: {
    airlineGroupList: {
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
      return formatDate(row[param]);
    },
    showEditAirlineGroup(airlineGroup) {
      this.$modal.show('edit-airline-group', {
        airlineGroup,
        collectionId: this.collectionId
      });
    },
    showDeleteAirlineGroup(airlineGroup) {
      this.$modal.show('delete-airline-group', {
        airlineGroup,
        collectionId: this.collectionId
      });
    }
  }
};
</script>
