<template>
  <div v-loading="$apollo.loading" class="projects-container">
    <div class="option-container">
      <div class="favorite-projects section-header">
        {{ pluralize('favorite project', favoriteProjectList.length) }}
      </div>
      <el-checkbox v-model="showInactive">Show inactive</el-checkbox>
      <el-select
        :value="selectedUser.id"
        placeholder="Select"
        filterable
        @change="updateSelectedUser"
      >
        <el-option
          v-for="item in userList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <button class="button long" @click="showNewProject">+ NEW PROJECT</button>
      <el-tooltip
        effect="dark"
        content="Show Project Information"
        placement="top"
      >
        <i class="fas fa-info project-top-item" @click="showInfoModal" />
      </el-tooltip>
    </div>
    <FavoriteProjects
      :favorite-project-list="favoriteProjectList"
      :selected-user="selectedUser"
      :client-id="client.id"
    />
    <TotalProjects
      :total-project-list="totalProjectList"
      :selected-user="selectedUser"
      :client-id="client.id"
    />
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
  GET_USER_LIST,
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
      query: GET_USER,
      update({ user }) {
        this.selectedUser = user;
        return user;
      }
    },
    userList: {
      query: GET_USER_LIST,
      variables() {
        return {
          clientId: this.client.id
        };
      }
    },
    client: {
      query: GET_CLIENT
    },
    clientList: {
      query: GET_CLIENTS
    },
    projectList: {
      query: GET_PROJECTS,
      fetchPolicy: 'network-only',
      variables() {
        return {
          clientId: this.client.id,
          userId: this.selectedUser.id
        };
      }
    }
  },
  data() {
    return {
      selectedUser: {},
      showInactive: false,
      projectList: [],
      clientList: [],
      userList: [],
      user: {
        email: null
      },
      client: {}
    };
  },
  computed: {
    filteredProjectList() {
      return this.projectList.filter(
        project =>
          project.effectiveTo === null ||
          this.showInactive ||
          project.effectiveTo > new Date()
      );
    },
    favoriteProjectList() {
      return this.filteredProjectList.filter(project => project.favorite);
    },
    totalProjectList() {
      return this.filteredProjectList.filter(project => !project.favorite);
    }
  },
  mounted() {
    Object.keys(this.$apollo.queries).forEach(query => {
      this.$apollo.queries[query].setOptions({
        notifyOnNetworkStatusChange: true
      });
    });
  },
  methods: {
    pluralize(word, count) {
      return pluralize(word, count);
    },
    showNewProject() {
      this.$modal.show('new-project', {
        userId: this.selectedUser.id,
        clientId: this.client.id
      });
    },
    showInfoModal() {
      this.$modal.show('info');
    },
    updateSelectedUser(id) {
      this.selectedUser = this.userList.find(user => user.id === id);
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
