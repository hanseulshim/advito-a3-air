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
    <FavoriteProjects :favorite-project-list="favoriteProjectList" />
    <AllProjects :all-project-list="allProjectList" :user="user" />
  </div>
</template>

<script>
import AllProjects from './AllProjects.vue';
import FavoriteProjects from './FavoriteProjects.vue';
import { GET_PROJECTS, GET_USER, GET_CLIENT } from '@/graphql/queries';

export default {
  name: 'Projects',
  components: {
    AllProjects,
    FavoriteProjects
  },
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
</style>
