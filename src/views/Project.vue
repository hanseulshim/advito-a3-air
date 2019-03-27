<template>
  <div class="container">
    <div class="navigation-container">
      <router-link
        v-for="nav in navItems"
        :key="nav.title"
        :to="nav.link"
        class="nav-item"
        :class="{ active: $route.path.includes(nav.path) }"
        ><i class="fas fa-circle" :class="getStatus(nav.id)" />{{
          nav.title
        }}</router-link
      >
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
      project: null,
      navItems: [
        {
          id: 1,
          link: '/project/program-settings',
          path: '/project/program-settings',
          title: 'project settings'
        },
        {
          id: 2,
          link: '/project/data/pos-trends/tickets',
          path: '/project/data',
          title: 'data'
        },
        {
          id: 3,
          link: '/project/default-contracts',
          path: '/project/default-contracts',
          title: 'default contracts'
        },
        {
          id: 4,
          link: '/project/scenario-settings',
          path: '/project/scenario-settings',
          title: 'scenario settings'
        },
        {
          id: 5,
          link: '/project/process',
          path: '/project/process',
          title: 'process'
        }
      ],
      projectStatusList: []
    };
  },
  mounted() {
    if (!this.project.id) this.$router.push('/');
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
      const project = this.projectStatusList.filter(
        project => project.id === id
      )[0];
      if (project.status === 'valid') {
        return 'valid';
      } else if (project.status === 'invalid') {
        return 'invalid';
      } else {
        return '';
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
  padding: 2em;
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
