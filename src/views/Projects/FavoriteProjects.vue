<template>
  <div class="favorite-container">
    <div
      v-for="project in favoriteProjectList"
      :key="project.id"
      class="favorite-project"
    >
      <div class="favorite-project-main">
        <div class="title-row title">
          <span>{{ project.clientName }} {{ project.name }}</span>
          <i class="fas fa-times"></i>
        </div>
        <div class="value-row">
          <span>Processed Date</span>
          <span></span>
        </div>
        <div class="value-row">
          <span>Date Range</span>
          <span
            >{{ formatDate(project.effectiveFrom) }} —
            {{ formatDate(project.effectiveTo) }}</span
          >
        </div>
        <div class="value-row">
          <span>Savings Type</span>
          <span>{{ project.savingsType }}</span>
        </div>
        <div class="value-row">
          <span>Project Manager</span>
          <span>{{ project.projectManagerName }}</span>
        </div>
        <div class="value-row">
          <span>Lead Analyst</span>
          <span>{{ project.leadAnalystName }}</span>
        </div>
        <div class="value-row">
          <span>Data Specialist</span>
          <span>{{ project.dataSpecialistName }}</span>
        </div>
        <div class="description">
          {{ project.description }}
        </div>
      </div>
      <div class="favorite-project-footer">
        <span>{{ project.progress }}</span>
        <div>
          <i class="fas fa-pencil-alt"></i>
          <i class="fas fa-trash-alt"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/helper';
export default {
  name: 'FavoriteProjects',
  props: {
    favoriteProjectList: {
      type: Array,
      required: true
    }
  },
  methods: {
    formatDate(date) {
      return formatDate(date);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';
.favorite-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 1em;
  row-gap: 1em;
  margin-top: 2em;
}
.favorite-project {
  border: 1px solid $gray-nurse;
  border-radius: 10px;
  font-size: 0.8em;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.favorite-project-main {
  padding: 1em;
}
.title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 1em;
  border-bottom: 1px solid $gray-nurse;
}
.fa-times {
  color: $tree-poppy;
  margin-bottom: 1em;
}
.fas {
  cursor: pointer;
}
.value-row {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid $gray-nurse;
}
.description {
  margin: 1em 0;
}
.favorite-project-footer {
  padding: 1em;
  background: $gray-nurse;
  display: flex;
  justify-content: space-between;
  .fa-trash-alt {
    margin-left: 10px;
  }
}
</style>
