<template>
  <modal
    classes="modal-container"
    name="airport-listing"
    height="auto"
    width="1000px"
  >
    <div class="title-row space-between">
      <div class="section-header">airport listing</div>
      <el-tooltip effect="dark" content="Close Modal" placement="top">
        <i class="fas fa-times close-modal-button" @click="hideModal" />
      </el-tooltip>
    </div>
    <el-table
      v-loading="$apollo.loading"
      :data="filteredAirportList"
      :max-height="700"
    >
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
    <el-pagination
      :page-size="pageSize"
      :pager-count="21"
      layout="prev, pager, next"
      :total="airportList.length"
      @current-change="filterAirportList"
    >
    </el-pagination>
  </modal>
</template>

<script>
import { airport } from '@/config';
import { GET_AIRPORT_LIST } from '@/graphql/queries';
export default {
  name: 'AirportListingModal',
  apollo: {
    airportList: {
      query: GET_AIRPORT_LIST,
      result({ data: { airportList } }) {
        this.filteredAirportList = airportList.slice(0, this.pageSize);
      }
    }
  },
  data() {
    return {
      airportList: [],
      filteredAirportList: [],
      pageSize: 200,
      airport
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('airport-listing');
    },
    filterAirportList(val) {
      const factor = (val - 1) * this.pageSize;
      this.filteredAirportList = this.airportList.slice(
        factor,
        factor + this.pageSize
      );
    }
  }
};
</script>
