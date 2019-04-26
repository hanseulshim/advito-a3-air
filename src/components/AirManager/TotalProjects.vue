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
      <el-table-column
        prop="name"
        label="Project Name"
        sortable
        :sort-orders="['ascending', 'descending']"
        :min-width="project.name"
      >
        <template slot-scope="scope">
          <div class="project-name" @click="updateProject(scope.row)">
            {{ scope.row.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Date Range"
        :min-width="project.date"
        :formatter="formatDate"
        sortable
        :sort-orders="['ascending', 'descending']"
        sort-by="effectiveFrom"
      />
      <el-table-column
        prop="description"
        label="Description"
        :min-width="project.description"
      />
      <el-table-column
        :width="project.role"
        label="My Role"
        prop="projectManagerEmail"
        sortable
        :sort-orders="['ascending', 'descending']"
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
      <el-table-column
        prop="favorite"
        label="Favorite"
        :width="project.favorite"
      >
        <template slot-scope="scope">
          <el-tooltip effect="dark" content="Favorite Project" placement="top">
            <i
              class="far fa-star"
              @click="toggleFavoriteProject(scope.row.id)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column :width="project.actions" label="Edit">
        <template slot-scope="scope">
          <el-tooltip effect="dark" content="Edit Project" placement="top">
            <i
              class="fas fa-pencil-alt icon-spacer"
              @click="editProject(scope.row)"
            />
          </el-tooltip>
          <el-tooltip effect="dark" content="Delete Project" placement="top">
            <i class="fas fa-trash-alt" @click="deleteProject(scope.row.id)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { formatDate, pluralize } from '@/helper';
import { project } from '@/config';
import { TOGGLE_FAVORITE_PROJECT } from '@/graphql/mutations';
import { GET_CLIENTS, GET_USER } from '@/graphql/queries';
import { UPDATE_CLIENT, UPDATE_PROJECT } from '@/graphql/mutations';
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
    },
    clientList: {
      query: GET_CLIENTS
    }
  },
  data() {
    return {
      user: {
        email: null
      },
      project
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
    },
    updateProject(project) {
      const client = this.clientList.filter(
        client => client.id === project.clientId
      )[0];
      this.$apollo.mutate({
        mutation: UPDATE_CLIENT,
        variables: { client }
      });
      this.$apollo.mutate({
        mutation: UPDATE_PROJECT,
        variables: { project }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';
.all-projects-container {
  margin-top: 3em;
}
.fa-user {
  cursor: default;
}
.project-name {
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>
