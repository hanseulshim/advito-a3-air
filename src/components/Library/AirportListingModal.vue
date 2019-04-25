<template>
  <modal
    classes="modal-container"
    name="airport-listing"
    height="auto"
    width="1000px"
  >
    <div class="title-row space-between">
      <div class="section-header">airport listing</div>
      <i class="fas fa-times close-modal-button" @click="hideModal"></i>
    </div>
    <el-table :data="airportList" :max-height="700">
      <el-table-column
        prop="countryName"
        label="Country"
        sortable
        :sort-orders="['ascending', 'descending']"
        :min-width="airport.country"
      />
      <el-table-column
        prop="cityCode"
        label="City Code"
        sortable
        :sort-orders="['ascending', 'descending']"
        :min-width="airport.code"
      />
      <el-table-column
        prop="cityName"
        label="City Name"
        sortable
        :sort-orders="['ascending', 'descending']"
        :min-width="airport.city"
      />
      <el-table-column
        prop="airportCode"
        label="Airport Code"
        sortable
        :sort-orders="['ascending', 'descending']"
        :min-width="airport.code"
      />
      <el-table-column
        prop="airportName"
        label="Airport Name"
        sortable
        :sort-orders="['ascending', 'descending']"
        :min-width="airport.name"
      />
    </el-table>
  </modal>
</template>

<script>
import { airport } from '@/config';
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
      airport
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('airport-listing');
    }
  }
};
</script>
