<template>
  <v-app>
    <v-container grid-list-md fluid>
      <Header />
    </v-container>
    <router-view />
  </v-app>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  name: "App",
  components: {
    Header
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  font-family: "Rubik", sans-serif;
  background: #f9f9f9;
  color: #666666;
}

#app {
  font-weight: 300;
  font-size: 16px;
  line-height: 20px;
  padding: 1em 2em;
  @media (max-width: 1336px) {
    font-size: 13px;
    line-height: 17px;
  }
}
</style>
