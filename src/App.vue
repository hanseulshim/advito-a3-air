<template>
  <div>
    <Sidebar />
    <v-app>
      <v-container grid-list-md fluid>
        <Header />
      </v-container>
      <router-view />
    </v-app>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar';
export default {
  name: 'App',
  components: {
    Header,
    Sidebar
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  background: #f9f9f9;
  color: #666666;
  font-family: 'Rubik', sans-serif;
  font-weight: 300;
  font-size: 16px;
  line-height: 20px;
}

#app {
  padding: 1em 4em;
  font-family: 'Rubik', sans-serif;
  @media (max-width: 1336px) {
    font-size: 13px;
    line-height: 17px;
  }
}
</style>
