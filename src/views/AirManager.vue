<template>
  <div class="projects-container">
    <div class="option-container">
      <div class="favorite-projects section-header">
        {{ pluralize('favorite project', favoriteProjectList.length) }}
      </div>
      <el-checkbox v-model="showInactive">Show inactive</el-checkbox>
      <el-select v-model="selectedUser" placeholder="Select" filterable>
        <el-option
          v-for="item in projectManagerList"
          :key="item.email"
          :label="item.name"
          :value="item.email"
        />
      </el-select>
      <button class="button long" @click="showNewProject">+ NEW PROJECT</button>
      <i class="fas fa-info project-top-item" @click="showInfoModal" />
    </div>
    <FavoriteProjects :favorite-project-list="favoriteProjectList" />
    <TotalProjects :total-project-list="totalProjectList" />
    <NewProjectModal />
    <EditProjectModal />
    <DeleteProjectModal />
  </div>
</template>

<script>
import { pluralize } from '@/helper';
import TotalProjects from '@/components/AirManager/TotalProjects';
import FavoriteProjects from '@/components/AirManager/FavoriteProjects';
import NewProjectModal from '@/components/AirManager/NewProjectModal';
import DeleteProjectModal from '@/components/AirManager/DeleteProjectModal';
import EditProjectModal from '@/components/AirManager/EditProjectModal';
import {
  GET_PROJECTS,
  GET_USER,
  GET_CLIENT,
  GET_CLIENTS
} from '@/graphql/queries';

export default {
  name: 'AirManager',
  components: {
    TotalProjects,
    FavoriteProjects,
    NewProjectModal,
    DeleteProjectModal,
    EditProjectModal
  },
  apollo: {
    user: {
      query: GET_USER
    },
    client: {
      query: GET_CLIENT
    },
    clientList: {
      query: GET_CLIENTS
    },
    projectList: {
      query: GET_PROJECTS,
      variables() {
        return {
          clientId: this.client.id
        };
      }
    }
  },
  data() {
    return {
      selectedUser: '',
      showInactive: false,
      projectList: [],
      clientList: [],
      user: null,
      client: null
    };
  },
  computed: {
    filteredProjectList: function() {
      return this.projectList.filter(
        project =>
          project.reportTo === null ||
          this.showInactive ||
          project.reportTo > new Date()
      );
    },
    favoriteProjectList: function() {
      return this.filteredProjectList.filter(
        project =>
          project.favorite &&
          (project.projectManagerEmail === this.selectedUser ||
            project.leadAnalystEmail === this.selectedUser ||
            project.dataSpecialistEmail === this.selectedUser)
      );
    },
    totalProjectList: function() {
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
        }))
        .sort((a, b) => {
          if (a.name === 'User: Me') return -1;
          return a.name.localeCompare(b.name);
        });
    }
  },
  mounted() {
    this.selectedUser = this.user.email;
  },
  methods: {
    pluralize(word, count) {
      return pluralize(word, count);
    },
    showNewProject() {
      this.$modal.show('new-project');
    },
    showInfoModal() {
      this.$modal.show('info');
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/global.scss';
.projects-container {
  background: $white;
  padding: 2em;
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
}
</style>
