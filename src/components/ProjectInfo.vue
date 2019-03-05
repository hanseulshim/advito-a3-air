<template>
  <div class="project-info-container">
    <div class="project-name">{{ project.name }}</div>
    <div class="project-column">
      <div class="project-line">
        Project Dates:
        <span class="project-value">
          {{ formatDate(project.effectiveFrom) }} —
          {{ formatDate(project.effectiveTo) }}
        </span>
      </div>
      <div class="project-line">
        Report Dates:
        <span class="project-value">
          {{ formatDate(project.reportFrom) }} —
          {{ formatDate(project.reportTo) }}
        </span>
      </div>
      <div class="project-line">
        Savings Type:
        <span class="project-value">{{ project.savingsType }}</span>
      </div>
    </div>
    <div class="project-column">
      <div class="project-line">
        Default Report Currency:
        <span class="project-value">{{ project.savingsType }}</span>
      </div>
      <div class="project-line">
        Default Distance Unit:
        <span class="project-value">{{ project.savingsType }}</span>
      </div>
      <div class="project-line">
        Description:
        <span class="project-value">{{ project.description }}</span>
      </div>
    </div>
    <div class="project-column">
      <div class="project-line">
        Project Manager:
        <span class="project-value">{{ project.projectManagerName }}</span>
      </div>
      <div class="project-line">
        Lead Analyst:
        <span class="project-value">{{ project.leadAnalystName }}</span>
      </div>
      <div class="project-line">
        Data Specialist:
        <span class="project-value">{{ project.dataSpecialistName }}</span>
      </div>
      <div v-if="project.division" class="project-line">
        Division:
        <span class="project-value">{{ project.division }}</span>
      </div>
    </div>
    <div class="project-column icon-container">
      <i
        class="fas fa-pencil-alt project-info-icon"
        @click="editProject(project)"
      ></i>
      <i class="fas fa-info project-info-icon" @click="showInfoModal" />
    </div>
    <EditProjectModal />
    <InfoModal />
  </div>
</template>

<script>
import { GET_PROJECT } from '@/graphql/queries';
import { formatDate } from '@/helper';
import EditProjectModal from '@/components/AirManager/EditProjectModal';
import InfoModal from '@/components/Modals/InfoModal';
export default {
  name: 'ProjectInfo',
  components: {
    EditProjectModal,
    InfoModal
  },
  apollo: {
    project: {
      query: GET_PROJECT
    }
  },
  data() {
    return {
      project: null
    };
  },
  methods: {
    formatDate(date) {
      return formatDate(date);
    },
    editProject(project) {
      this.$modal.show('edit-project', { project });
    },
    showInfoModal() {
      this.$modal.show('info');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';
.project-info-container {
  display: grid;
  grid-template-areas: 'projectName column1 column2 column3 buttons';
  grid-template-columns: 25% auto auto auto 75px;
  column-gap: 1em;
  margin-bottom: 2em;
}
.project-name {
  grid-area: projectName;
  font-size: 1.5em;
  align-self: center;
  color: $tradewind;
}
.project-column {
  padding-left: 1em;
  border-left: 1px solid $gray-nurse;
}
.project-line {
  margin-top: 5px;
}
.project-value {
  color: $black;
}
.icon-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.project-info-icon {
  color: $tradewind;
  cursor: pointer;
  align-self: center;
  margin: 5px 0;
  &.fa-info {
    border: 1px solid $tradewind;
    &:hover {
      background: $tradewind;
    }
  }
}
</style>
