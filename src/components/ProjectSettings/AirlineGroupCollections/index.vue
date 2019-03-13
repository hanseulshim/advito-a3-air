<template>
  <div class="table-spacer">
    <div class="section-header title-row space-between">
      {{
        pluralize('airline group collection', airlineGroupCollectionList.length)
      }}
    </div>
    <el-table ref="airlineGroupCollection" :data="airlineGroupCollectionList">
      <el-table-column type="expand" :width="tableColumnWidth.expand">
        <template slot-scope="props">
          <AirlineGroupTable :airline-group-list="props.row.airlineGroupList" />
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="Airline Group Collection"
        :width="tableColumnWidth.name"
        sortable
      />
      <el-table-column
        prop="airlineGroupList.length"
        label="Groups"
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
          <i v-if="scope.row.id !== 1" class="fas fa-trash-alt icon-spacer"></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { pluralize, formatDate } from '@/helper';
import { tableColumnWidth } from '@/config';
import { GET_AIRLINE_GROUP_COLLECTION_LIST } from '@/graphql/queries';
import AirlineGroupTable from './AirlineGroupTable';
export default {
  name: 'AirlineGroupCollections',
  components: {
    AirlineGroupTable
  },
  apollo: {
    airlineGroupCollectionList: {
      query: GET_AIRLINE_GROUP_COLLECTION_LIST
    }
  },
  data() {
    return {
      airlineGroupCollectionList: [],
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
