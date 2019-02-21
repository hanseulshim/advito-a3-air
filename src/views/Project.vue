<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import { GET_PROJECT } from '@/graphql/queries';
export default {
  name: 'Project',
  data() {
    return {
      project: null
    };
  },
  mounted() {
    if (!this.project.id) this.$router.push('/');
  },
  apollo: {
    project: {
      query: GET_PROJECT
    }
  }
};
</script>
