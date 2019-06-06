<template>
  <div v-if="password === 'air2019'">
    <Sidebar />
    <div id="app">
      <Header />
      <router-view />
      <Modals />
    </div>
  </div>
  <div v-else class="validation-container">
    <el-input v-model="password" placeholder="Please input password"></el-input>
  </div>
</template>

<script>
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Modals from '@/components/Modals';
import { GET_PROJECTS, GET_CLIENTS } from '@/graphql/queries';
import { UPDATE_PROJECT, UPDATE_CLIENT } from '@/graphql/mutations';
export default {
  name: 'App',
  components: {
    Header,
    Sidebar,
    Modals
  },
  apollo: {
    projectList: {
      query: GET_PROJECTS,
      result({ data }) {
        this.restoreState(data.projectList);
      }
    }
  },
  data() {
    return {
      password: 'air2019',
      projectList: [],
      clientList: [],
      client: null
    };
  },
  methods: {
    async restoreState(projList) {
      const path = this.$route.path;
      const outsideUrl = path.includes('project');
      if (outsideUrl) {
        const splitPath = path.split('/');
        const projectId = parseInt(splitPath[2]);
        const route = splitPath.slice(3).join('/');

        const matched = projList.filter(proj => proj.id === projectId)[0];
        await this.$apollo.mutate({
          mutation: UPDATE_PROJECT,
          variables: {
            project: matched,
            route
          }
        });
        const {
          data: { clientList }
        } = await this.$apollo.query({
          query: GET_CLIENTS
        });
        const matchedClient = clientList.filter(
          client => client.id === matched.clientId
        )[0];
        this.$apollo.mutate({
          mutation: UPDATE_CLIENT,
          variables: {
            client: matchedClient
          }
        });
      } else return;
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/global.scss';
body {
  margin: 0;
  padding: 0;
  background: $alabaster;
  color: $dove-gray;
  font-family: 'Rubik', sans-serif;
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
}

#app {
  padding: 2em 4em;
  font-family: 'Rubik', sans-serif;
  max-width: 1600px;
  min-width: 1336px;
  margin: auto;
  display: flex;
  flex-direction: column;
  @media (max-width: 1336px) {
    font-size: 13px;
    line-height: 17px;
  }
}

.validation-container {
  width: 300px;
  margin: auto;
  margin-top: 5em;
}
</style>
