<template>
  <div>
    <Sidebar />
    <div id="app">
      <Header />
      <router-view />
    </div>
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
@import '@/styles/global.scss';
body {
  margin: 0;
  padding: 0;
  background: $alabaster;
  color: $dove-gray;
  font-family: 'Rubik', sans-serif;
  font-weight: 300;
  font-size: 16px;
  line-height: 20px;
}

#app {
  display: grid;
  padding: 2em 4em;
  font-family: 'Rubik', sans-serif;
  max-width: 1600px;
  margin: auto;
  display: flex;
  flex-direction: column;
  @media (max-width: 1336px) {
    font-size: 13px;
    line-height: 17px;
  }
}
</style>
