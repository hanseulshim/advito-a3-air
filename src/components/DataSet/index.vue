<template>
  <div>
    <Navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from './Navigation';
export default {
  name: 'DataSet',
  components: {
    Navigation
  }
};
</script>
