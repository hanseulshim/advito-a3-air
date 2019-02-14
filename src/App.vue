<template>
  <div id="app">
    <router-view/>
  </div>
</template>

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
  padding: 2em 4em;
  @media (max-width: 1336px) {
    font-size: 13px;
    line-height: 17px;
  }
}
</style>
