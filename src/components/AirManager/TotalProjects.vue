<template>
  <div class="all-projects-container">
    <div class="section-header title-row">
      {{ pluralize('total project', totalProjectList.length) }}
    </div>
    <el-table
      :data="totalProjectList"
      :default-sort="{ prop: 'projectManagerEmail', order: 'ascending' }"
      :max-height="750"
    >
      <el-table-column prop="name" label="Project Name" sortable width="250">
        <template slot-scope="scope">
          <div>{{ scope.row.name }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="effectiveFrom"
        label="Project Date Range"
        width="250"
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
              scope.row.projectManagerEmail === user.email ||
                scope.row.leadAnalystEmail === user.email ||
                scope.row.dataSpecialistEmail === user.email
            "
            class="fas fa-user"
          ></i>
        </template>
      </el-table-column>
      <el-table-column prop="favorite" label="Favorite" width="100">
        <template slot-scope="scope">
          <i
            class="far fa-star"
            @click="toggleFavoriteProject(scope.row.id)"
          ></i>
        </template>
      </el-table-column>
      <el-table-column width="75" label="Edit">
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
  </div>
</template>

<script>
import { formatDate, pluralize } from '@/helper';
import { TOGGLE_FAVORITE_PROJECT } from '@/graphql/mutations';
import { GET_USER } from '@/graphql/queries';
export default {
  name: 'TotalProjects',
  props: {
    totalProjectList: {
      type: Array,
      required: true
    }
  },
  apollo: {
    user: {
      query: GET_USER
    }
  },
  data() {
    return {
      user: null
    };
  },
  methods: {
    pluralize(word, count) {
      return pluralize(word, count);
    },
    formatDate(row) {
      return `${formatDate(row.effectiveFrom)} — ${formatDate(
        row.effectiveTo
      )}`;
    },
    sortByRole(a) {
      if (
        a.projectManagerEmail === this.user.email ||
        a.leadAnalystEmail === this.user.email ||
        a.dataSpecialistEmail === this.user.email
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
        await this.$apollo.mutate({
          mutation: TOGGLE_FAVORITE_PROJECT,
          variables: { id }
        });
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
</style>
