<template>
  <div class="container">
    <div class="navigation-container">
      <router-link
        v-for="nav in navItems"
        :key="nav.title"
        :to="nav.link"
        class="nav-item"
        :class="{ active: $route.path.includes(nav.path) }"
      >
        <i class="fas fa-circle" :class="getStatus(nav.id)" />
        {{ nav.title }}
      </router-link>
    </div>
    <div class="content-container">
      <ProjectInfo />
      <router-view />
    </div>
  </div>
</template>

<script>
import ProjectInfo from '@/components/ProjectInfo';
import { GET_PROJECT, GET_PROJECT_STATUS_LIST } from '@/graphql/queries';
export default {
  name: 'Project',
  components: {
    ProjectInfo
  },
  data() {
    return {
      project: {},
      projectStatusList: []
    };
  },
  computed: {
    navItems() {
      const navItems = [
        {
          id: 1,
          link: `/${this.project.id}/program-settings`,
          path: `/${this.project.id}/program-settings`,
          title: 'project settings'
        },
        {
          id: 2,
          link: `/${this.project.id}/data/import-errors/imported-tickets`,
          path: `/${this.project.id}/data`,
          title: 'data'
        },
        {
          id: 3,
          link: `/${this.project.id}/contracts`,
          path: `/${this.project.id}/contracts`,
          title: 'contracts'
        },
        {
          id: 4,
          link: `/${this.project.id}/scenario-settings`,
          path: `/${this.project.id}/scenario-settings`,
          title: 'scenario settings'
        },
        {
          id: 5,
          link: `/${this.project.id}/process`,
          path: `/${this.project.id}/process`,
          title: 'process'
        }
      ];
      //If the project is not a Sourcing project, remove "Scenario Settings"
      if (this.project.projectTypeId !== 3) {
        //If the project savings type is "None" then also remove the contracts tab
        if (this.project.savingsTypeId === 66) {
          return navItems.filter(item => item.id !== 4 && item.id !== 3);
        } else {
          return navItems.filter(item => item.id !== 4);
        }
      }
      return navItems;
    }
  },
  apollo: {
    project: {
      query: GET_PROJECT
    },
    projectStatusList: {
      query: GET_PROJECT_STATUS_LIST
    }
  },
  methods: {
    getStatus(id) {
      const project = this.projectStatusList.find(p => p.id === id);
      if (project && project.status === 'valid') {
        return 'valid';
      } else {
        return 'invalid';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';
.container {
  margin-top: 2em;
}
.navigation-container {
  display: flex;
  align-items: flex-end;
}
.nav-item {
  flex: 1;
  text-align: center;
  font-weight: 500;
  color: $black;
  text-transform: uppercase;
  padding: 1em;
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;
  border-bottom: 1px solid $gray-nurse;
  cursor: pointer;
}
.active {
  background: $white;
  margin: -1px -1px 0 -1px;
  border-top: 1px solid $gray-nurse;
  border-bottom: 1px solid $white;
  border-left: 1px solid $gray-nurse;
  border-right: 1px solid $gray-nurse;
  font-weight: 500;
}
.content-container {
  background: $white;
  padding: 3em;
  border: 1px solid $gray-nurse;
  border-top: none;
}
.fa-circle {
  margin-right: 5px;
  color: $gray-nurse;
  &.valid {
    color: $wild-willow;
  }
  &.invalid {
    color: $monza;
  }
}
</style>
