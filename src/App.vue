<template>
  <div v-if="password === 'air2019'">
    <Sidebar />
    <div id="app">
      <Header />
      <router-view />
    </div>
  </div>
  <div v-else class="validation-container">
    <el-input v-model="password" placeholder="Please input password"></el-input>
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
  },
  data() {
    return {
      password: ''
    };
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

.validation-container {
  width: 300px;
  margin: auto;
  margin-top: 5em;
}
</style>
