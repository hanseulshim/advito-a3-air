<template>
  <el-table
    ref="airlineGroupList"
    :data="airlineGroupList"
    class="level-two-table"
    @expand-change="updateExpand"
  >
    <el-table-column type="expand" width="0">
      <template slot-scope="scope">
        <el-table :data="scope.row.airlineList" class="level-three-table">
          <el-table-column prop="name" label="Airlines" />
          <el-table-column
            prop="effectiveStartDate"
            label="Effective Start Date"
            :formatter="formatStartDate"
            width="250"
          />
          <el-table-column
            prop="effectiveEndDate"
            label="Effective End Date"
            :formatter="formatEndDate"
            width="250"
          />
        </el-table>
      </template>
    </el-table-column>
    <el-table-column width="75">
      <template slot-scope="scope">
        <i
          v-if="expandedRows.indexOf(scope.row.id) === -1"
          class="fas fa-plus table-toggle-icon"
          @click="toggleRow(scope)"
        ></i>
        <i
          v-else
          class="fas fa-minus table-toggle-icon"
          @click="toggleRow(scope)"
        ></i>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="Airline Group" width="200" />
    <el-table-column label="Airlines">
      <template slot-scope="scope">
        <div>{{ scope.row.airlineList.length }}</div>
      </template>
    </el-table-column>
    <el-table-column
      prop="effectiveStartDate"
      label="Effective Start Date"
      :formatter="formatStartDate"
      width="175"
    />
    <el-table-column
      prop="effectiveEndDate"
      label="Effective End Date"
      :formatter="formatEndDate"
      width="175"
    />
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
  name: 'AirlineGroupTable',
  props: {
    airlineGroupList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      expandedRows: []
    };
  },
  methods: {
    formatStartDate(row) {
      return formatDate(row.effectiveStartDate);
    },
    formatEndDate(row) {
      return formatDate(row.effectiveEndDate);
    },
    toggleRow(scope) {
      this.$refs.airlineGroupList.toggleRowExpansion(scope.row);
    },
    updateExpand(row, expandedRows) {
      this.expandedRows = expandedRows.map(row => row.id);
    }
  }
};
</script>
