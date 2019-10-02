<template>
  <div class="project-info-container sub-content">
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
        <span class="project-value">{{ project.savingsTypeName }}</span>
      </div>
    </div>
    <div class="project-column">
      <div class="project-line">
        Default Report Currency:
        <span class="project-value">{{ project.currencyName }}</span>
      </div>
      <div class="project-line">
        Default Distance Unit:
        <span class="project-value">{{ project.distanceUnitName }}</span>
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
      <el-tooltip effect="dark" content="Edit Project" placement="top">
        <i
          class="fas fa-pencil-alt project-info-icon"
          @click="editProject(project)"
        />
      </el-tooltip>
      <el-tooltip effect="dark" :content="path" placement="top">
        <i class="fas fa-info project-info-icon" @click="showInfoModal" />
      </el-tooltip>
    </div>
    <EditProjectModal />
  </div>
</template>

<script>
import { GET_PROJECT } from '@/graphql/queries';
import { formatDate } from '@/helper';
import EditProjectModal from '@/components/AirManager/EditProjectModal';
export default {
  name: 'ProjectInfo',
  components: {
    EditProjectModal
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
  computed: {
    path() {
      const path = this.$route.path;
      if (path.includes('program-settings')) {
        return 'Show Settings Info';
      } else if (path.includes('data')) {
        return 'Show Data Info';
      } else if (path.includes('pricing-terms')) {
        return 'Show Pricing Terms Info';
      } else if (path.includes('contracts')) {
        return 'Show Contracts Info';
      }
      return 'Settings';
    }
  },
  methods: {
    formatDate(date) {
      return formatDate(date);
    },
    editProject(project) {
      this.$modal.show('edit-project', { project });
    },
    showInfoModal() {
      this.$modal.show('info', {
        source:
          'https://a3-upload-pdf.s3.us-east-2.amazonaws.com/Advito_Help_Contracts.pdf'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';
.project-info-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3em;
  color: $dove-gray;
}
.project-name {
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
