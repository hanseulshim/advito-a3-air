<template>
  <div class="all-projects-container">
    <div class="all-projects-title">
      all projects ({{ allProjectList.length }})
    </div>
    <el-table
      :data="allProjectList"
      :default-sort="{ prop: 'name', order: 'ascending' }"
      style="width: 100%"
      header-cell-class-name="table-header-cell"
    >
      <el-table-column prop="name" label="Project Name" sortable width="180" />
      <el-table-column
        prop="effectiveFrom"
        label="Project Date Range"
        width="220"
        :formatter="formatDate"
        sortable
        sort-by="effectiveFrom"
      />
      <el-table-column prop="description" label="Description" />
      <el-table-column
        width="100"
        label="My Role"
        sortable
        :sort-method="sortByRole"
      >
        <template slot-scope="scope">
          <i
            v-if="scope.row.projectManagerEmail === user.email"
            class="fas fa-user"
          ></i>
        </template>
      </el-table-column>
      <el-table-column prop="favorite" label="Favorite" width="75">
        <template>
          <i class="far fa-star"></i>
        </template>
      </el-table-column>
      <el-table-column width="55" label="Edit">
        <template>
          <div class="edit-project-container">
            <i class="fas fa-pencil-alt"></i>
            <i class="fas fa-trash-alt"></i>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { formatDate } from '@/helper';
export default {
  name: 'AllProjects',
  props: {
    allProjectList: {
      type: Array,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(row) {
      return `${formatDate(row.effectiveFrom)} — ${formatDate(
        row.effectiveTo
      )}`;
    },
    sortByRole(a) {
      if (a.projectManagerEmail === this.user.email) return -1;
      return 1;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.all-projects-container {
  margin-top: 3em;
}

.all-projects-title {
  font-weight: 700;
  text-transform: uppercase;
  color: #000;
  margin-bottom: 1em;
}

.fa-pencil-alt,
.fa-trash-alt,
.fa-star {
  cursor: pointer;
}

.el-table {
  .table-header-cell {
    background-color: $gray-nurse;
    color: $black;
  }
  .edit-project-container {
    display: flex;
    justify-content: space-between;
  }
}
</style>
