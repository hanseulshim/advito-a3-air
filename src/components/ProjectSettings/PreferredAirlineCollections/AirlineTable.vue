<template>
  <el-table ref="airlineList" :data="airlineList" class="level-two-table">
    <el-table-column
      prop="name"
      label="Airline Name"
      :width="tableColumnWidth.name"
    />
    <el-table-column
      prop="preferenceLevel"
      label="Preference Level"
      :width="tableColumnWidth.name"
    />
    <el-table-column
      prop="effectiveStartDate"
      label="Effective Start Date"
      :formatter="row => formatDate(row, 'effectiveStartDate')"
      :width="tableColumnWidth.date"
    />
    <el-table-column
      prop="effectiveEndDate"
      label="Effective End Date"
      :formatter="row => formatDate(row, 'effectiveEndDate')"
      :width="tableColumnWidth.date"
    />
    <el-table-column prop="pos" label="PoS" />
    <el-table-column label="Status">
      <template slot-scope="props">
        {{ props.row.active ? 'Active' : 'Inactive' }}
      </template>
    </el-table-column>
    <el-table-column label="Actions" :width="tableColumnWidth.actions">
      <template>
        <i class="fas fa-pencil-alt icon-spacer"></i>
        <i class="fas fa-trash-alt"></i>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { formatDate } from '@/helper';
import { tableColumnWidth } from '@/config';
export default {
  name: 'AirlineTable',
  props: {
    airlineList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      tableColumnWidth
    };
  },
  methods: {
    formatDate(row, param) {
      return row[param] ? formatDate(row[param]) : 'Undefined';
    }
  }
};
</script>
