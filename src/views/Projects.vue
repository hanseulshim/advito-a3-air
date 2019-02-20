<template>
  <div class="projects-container">
    <div class="option-container">
      <div class="favorite-projects">
        {{ favoriteProjects.length }} favorite projects
      </div>
      <el-checkbox v-model="showInactive">Show inactive</el-checkbox>
      <el-select
        v-model="selected"
        placeholder="Select"
        filterable
        clearable
      ></el-select>
      <button>+ NEW PROJECT</button>
      <i class="fas fa-info project-top-item" />
    </div>
    <div class="favorite-container">
      <div
        v-for="project in favoriteProjects"
        :key="project.id"
        class="favorite-project"
      >
        {{ project.name }}
      </div>
    </div>
    <el-table
      :data="allProjects"
      :default-sort="{ prop: 'name', order: 'ascending' }"
      style="width: 100%"
    >
      <el-table-column prop="name" label="Project Name" sortable width="180" />
      <el-table-column
        prop="effectiveFrom"
        label="Project Date Range"
        width="180"
      />
      <el-table-column prop="description" label="Description" />
      <el-table-column prop="favorite" label="Favorite" />
      <el-table-column width="55" label="Edit">
        <template slot-scope="scope">
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
import { GET_PROJECTS } from '@/graphql/queries';

export default {
  name: 'Projects',
  apollo: {
    projectList: {
      query: GET_PROJECTS,
      variables: {
        clientId: 1,
        sessionToken: 'egpSjxgHbWdGY5DySz6gcw=='
      }
    }
  },
  data: function() {
    return {
      selected: null,
      showInactive: false,
      projectList: []
    };
  },
  computed: {
    favoriteProjects: function() {
      return this.projectList.filter(project => project.favorite);
    },
    allProjects: function() {
      return this.projectList.filter(project => !project.favorite);
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
.edit-project-container {
  display: flex;
  justify-content: space-between;
}

.el-table th {
  background: $gray-nurse;
}
</style>
