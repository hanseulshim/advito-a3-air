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
    <el-table
      v-loading="$apollo.loading"
      :data="bookingClassList"
      :max-height="700"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <AirlineMappingTable :booking-class-id="props.row.id" />
        </template>
      </el-table-column>
      <el-table-column
        prop="code"
        label="Class"
        sortable
        :sort-orders="['ascending', 'descending']"
        :width="bookingClass.count"
      />
      <el-table-column
        prop="name"
        label="Default Fare Category"
        sortable
        :sort-orders="['ascending', 'descending']"
        :min-width="bookingClass.category"
      />
      <el-table-column
        prop="mappingCount"
        label="Mappings"
        :width="bookingClass.count"
      />
    </el-table>
  </modal>
</template>

<script>
import { GET_BOOKING_CLASS_LIST } from '@/graphql/queries';
import { formatDate } from '@/helper';
import { bookingClass } from '@/config';
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
