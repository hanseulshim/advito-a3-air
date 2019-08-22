<template>
  <div>
    <Sidebar />
    <div>
      <Header
        :client="client"
        :project="project"
        :client-list="clientList"
        :project-list="projectList"
      />
      <router-view />
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import {
  GET_PROJECTS,
  GET_CLIENTS,
  GET_CLIENT,
  GET_PROJECT
} from '@/graphql/queries';
import { UPDATE_PROJECT, UPDATE_CLIENT } from '@/graphql/mutations';

export default {
  name: 'Home',
  components: {
    Header,
    Sidebar
  },
  apollo: {
    client: {
      query: GET_CLIENT
    },
    clientList: {
      query: GET_CLIENTS
    },
    project: {
      query: GET_PROJECT
    },
    projectList: {
      query: GET_PROJECTS,
      variables() {
        return {
          clientId: this.client.id,
          userId: null
        };
      },
      result({ data }) {
        this.restoreState(data.projectList);
      }
    }
  },
  data() {
    return {
      projectList: [],
      clientList: [],
      client: {},
      project: {}
    };
  },
  methods: {
    async restoreState(projList) {
      //   try {
      //     const path = this.$route.path;
      //     const outsideUrl = path.includes('project');
      //     if (outsideUrl) {
      //       const splitPath = path.split('/');
      //       const projectId = parseInt(splitPath[2]);
      //       const route = splitPath.slice(3).join('/');
      //       const matched = projList.filter(proj => proj.id === projectId)[0];
      //       await this.$apollo.mutate({
      //         mutation: UPDATE_PROJECT,
      //         variables: {
      //           project: matched,
      //           route
      //         }
      //       });
      //       const {
      //         data: { clientList }
      //       } = await this.$apollo.query({
      //         query: GET_CLIENTS
      //       });
      //       const matchedClient = clientList.filter(
      //         client => client.id === matched.clientId
      //       )[0];
      //       this.$apollo.mutate({
      //         mutation: UPDATE_CLIENT,
      //         variables: {
      //           client: matchedClient
      //         }
      //       });
      //     } else return;
      //   } catch (error) {
      //     this.$modal.show('error', {
      //       message: error.message
      //     });
      //     console.log('heres ya error', error);
      //   }
    }
  }
};
</script>
