<template>
  <modal
    classes="modal-container"
    name="new-project"
    height="auto"
    @before-close="beforeClose"
  >
    <el-form
      ref="newProjectForm"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="150px"
      hide-required-asterisk
    >
      <div class="title-row">
        <div class="section-header">new project</div>
        <i class="fas fa-times close-modal-button" @click="hideModal"></i>
      </div>
      <el-form-item label="Client *" prop="clientId">
        <el-select v-model="form.clientId" class="select-modal">
          <el-option
            v-for="item in clientList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Project Type *" prop="projectTypeId">
        <el-select v-model="form.projectTypeId" class="select-modal">
          <el-option
            v-for="item in projectTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Savings Type *" prop="savingsTypeId">
        <el-select v-model="form.savingsTypeId" class="select-modal">
          <el-option
            v-for="item in savingsTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Project Dates *" required>
        <div class="date-picker-container">
          <el-form-item prop="effectiveFrom" class="date-picker-item">
            <el-date-picker
              v-model="form.effectiveFrom"
              type="date"
              format="dd MMM yyyy"
              class="date-picker"
            />
          </el-form-item>
          <el-form-item prop="effectiveTo" class="date-picker-item">
            <el-date-picker
              v-model="form.effectiveTo"
              type="date"
              format="dd MMM yyyy"
              class="date-picker"
            />
          </el-form-item>
        </div>
      </el-form-item>
      <el-form-item label="Report Dates *">
        <div class="date-picker-container">
          <el-form-item prop="reportFrom" class="date-picker-item">
            <el-date-picker
              v-model="form.reportFrom"
              type="date"
              format="dd MMM yyyy"
              class="date-picker"
            />
          </el-form-item>
          <el-form-item prop="reportTo" class="date-picker-item">
            <el-date-picker
              v-model="form.reportTo"
              type="date"
              format="dd MMM yyyy"
              class="date-picker"
            />
          </el-form-item>
        </div>
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="form.description" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="Project Manager *" prop="projectManagerId">
        <el-select v-model="form.projectManagerId" class="select-modal">
          <el-option
            v-for="item in projectManagerList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Lead Analyst *" prop="leadAnalystId">
        <el-select v-model="form.leadAnalystId" class="select-modal">
          <el-option
            v-for="item in leadAnalystList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Data Specialist *" prop="dataSpecialistId">
        <el-select v-model="form.dataSpecialistId" class="select-modal">
          <el-option
            v-for="item in dataSpecialistList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="save-container">
        <button class="button" @click="validateForm">SAVE</button>
      </el-form-item>
    </el-form>
    <SuccessModal
      :hide-modal="hideModal"
      message="Project successfully created."
    />
    <ErrorModal message="Failed to create project. Please try again" />
  </modal>
</template>

<script>
import SuccessModal from '@/components/Modals/SuccessModal.vue';
import ErrorModal from '@/components/Modals/ErrorModal.vue';
import { GET_PROJECTS, GET_CLIENT, GET_CLIENTS } from '@/graphql/queries';
import { ADD_PROJECT } from '@/graphql/mutations';
import projectData from '@/data/projectData';
export default {
  name: 'NewProjectModal',
  components: {
    SuccessModal,
    ErrorModal
  },
  apollo: {
    clientList: {
      query: GET_CLIENTS
    }
  },
  data() {
    return {
      form: {
        clientId: null,
        projectTypeId: null,
        savingsTypeId: null,
        effectiveFrom:
          'Mon Jan 01 2018 00:00:00 GMT-0500 (Eastern Standard Time)',
        effectiveTo:
          'Mon Dec 31 2018 00:00:00 GMT-0500 (Eastern Standard Time)',
        reportFrom: 'Mon Jan 01 2018 00:00:00 GMT-0500 (Eastern Standard Time)',
        reportTo: 'Mon Dec 31 2018 00:00:00 GMT-0500 (Eastern Standard Time)',
        description: null,
        projectManagerId: null,
        leadAnalystId: null,
        dataSpecialistId: null
      },
      rules: {
        clientId: [
          {
            required: true,
            message: 'Please select a client',
            trigger: 'change'
          }
        ],
        projectTypeId: [
          {
            required: true,
            message: 'Please select a project type',
            trigger: 'change'
          }
        ],
        savingsTypeId: [
          {
            required: true,
            message: 'Please select a savings type',
            trigger: 'change'
          }
        ],
        effectiveFrom: [
          {
            required: true,
            message: 'Please select a project start date',
            trigger: 'change'
          }
        ],
        effectiveTo: [
          {
            required: true,
            message: 'Please select a project end date',
            trigger: 'change'
          }
        ],
        reportFrom: [
          {
            required: true,
            message: 'Please select a report start date',
            trigger: 'change'
          }
        ],
        reportTo: [
          {
            required: true,
            message: 'Please select a report end date',
            trigger: 'change'
          }
        ],
        projectManagerId: [
          {
            required: true,
            message: 'Please select a project manager',
            trigger: 'change'
          }
        ],
        leadAnalystId: [
          {
            required: true,
            message: 'Please select a lead analyst',
            trigger: 'change'
          }
        ],
        dataSpecialistId: [
          {
            required: true,
            message: 'Please select a data specialist',
            trigger: 'change'
          }
        ]
      },
      clientList: [],
      projectTypeList: projectData.projectTypeList.slice(),
      projectManagerList: projectData.projectManagerList.slice(),
      leadAnalystList: projectData.leadAnalystList.slice(),
      dataSpecialistList: projectData.dataSpecialistList.slice()
    };
  },
  computed: {
    savingsTypeList: function() {
      const savingsTypeList = projectData.savingsTypeList.slice();
      if (this.form.projectTypeId === 1) {
        return savingsTypeList.slice(0, 2);
      } else if (this.form.projectTypeId === 2) {
        return savingsTypeList.slice(1, 3);
      } else if (this.form.projectTypeId === 3) {
        return savingsTypeList.slice(0, 1);
      }
      return [];
    }
  },
  watch: {
    projectTypeId: function() {
      this.form.savingsTypeId = null;
    }
  },
  methods: {
    hideModal() {
      this.$modal.hide('new-project');
    },
    validateForm() {
      this.$refs['newProjectForm'].validate(valid => {
        if (valid) {
          this.addProject();
        } else {
          return false;
        }
      });
    },
    async addProject() {
      try {
        await this.$apollo.mutate({
          mutation: ADD_PROJECT,
          variables: {
            ...this.form
          },
          update: (store, data) => {
            const project = data.data.addProject;
            const client = store.readQuery({
              query: GET_CLIENT
            }).client;
            const newData = store.readQuery({
              query: GET_PROJECTS,
              variables: { clientId: client.id }
            });
            newData.projectList.push(project);
            store.writeQuery({
              query: GET_PROJECTS,
              variables: { clientId: client.id },
              data: newData
            });
          }
        });
        this.$modal.show('success');
      } catch (error) {
        this.$modal.show('error');
      }
    },
    beforeClose() {
      this.form.clientId = null;
      this.form.projectTypeId = null;
      this.form.savingsTypeId = null;
      this.form.effectiveFrom =
        'Mon Jan 01 2018 00:00:00 GMT-0500 (Eastern Standard Time)';
      this.form.effectiveTo =
        'Mon Dec 31 2018 00:00:00 GMT-0500 (Eastern Standard Time)';
      this.form.reportFrom =
        'Mon Jan 01 2018 00:00:00 GMT-0500 (Eastern Standard Time)';
      this.form.reportTo =
        'Mon Dec 31 2018 00:00:00 GMT-0500 (Eastern Standard Time)';
      this.form.description = null;
      this.form.projectManagerId = null;
      this.form.leadAnalystId = null;
      this.form.dataSpecialistId = null;
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
</style>
