<template>
  <div class="project-info-container">
    <div class="project-name">{{ project.name }}</div>
    <div>
      <div>Division: {{ project.division }}</div>
    </div>
    <div>Column 2</div>
    <div>Column 3</div>
    <div>buttons</div>
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
@import '@/styles/global.scss';
.project-info-container {
  display: grid;
  grid-template-areas: 'projectName column1 column2 column3 buttons';
  grid-template-columns: auto auto auto auto 75px;
  column-gap: 1em;
  margin-bottom: 2em;
}
.project-name {
  grid-area: projectName;
  font-size: 1.5em;
  color: $tradewind;
}
</style>
