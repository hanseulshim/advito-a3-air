<template>
  <div class="table-spacer">
    <div class="section-header title-row space-between">
      {{
        pluralize(
          'preferred airline collection',
          preferredAirlineCollectionList.length
        )
      }}
    </div>
    <el-table
      ref="preferredAirlineCollection"
      :data="preferredAirlineCollectionList"
    >
      <el-table-column type="expand" :width="tableColumnWidth.expand">
        <template slot-scope="props">
          <AirlineTable :airline-list="props.row.airlineList" />
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="Preferred Airline Collection"
        :width="tableColumnWidth.name"
        sortable
      />
      <el-table-column
        prop="airlineList.length"
        label="Airlines"
        :width="tableColumnWidth.count"
        sortable
      />
      <el-table-column prop="description" label="Description" />
      <el-table-column
        prop="dateUpdated"
        label="Date Updated"
        sortable
        :formatter="formatDate"
        :width="tableColumnWidth.date"
      />
      <el-table-column label="Status" :width="tableColumnWidth.icon">
        <template slot-scope="scope">
          <el-switch :value="scope.row.active" />
        </template>
      </el-table-column>
      <el-table-column label="Actions" :width="tableColumnWidth.actions">
        <template slot-scope="scope">
          <i class="far fa-copy icon-spacer"></i>
          <i
            v-if="scope.row.id !== 1"
            class="fas fa-pencil-alt icon-spacer"
          ></i>
          <i v-if="scope.row.id !== 1" class="fas fa-trash-alt"></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { pluralize, formatDate } from '@/helper';
import { tableColumnWidth } from '@/config';
import { GET_PREFERRED_AIRLINE_COLLECTION_LIST } from '@/graphql/queries';
import AirlineTable from './AirlineTable';
export default {
  name: 'PreferredAirlineCollections',
  components: {
    AirlineTable
  },
  apollo: {
    preferredAirlineCollectionList: {
      query: GET_PREFERRED_AIRLINE_COLLECTION_LIST
    }
  },
  data() {
    return {
      preferredAirlineCollectionList: [],
      tableColumnWidth
    };
  },
  methods: {
    pluralize(word, count) {
      return pluralize(word, count);
    },
    formatDate(row) {
      return formatDate(row.dateUpdated);
    }
  }
};
</script>
