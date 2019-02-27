<template>
  <div class="project-info-container">
    <div>{{ project.name }}</div>
  </div>
</template>

<script>
import { GET_PROJECT } from '@/graphql/queries';
export default {
  name: 'ProjectInfo',
  apollo: {
    project: {
      query: GET_PROJECT
    }
  },
  data() {
    return {
      project: null
    };
  }
};
</script>

<style lang="scss" scoped>
.project-info-container {
  display: grid;
  grid-template-areas: 'logo . . . addy' 'navigation navigation . . .';
  grid-template-columns: 25% 17% 17% auto 75px;
  row-gap: 1em;
  column-gap: 1em;
  align-items: flex-end;
  margin-bottom: 2em;
}
</style>
