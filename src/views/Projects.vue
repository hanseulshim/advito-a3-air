<template>
  <v-layout wrap align-center class="projects-container">
    <v-layout justify-space-between>
      <v-flex md1> {{ favoriteProjectList.length }} favorite projects </v-flex>
      <v-flex md8>
        <v-layout align-center justify-end>
          <div class="project-top-item">
            <v-checkbox
              v-model="showInactive"
              label="Show inactive"
            ></v-checkbox>
          </div>
          <v-flex md4 class="project-top-item">
            <v-select v-model="selected" label="name" />
          </v-flex>
          <button class="project-top-item">
            + NEW PROJECT
          </button>
          <i class="fas fa-info project-top-item"></i>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-flex md12>
      <v-layout wrap>
        <v-flex v-for="project in favoriteProjectList" :key="project.id" md4>
          {{ project.name }}
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex md12>
      test
    </v-flex>
  </v-layout>
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
    favoriteProjectList: function() {
      return this.projectList.filter(project => project.favorite);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.projects-container {
  background: $white;
  padding: 2em;
  border: 1px solid $gray-nurse;
  border-radius: 10px;
}

.project-top-item {
  margin-left: 1em;
}
</style>
