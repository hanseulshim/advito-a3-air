<template>
  <div class="all-projects-container">
    <div class="all-projects-title section-header">
      {{ totalProjectList.length }} total projects
    </div>
    <el-table
      :data="totalProjectList"
      :default-sort="{ prop: 'projectManagerEmail', order: 'ascending' }"
      style="width: 100%"
      header-cell-class-name="table-header-cell"
      max-height="750"
    >
      <el-table-column prop="name" label="Project Name" sortable width="230">
        <template slot-scope="scope">
          <div>{{ scope.row.name }}</div>
        </template>
      </el-table-column>
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
        prop="projectManagerEmail"
        sortable
        :sort-method="sortByRole"
      >
        <template slot-scope="scope">
          <i
            v-if="
              scope.row.projectManagerEmail === apollo.vm.user.email ||
                scope.row.leadAnalystEmail === apollo.vm.user.email ||
                scope.row.dataSpecialistEmail === apollo.vm.user.email
            "
            class="fas fa-user"
          ></i>
        </template>
      </el-table-column>
      <el-table-column prop="favorite" label="Favorite" width="85">
        <template slot-scope="scope">
          <i
            class="far fa-star"
            @click="toggleFavoriteProject(scope.row.id)"
          ></i>
        </template>
      </el-table-column>
      <el-table-column width="55" label="Edit">
        <template slot-scope="scope">
          <div class="edit-project-container">
            <i class="fas fa-pencil-alt" @click="editProject(scope.row)"></i>
            <i
              class="fas fa-trash-alt"
              @click="deleteProject(scope.row.id)"
            ></i>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <EditProjectModal :apollo="apollo" />
    <DeleteProjectModal :apollo="apollo" />
  </div>
</template>

<script>
import DeleteProjectModal from './DeleteProjectModal';
import EditProjectModal from './EditProjectModal';
import { formatDate } from '@/helper';
import { TOGGLE_FAVORITE_PROJECT } from '@/graphql/mutations';
export default {
  name: 'TotalProjects',
  components: {
    DeleteProjectModal,
    EditProjectModal
  },
  props: {
    totalProjectList: {
      type: Array,
      required: true
    },
    apollo: {
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
      if (
        a.projectManagerEmail === this.apollo.vm.user.email ||
        a.leadAnalystEmail === this.apollo.vm.user.email ||
        a.dataSpecialistEmail === this.apollo.vm.user.email
      )
        return -1;
      return 1;
    },
    editProject(project) {
      this.$modal.show('edit-project', { project });
    },
    deleteProject(id) {
      this.$modal.show('delete', { id });
    },
    async toggleFavoriteProject(id) {
      try {
        await this.apollo.mutate({
          mutation: TOGGLE_FAVORITE_PROJECT,
          variables: { id }
        });
        this.apollo.queries.projectList.refetch();
      } catch (error) {
        return 'this was an error';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';
.all-projects-container {
  margin-top: 3em;
}

.all-projects-title {
  margin-bottom: 1em;
}

.fa-pencil-alt,
.fa-trash-alt,
.fa-star {
  cursor: pointer;
}

.edit-project-container {
  display: flex;
  justify-content: space-between;
}
</style>
