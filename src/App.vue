<template>
  <div id="app">
    <router-view />
    <Modals />
  </div>
</template>

<script>
import Modals from '@/components/Modals';

export default {
  name: 'App',
  components: {
    Modals
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
