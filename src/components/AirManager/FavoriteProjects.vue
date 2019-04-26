<template>
  <div class="favorite-container">
    <div
      v-for="project in favoriteProjectList"
      :key="project.id"
      class="favorite-project"
    >
      <div class="favorite-project-main">
        <div class="title-row space-between title">
          <span @click="updateProject(project)">{{ project.name }}</span>
          <el-tooltip
            effect="dark"
            content="Remove from Favorites"
            placement="top"
          >
            <i
              class="fas fa-times"
              @click="toggleFavoriteProject(project.id)"
            ></i>
          </el-tooltip>
        </div>
        <div class="value-row">
          <span>Project Dates</span>
          <span>
            {{ formatDate(project.effectiveFrom) }} —
            {{ formatDate(project.effectiveTo) }}
          </span>
        </div>
        <div class="value-row">
          <span>Savings Type</span>
          <span>{{ project.savingsType }}</span>
        </div>
        <div class="value-row">
          <span>Project Manager</span>
          <span>{{ project.projectManagerName }}</span>
        </div>
        <div class="value-row">
          <span>Lead Analyst</span>
          <span>{{ project.leadAnalystName }}</span>
        </div>
        <div class="value-row">
          <span>Data Specialist</span>
          <span>{{ project.dataSpecialistName }}</span>
        </div>
        <div class="description">{{ project.description }}</div>
      </div>
      <div class="favorite-project-footer">
        <i class="fas fa-pencil-alt" @click="editProject(project)"></i>
        <i class="fas fa-trash-alt" @click="deleteProject(project.id)"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/helper';
import {
  UPDATE_PROJECT,
  UPDATE_CLIENT,
  TOGGLE_FAVORITE_PROJECT
} from '@/graphql/mutations';
import { GET_CLIENTS } from '@/graphql/queries';
export default {
  name: 'FavoriteProjects',
  apollo: {
    clientList: {
      query: GET_CLIENTS
    }
  },
  props: {
    favoriteProjectList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      projectList: []
    };
  },
  methods: {
    formatDate(date) {
      return formatDate(date);
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
.favorite-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 1em;
  row-gap: 1em;
  margin-top: 2em;
}
.favorite-project {
  border: 1px solid $gray-nurse;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    border: 1px solid $tree-poppy;
    .title-row {
      color: $tree-poppy;
    }
  }
}
.favorite-project-main {
  padding: 2em;
}
.title-row {
  padding-bottom: 1em;
  border-bottom: 1px solid $gray-nurse;
}
.fa-times {
  color: $tree-poppy;
  margin-bottom: 1em;
}
.value-row {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid $gray-nurse;
}
.description {
  margin: 1em 0;
}
.favorite-project-footer {
  padding: 1em 2em;
  background: $black-haze;
  display: flex;
  justify-content: flex-end;
  .fa-trash-alt {
    margin-left: 1em;
  }
}
</style>
