<template>
  <div class="projects-container">
    <div class="option-container">
      <div class="favorite-projects">
        {{ favoriteProjectList.length }} favorite projects
      </div>
      <el-checkbox v-model="showInactive">Show inactive</el-checkbox>
      <el-select
        v-model="selectedUser"
        placeholder="Select"
        filterable
        clearable
        ><el-option
          v-for="item in projectManagerList"
          :key="item.email"
          :label="item.name"
          :value="item.email"
      /></el-select>
      <button>+ NEW PROJECT</button>
      <i class="fas fa-info project-top-item" />
    </div>
    <div class="favorite-container">
      <div
        v-for="project in favoriteProjectList"
        :key="project.id"
        class="favorite-project"
      >
        {{ project.name }}
      </div>
    </div>
    <div class="all-projects-container">
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
import moment from 'moment';
import { GET_PROJECTS, GET_USER, GET_CLIENT } from '@/graphql/queries';

export default {
  name: 'Projects',
  apollo: {
    user: {
      query: GET_USER
    },
    client: {
      query: GET_CLIENT
    },
    projectList: {
      query: GET_PROJECTS,
      variables() {
        return {
          clientId: this.client.id,
          sessionToken: this.user.sessionToken
        };
      }
    }
  },
  data: function() {
    return {
      selectedUser: null,
      showInactive: false,
      projectList: [],
      user: null,
      client: null
    };
  },
  computed: {
    filteredProjectList: function() {
      return this.projectList.filter(project => {
        return (
          project.effectiveTo === null ||
          this.showInactive ||
          project.effectiveTo > new Date()
        );
      });
    },
    favoriteProjectList: function() {
      return this.filteredProjectList.filter(project => project.favorite);
    },
    allProjectList: function() {
      return this.filteredProjectList.filter(project => !project.favorite);
    },
    projectManagerList: function() {
      return this.filteredProjectList
        .filter(
          (project, index) =>
            this.filteredProjectList.findIndex(
              v => v.projectManagerId === project.projectManagerId
            ) === index
        )
        .map(projectManager => ({
          id: projectManager.projectManagerId,
          name:
            this.user.email === projectManager.projectManagerEmail
              ? 'User: Me'
              : projectManager.projectManagerName,
          email: projectManager.projectManagerEmail
        }));
    }
  },
  mounted() {
    this.selectedUser = this.user.email;
  },
  methods: {
    formatDate(row) {
      return `${moment(row.effectiveFrom)
        .format('DD MMM YYYY')
        .toUpperCase()} — ${
        row.effectiveTo
          ? moment(row.effectiveTo)
              .format('DD MMM YYYY')
              .toUpperCase()
          : ''
      }`;
    },
    sortByRole(a) {
      if (a.projectManagerEmail === this.user.email) return -1;
      return 1;
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/variables.scss';
.projects-container {
  background: $white;
  padding: 2em;
  margin-top: 2em;
  border: 1px solid $gray-nurse;
}

.option-container {
  display: grid;
  grid-template-areas: 'favorites inactive user newProject info';
  grid-template-columns: auto 130px 200px 150px 30px;
  column-gap: 1em;
  justify-items: flex-end;
  align-items: flex-end;
}
.favorite-projects {
  justify-self: flex-start;
  font-weight: 700;
  text-transform: uppercase;
  color: $black;
}
.el-checkbox {
  margin: 0;
}

.favorite-container {
  display: grid;
  grid-template-columns: auto auto auto;
  column-gap: 1em;
  row-gap: 1em;
  margin-top: 2em;
}
.favorite-project {
  border: 1px solid $gray-nurse;
  padding: 1em;
  border-radius: 10px;
}

.all-projects-container {
  margin: 3em 0 1em 0;
  font-weight: 700;
  text-transform: uppercase;
  color: #000;
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
