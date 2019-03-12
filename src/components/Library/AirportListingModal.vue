<template>
  <modal
    classes="modal-container airport-listing-modal"
    name="airport-listing"
    height="auto"
  >
    <div class="title-row space-between">
      <div class="section-header">airport listing</div>
      <i class="fas fa-times close-modal-button" @click="hideModal"></i>
    </div>
    <el-table :data="airportList" :max-height="750">
      <el-table-column
        prop="country"
        label="Country"
        sortable
        :width="tableColumnWidth.shortName"
      />
      <el-table-column
        prop="cityCode"
        label="City Code"
        sortable
        :width="tableColumnWidth.code"
      />
      <el-table-column
        prop="cityName"
        label="City Name"
        sortable
        :width="tableColumnWidth.shortName"
      />
      <el-table-column
        prop="airportCode"
        label="Airport Code"
        sortable
        :width="tableColumnWidth.code"
      />
      <el-table-column prop="airportName" label="Airport Name" sortable />
    </el-table>
  </modal>
</template>

<script>
import { tableColumnWidth } from '@/config';
import { GET_AIRPORT_LIST } from '@/graphql/queries';
export default {
  name: 'AirportListingModal',
  apollo: {
    airportList: {
      query: GET_AIRPORT_LIST
    }
  },
  data() {
    return {
      airportList: [],
      tableColumnWidth
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('airport-listing');
    }
  }
};
</script>

<style lang="scss">
.airport-listing-modal {
  width: 1000px !important;
}
</style>
