<template>
  <div v-if="password === 'air2019'">
    <Sidebar/>
    <div id="app">
      <Header/>
      <router-view/>
      <Modals/>
    </div>
  </div>
  <div v-else class="validation-container">
    <el-input v-model="password" placeholder="Please input password"></el-input>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Modals from "@/components/Modals";
import { GET_PROJECTS, GET_CLIENT, GET_CLIENTS } from "@/graphql/queries";
export default {
  name: "App",
  components: {
    Header,
    Sidebar,
    Modals
  },
  apollo: {
    clientList: {
      query: GET_CLIENTS
    },
    projectList: {
      query: GET_PROJECTS
    }
  },
  mounted() {
    console.log(this.$route);
  },
  data() {
    return {
      password: "air2019",
      projectList: [],
      clientList: [],
      client: null
    };
  },
  computed: {
    // filteredProjectList: function() {
    //   return this.projectList.filter(
    //     project =>
    //       project.effectiveTo === null ||
    //       this.showInactive ||
    //       project.effectiveTo > new Date()
    //   );
    // }
  }
};
</script>

<style lang="scss">
@import "@/styles/global.scss";
body {
  margin: 0;
  padding: 0;
  background: $alabaster;
  color: $dove-gray;
  font-family: "Rubik", sans-serif;
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
}

#app {
  padding: 2em 4em;
  font-family: "Rubik", sans-serif;
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
