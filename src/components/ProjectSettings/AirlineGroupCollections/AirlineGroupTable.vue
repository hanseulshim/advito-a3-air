<template>
  <el-table
    ref="airlineGroupList"
    v-loading="$apollo.loading"
    :data="airlineGroupList"
    class="level-two-table"
  >
    <el-table-column type="expand">
      <template slot-scope="scope">
        <el-table
          :data="scope.row.airlineGroupMemberList"
          class="level-three-table"
        >
          <el-table-column prop="name" label="Airlines" />
          <el-table-column
            prop="effectiveStartDate"
            label="Effective Start Date"
            :formatter="row => formatDate(row, 'effectiveStartDate')"
            :width="airline.date"
          />
          <el-table-column
            prop="effectiveEndDate"
            label="Effective End Date"
            :formatter="row => formatDate(row, 'effectiveEndDate')"
            :width="airline.date"
          />
        </el-table>
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="Airline Group"
      :min-width="airline.name"
    />
    <el-table-column
      prop="airlineGroupMemberList.length"
      label="Airlines"
      :min-width="airline.count"
    />
    <el-table-column
      prop="effectiveStartDate"
      label="Effective Start Date"
      :formatter="row => formatDate(row, 'effectiveStartDate')"
      :width="airline.date"
    />
    <el-table-column
      prop="effectiveEndDate"
      label="Effective End Date"
      :formatter="row => formatDate(row, 'effectiveEndDate')"
      :width="airline.date"
    />
    <el-table-column label="Actions" :width="airline.actions">
      <template slot-scope="scope">
        <el-tooltip effect="dark" content="Edit" placement="top">
          <i
            v-if="collectionId !== 1"
            class="fas fa-pencil-alt icon-spacer"
            @click="showEditAirlineGroup(scope.row)"
          />
        </el-tooltip>
        <el-tooltip effect="dark" content="Delete" placement="top">
          <i
            v-if="collectionId !== 1"
            class="fas fa-trash-alt"
            @click="showDeleteAirlineGroup(scope.row)"
          />
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { GET_AIRLINE_GROUP_LIST } from '@/graphql/queries';
import { formatDate } from '@/helper';
import { airline } from '@/config';
export default {
  name: 'AirlineGroupTable',
  props: {
    collectionId: {
      type: Number,
      required: true
    }
  },
  apollo: {
    airlineGroupList: {
      query: GET_AIRLINE_GROUP_LIST,
      variables() {
        return {
          collectionId: this.collectionId
        };
      }
    }
  },
  data() {
    return {
      airlineGroupList: [],
      airline
    };
  },
  methods: {
    formatDate(row, param) {
      return formatDate(row[param]);
    },
    showEditAirlineGroup(airlineGroup) {
      this.$modal.show('edit-airline-group', {
        airlineGroup,
        collectionId: this.collectionId
      });
    },
    showDeleteAirlineGroup(airlineGroup) {
      this.$modal.show('delete-airline-group', {
        airlineGroup,
        collectionId: this.collectionId
      });
    }
  }
};
</script>
