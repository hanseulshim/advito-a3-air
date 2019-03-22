<template>
  <div class="header-container">
    <img class="logo" alt="Vue logo" src="@/assets/logo.png" />
    <el-select
      :value="client.id"
      placeholder="Select Client"
      filterable
      clearable
      @change="updateClient"
    >
      <el-option
        v-for="item in clientList"
        :key="item.value"
        :label="item.name"
        :value="item.id"
      ></el-option>
    </el-select>
    <el-select
      v-if="client.id"
      :value="project.id"
      placeholder="Select Project"
      filterable
      clearable
      @change="updateProject"
    >
      <el-option
        v-for="item in projectList"
        :key="item.value"
        :label="item.name"
        :value="item.id"
      ></el-option>
    </el-select>
    <div class="icon-container">
      <i class="far fa-comment-alt" />
      <span>Ask Addy</span>
    </div>
    <div class="navigation">
      <span class="previous-nav link">« Back to Console</span>
      <span> | </span>
      <span
        :class="{ link: client.id, 'previous-nav': project.id }"
        @click="updateClient()"
        >Air Program Manager</span
      >
      <span v-if="project.id"> | </span>
      <span v-if="project.id">Project</span>
    </div>
  </div>
</template>

<script>
import {
  GET_CLIENTS,
  GET_PROJECTS,
  GET_CLIENT,
  GET_PROJECT
} from '@/graphql/queries';
import { UPDATE_CLIENT, UPDATE_PROJECT } from '@/graphql/mutations';

export default {
  name: 'Header',
  apollo: {
    client: {
      query: GET_CLIENT
    },
    project: {
      query: GET_PROJECT
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
  data: function() {
    return {
      selected: null,
      clientList: [],
      projectList: [],
      project: null,
      client: null
    };
  },
  methods: {
    updateClient(id) {
      const variables = {};
      if (id) {
        variables.client = this.clientList.filter(
          client => client.id === id
        )[0];
      }
      this.updateProject();
      this.$apollo.mutate({
        mutation: UPDATE_CLIENT,
        variables
      });
    },
    updateProject(id) {
      const variables = {};
      if (id) {
        variables.project = this.projectList.filter(
          project => project.id === id
        )[0];
      }
      this.$apollo.mutate({
        mutation: UPDATE_PROJECT,
        variables
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';
.header-container {
  display: grid;
  grid-template-areas: 'logo . . . addy' 'navigation navigation . . .';
  grid-template-columns: 25% 17% 17% auto 75px;
  row-gap: 1em;
  column-gap: 1em;
  align-items: flex-end;
  margin-bottom: 2em;
}
.logo {
  max-width: 294px;
  width: 100%;
}

.icon-container {
  color: $tradewind;
  cursor: pointer;
  grid-area: addy;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.fa-comment-alt {
  font-size: 2.5em;
}

.navigation {
  grid-area: navigation;
}
.previous-nav {
  color: $tree-poppy;
}
.link {
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>
