<template>
  <el-table :data="airlineMappingList" class="level-two-table">
    <el-table-column type="expand" width="50">
      <template slot-scope="props">
        <el-table :data="props.row.exceptionList" class="level-three-table">
          <el-table-column prop="recordOrder" label="Record Order" />
          <el-table-column prop="originCode" label="Origin Code" />
          <el-table-column prop="destinationCode" label="Destination Code" />
          <el-table-column
            prop="overrideFareCategory"
            label="Override Fare Category"
          />
        </el-table>
      </template>
    </el-table-column>
    <el-table-column prop="code" label="Code" width="75" />
    <el-table-column prop="name" label="Name" />
    <el-table-column
      prop="ticketingDate"
      label="Ticketing Date"
      :formatter="row => formatDate(row, 'ticketingDate')"
      width="150"
    />
    <el-table-column
      prop="travelDate"
      label="Travel Date"
      :formatter="row => formatDate(row, 'travelDate')"
      width="150"
    />
    <el-table-column label="Exceptions" width="150">
      <template slot-scope="scope">
        {{ scope.row.exceptionList.length }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { formatDate } from '@/helper';
export default {
  name: 'AirlineMappingTable',
  props: {
    airlineMappingList: {
      type: Array,
      required: true
    }
  },
  methods: {
    formatDate(row, param) {
      return formatDate(row[param]);
    }
  }
};
</script>
