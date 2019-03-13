<template>
  <el-table ref="airlineList" :data="airlineList" class="level-two-table">
    <el-table-column prop="name" label="Airline Name" min-width="160" />
    <el-table-column
      prop="preferenceLevel"
      label="Preference Level"
      min-width="175"
    />
    <el-table-column
      prop="effectiveStartDate"
      label="Effective Start Date"
      :formatter="formatStartDate"
      min-width="175"
    />
    <el-table-column
      prop="effectiveEndDate"
      label="Effective End Date"
      :formatter="formatEndDate"
      min-width="175"
    />
    <el-table-column prop="cabins" label="Cabins" />
    <el-table-column prop="pos" label="PoS" />
    <el-table-column label="Status">
      <template slot-scope="props">
        {{ props.row.active ? 'Active' : 'Inactive' }}
      </template>
    </el-table-column>
    <el-table-column label="Actions" width="90">
      <template>
        <div class="edit-project-container">
          <i class="fas fa-pencil-alt"></i>
          <i class="fas fa-trash-alt"></i>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { formatDate } from '@/helper';
export default {
  name: 'AirlineTable',
  props: {
    airlineList: {
      type: Array,
      required: true
    }
  },
  methods: {
    formatStartDate(row) {
      return row.effectiveStartDate
        ? formatDate(row.effectiveStartDate)
        : 'Undefined';
    },
    formatEndDate(row) {
      return row.effectiveEndDate
        ? formatDate(row.effectiveEndDate)
        : 'Undefined';
    }
  }
};
</script>
