<template>
  <modal
    classes="modal-container"
    name="edit-project"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="title-row">
      <div class="section-header">edit project</div>
      <i class="fas fa-times close-modal-button" @click="hideModal"></i>
    </div>
    <div class="value-row">
      <div>Client *</div>
      <el-input v-model="clientName" class="input" disabled></el-input>
    </div>
    <div class="value-row">
      <div>Project Type *</div>
      <el-input v-model="projectType" disabled class="input"></el-input>
    </div>
    <div class="value-row">
      <div>Savings Type *</div>
      <el-select v-model="savingsTypeId" class="input">
        <el-option
          v-for="item in savingsTypeList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>
    <div class="value-row">
      <div>Project Dates *</div>
      <div class="input">
        <el-date-picker
          v-model="effectiveFrom"
          class="date-container"
          type="date"
          format="dd MMM yyyy"
        />
        <el-date-picker
          v-model="effectiveTo"
          class="date-container"
          type="date"
          format="dd MMM yyyy"
        />
      </div>
    </div>
    <div class="value-row">
      <div>Report Dates *</div>
      <div class="input">
        <el-date-picker
          v-model="reportFrom"
          class="date-container"
          type="date"
          format="dd MMM yyyy"
        />
        <el-date-picker
          v-model="reportTo"
          class="date-container"
          type="date"
          format="dd MMM yyyy"
        />
      </div>
    </div>
    <div class="value-row">
      <div>Description</div>
      <el-input v-model="description" type="textarea" class="input"></el-input>
    </div>
    <div class="value-row">
      <div>Project Manager *</div>
      <el-select v-model="projectManagerId" class="input">
        <el-option
          v-for="item in projectManagerList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>
    <div class="value-row">
      <div>Lead Analyst *</div>
      <el-select v-model="leadAnalystId" class="input">
        <el-option
          v-for="item in leadAnalystList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>
    <div class="value-row">
      <div>Data Specialist *</div>
      <el-select v-model="dataSpecialistId" class="input">
        <el-option
          v-for="item in dataSpecialistList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>
    <div class="save-container">
      <button class="button" @click="editProject">SAVE</button>
    </div>
    <SuccessModal
      :hide-modal="hideModal"
      message="Project successfully edited."
    />
    <ErrorModal message="Failed to edit project. Please try again" />
  </modal>
</template>

<script>
import SuccessModal from '@/components/Modals/SuccessModal.vue';
import ErrorModal from '@/components/Modals/ErrorModal.vue';
import { EDIT_PROJECT } from '@/graphql/mutations';
import { GET_PROJECT, GET_CLIENT, GET_PROJECTS } from '@/graphql/queries';
import projectData from '@/data/projectData';
export default {
  name: 'EditProjectModal',
  components: {
    SuccessModal,
    ErrorModal
  },
  data() {
    return {
      clientName: null,
      id: null,
      projectType: null,
      projectTypeId: null,
      savingsTypeId: null,
      effectiveFrom: null,
      effectiveTo: null,
      reportFrom: null,
      reportTo: null,
      description: null,
      projectManagerId: null,
      leadAnalystId: null,
      dataSpecialistId: null,
      projectTypeList: projectData.projectTypeList.slice(),
      projectManagerList: projectData.projectManagerList.slice(),
      leadAnalystList: projectData.leadAnalystList.slice(),
      dataSpecialistList: projectData.dataSpecialistList.slice()
    };
  },
  computed: {
    savingsTypeList: function() {
      const savingsTypeList = projectData.savingsTypeList.slice();
      if (this.projectTypeId === 1) {
        return savingsTypeList.slice(0, 2);
      } else if (this.projectTypeId === 2) {
        return savingsTypeList.slice(1, 3);
      } else if (this.projectTypeId === 3) {
        return savingsTypeList.slice(0, 1);
      }
      return [];
    }
  },
  watch: {
    projectTypeId: function(a, b) {
      if (a && b) this.savingsTypeId = null;
    }
  },
  methods: {
    hideModal() {
      this.$modal.hide('edit-project');
    },
    async editProject() {
      try {
        await this.$apollo.mutate({
          mutation: EDIT_PROJECT,
          variables: {
            id: this.id,
            savingsTypeId: this.savingsTypeId,
            effectiveFrom: this.effectiveFrom,
            effectiveTo: this.effectiveTo,
            reportFrom: this.reportFrom,
            reportTo: this.reportTo,
            description: this.description,
            projectManagerId: this.projectManagerId,
            leadAnalystId: this.leadAnalystId,
            dataSpecialistId: this.dataSpecialistId
          },
          update: (store, data) => {
            const project = data.data.editProject;
            const client = store.readQuery({
              query: GET_CLIENT
            }).client;
            const newData = store.readQuery({
              query: GET_PROJECTS,
              variables: { clientId: client.id }
            });
            const projectIndex = newData.projectList.findIndex(
              findProject => findProject.id === project.id
            );
            newData.projectList[projectIndex] = { ...project };
            store.writeQuery({
              query: GET_PROJECTS,
              variables: { clientId: client.id },
              data: newData
            });
            store.writeQuery({ query: GET_PROJECT, data: { project } });
          }
        });
        this.$modal.show('success');
      } catch (error) {
        this.$modal.show('error');
      }
    },
    beforeOpen(event) {
      const project = event.params.project;
      this.clientName = project.clientName;
      this.id = project.id;
      this.projectType = project.projectType;
      this.projectTypeId = project.projectTypeId;
      this.savingsTypeId = project.savingsTypeId;
      this.effectiveFrom = project.effectiveFrom;
      this.effectiveTo = project.effectiveTo;
      this.reportFrom = project.reportFrom;
      this.reportTo = project.reportTo;
      this.description = project.description;
      this.projectManagerId = project.projectManagerId;
      this.leadAnalystId = project.leadAnalystId;
      this.dataSpecialistId = project.dataSpecialistId;
    },
    beforeClose() {
      this.projectTypeId = null;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';
.title-row {
  margin-bottom: 1em;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.value-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1em;
  .input {
    width: 70%;
    display: flex;
    justify-content: space-between;
    .date-container {
      width: 48%;
    }
  }
}
.save-container {
  display: flex;
  justify-content: center;
  margin-top: 2em;
}
</style>
