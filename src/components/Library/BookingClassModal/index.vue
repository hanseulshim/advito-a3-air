<template>
  <modal
    classes="modal-container"
    name="booking-class"
    height="auto"
    width="1200px"
  >
    <div class="title-row space-between">
      <div class="section-header">booking class mappings</div>
      <i class="fas fa-times close-modal-button" @click="hideModal"></i>
    </div>
    <el-table :data="bookingClassList" :max-height="750">
      <el-table-column type="expand" :width="tableColumnWidth.expand">
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
        :width="tableColumnWidth.icon"
      />
      <el-table-column
        prop="defaultFareCategory"
        label="Default Fare Category"
        sortable
      />
      <el-table-column
        prop="dateUpdated"
        label="Date Updated"
        sortable
        :formatter="formatDate"
        :width="tableColumnWidth.date"
      />
      <el-table-column
        prop="airlineMappingList.length"
        label="Mappings"
        :width="tableColumnWidth.count"
      />
    </el-table>
  </modal>
</template>

<script>
import { GET_BOOKING_CLASS_LIST } from '@/graphql/queries';
import { formatDate } from '@/helper';
import { tableColumnWidth } from '@/config';
import AirlineMappingTable from './AirlineMappingTable';
export default {
  name: 'BookingClassModal',
  components: {
    AirlineMappingTable
  },
  apollo: {
    bookingClassList: {
      query: GET_BOOKING_CLASS_LIST
    }
  },
  data() {
    return {
      bookingClassList: [],
      tableColumnWidth
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
