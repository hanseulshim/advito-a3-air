<template>
  <el-table
    v-loading="$apollo.loading"
    :data="airlineMappingList"
    class="level-two-table"
  >
    <el-table-column type="expand">
      <template slot-scope="props">
        <ExceptionTable :exception-id="props.row.id" />
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
      prop="exceptionCount"
      label="Exceptions"
      :width="bookingClass.exceptions"
    />
  </el-table>
</template>

<script>
import { GET_AIRLINE_MAPPING_LIST } from '@/graphql/queries';
import { formatDate } from '@/helper';
import { bookingClass } from '@/config';
import ExceptionTable from './ExceptionTable';
export default {
  name: 'AirlineMappingTable',
  components: {
    ExceptionTable
  },
  props: {
    bookingClassId: {
      type: Number,
      required: true
    }
  },
  apollo: {
    airlineMappingList: {
      query: GET_AIRLINE_MAPPING_LIST,
      variables() {
        return {
          bookingClassId: this.bookingClassId
        };
      }
    }
  },
  data() {
    return {
      airlineMappingList: [],
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
