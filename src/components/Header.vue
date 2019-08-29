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
      :disabled="projectList.length === 0"
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
import { UPDATE_CLIENT, UPDATE_PROJECT } from '@/graphql/mutations';

export default {
  name: 'Header',
  props: {
    client: {
      type: Object,
      required: true
    },
    project: {
      type: Object,
      required: true
    },
    clientList: {
      type: Array,
      required: true
    },
    projectList: {
      type: Array,
      required: true
    }
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
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  margin-bottom: 4em;

  .el-select {
    flex: 1;
    max-width: 250px;
    margin-right: 1em;
  }
}
.logo {
  max-width: 294px;
  width: 100%;
  margin-right: 5%;
}

.icon-container {
  color: $tradewind;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: auto;
}
.fa-comment-alt {
  font-size: 2.5em;
}

.navigation {
  width: 100%;
  margin-top: 1em;
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
