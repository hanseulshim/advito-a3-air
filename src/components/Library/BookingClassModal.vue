<template>
  <modal
    classes="modal-container booking-class-modal"
    name="booking-class"
    height="auto"
  >
    <div class="title-row space-between">
      <div class="section-header">booking class mappings</div>
      <i class="fas fa-times close-modal-button" @click="hideModal"></i>
    </div>
    <el-table :data="bookingClassList" :max-height="750">
      <el-table-column type="expand" width="50">
        <template slot-scope="props">
          <AirlineMappingTable
            :airline-mapping-list="props.row.airlineMappingList"
          />
        </template>
      </el-table-column>
      <el-table-column prop="class" label="Class" sortable width="150" />
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
        width="150"
      />
      <el-table-column label="Mappings" width="150">
        <template slot-scope="scope">
          <div>{{ scope.row.airlineMappingList.length }}</div>
        </template>
      </el-table-column>
    </el-table>
  </modal>
</template>

<script>
import { GET_BOOKING_CLASS_LIST } from '@/graphql/queries';
import { formatDate } from '@/helper';
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
      bookingClassList: []
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('airport-listing');
    },
    formatDate(row) {
      return formatDate(row.dateUpdated);
    }
  }
};
</script>

<style lang="scss">
.booking-class-modal {
  width: 1200px !important;
}
</style>
