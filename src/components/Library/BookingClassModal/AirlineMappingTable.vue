<template>
  <el-table :data="airlineMappingList" class="level-two-table">
    <el-table-column type="expand">
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
    <el-table-column prop="code" label="Code" :width="bookingClass.count" />
    <el-table-column prop="name" label="Name" :min-width="bookingClass.name" />
    <el-table-column
      prop="ticketingDate"
      label="Ticketing Date"
      :formatter="row => formatDate(row, 'ticketingDate')"
      :width="bookingClass.date"
    />
    <el-table-column
      prop="travelDate"
      label="Travel Date"
      :formatter="row => formatDate(row, 'travelDate')"
      :width="bookingClass.date"
    />
    <el-table-column
      prop="exceptionList.length"
      label="Exceptions"
      :width="bookingClass.exceptions"
    />
  </el-table>
</template>

<script>
import { formatDate } from '@/helper';
import { bookingClass } from '@/config';
export default {
  name: 'AirlineMappingTable',
  props: {
    airlineMappingList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      bookingClass
    };
  },
  methods: {
    formatDate(row, param) {
      return formatDate(row[param]);
    }
  }
};
</script>
