<template>
  <modal
    classes="modal-container"
    name="booking-class"
    height="auto"
    width="1000px"
  >
    <div class="title-row space-between">
      <div class="section-header">booking class mappings</div>
      <el-tooltip effect="dark" content="Close Modal" placement="top">
        <i class="fas fa-times close-modal-button" @click="hideModal"></i>
      </el-tooltip>
    </div>
    <el-table :data="bookingClassLibraryList" :max-height="700">
      <el-table-column type="expand">
        <template slot-scope="props">
          <AirlineMappingTable
            :airline-mapping-list="props.row.airlineMappingList"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="class"
        label="Class"
        sortable
        :sort-orders="['ascending', 'descending']"
        :width="bookingClass.count"
      />
      <el-table-column
        prop="defaultFareCategory"
        label="Default Fare Category"
        sortable
        :sort-orders="['ascending', 'descending']"
        :min-width="bookingClass.category"
      />
      <el-table-column
        prop="dateUpdated"
        label="Date Updated"
        sortable
        :sort-orders="['ascending', 'descending']"
        :formatter="formatDate"
        :width="bookingClass.date"
      />
      <el-table-column
        prop="airlineMappingList.length"
        label="Mappings"
        :width="bookingClass.count"
      />
    </el-table>
  </modal>
</template>

<script>
import { GET_BOOKING_CLASS_LIBRARY_LIST } from '@/graphql/queries';
import { formatDate } from '@/helper';
import { bookingClass } from '@/config';
import AirlineMappingTable from './AirlineMappingTable';
export default {
  name: 'BookingClassModal',
  components: {
    AirlineMappingTable
  },
  apollo: {
    bookingClassLibraryList: {
      query: GET_BOOKING_CLASS_LIBRARY_LIST
    }
  },
  data() {
    return {
      bookingClassLibraryList: [],
      bookingClass
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('booking-class');
    },
    formatDate(row) {
      return formatDate(row.dateUpdated);
    }
  }
};
</script>
