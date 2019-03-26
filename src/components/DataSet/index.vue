<template>
  <div>
    <DataNavigation />
    <router-view></router-view>
  </div>
</template>

<script>
import DataNavigation from './DataNavigation';
export default {
  name: 'DataSet',
  components: {
    DataNavigation
  }
};
</script>
