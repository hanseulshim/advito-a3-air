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
      <div class="title-row space-between">
        <div class="section-header">new project</div>
        <el-tooltip effect="dark" content="Close Modal" placement="top">
          <i class="fas fa-times close-modal-button" @click="hideModal"></i>
        </el-tooltip>
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
      <el-form-item label="Project Dates *">
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
      <el-form-item label="Currency *" prop="currencyId">
        <el-select v-model="form.currencyId" class="select-modal">
          <el-option
            v-for="item in currencyList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Distance Unit *" prop="distanceUnitId">
        <el-select v-model="form.distanceUnitId" class="select-modal">
          <el-option
            v-for="item in distanceUnitList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="save-container">
        <button class="button" type="button" @click="validateForm">SAVE</button>
      </el-form-item>
    </el-form>
  </modal>
</template>

<script>
import {
  GET_PROJECTS,
  GET_CLIENT,
  GET_CLIENTS,
  GET_CURRENCY_LIST,
  GET_DISTANCE_UNIT_LIST,
  GET_PROJECT_MANAGER_LIST,
  GET_LEAD_ANALYST_LIST,
  GET_DATA_SPECIALIST_LIST,
  GET_PROJECT_TYPE_LIST,
  GET_SAVINGS_TYPE_LIST
} from '@/graphql/queries';
import { ADD_PROJECT } from '@/graphql/mutations';
export default {
  name: 'NewProjectModal',
  apollo: {
    clientList: {
      query: GET_CLIENTS
    },
    currencyList: {
      query: GET_CURRENCY_LIST
    },
    distanceUnitList: {
      query: GET_DISTANCE_UNIT_LIST
    },
    projectManagerList: {
      query: GET_PROJECT_MANAGER_LIST,
      variables() {
        return {
          clientId: this.form.clientId
        };
      }
    },
    leadAnalystList: {
      query: GET_LEAD_ANALYST_LIST,
      variables() {
        return {
          clientId: this.form.clientId
        };
      }
    },
    dataSpecialistList: {
      query: GET_DATA_SPECIALIST_LIST,
      variables() {
        return {
          clientId: this.form.clientId
        };
      }
    },
    projectTypeList: {
      query: GET_PROJECT_TYPE_LIST
    },
    savingsTypeList: {
      query: GET_SAVINGS_TYPE_LIST
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
        dataSpecialistId: null,
        currencyId: null,
        distanceUnitId: null
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
        ],
        currencyId: [
          {
            required: true,
            message: 'Please select a currency',
            trigger: 'change'
          }
        ],
        distanceUnitId: [
          {
            required: true,
            message: 'Please select a distance unit',
            trigger: 'change'
          }
        ]
      },
      clientList: [],
      currencyList: [],
      distanceUnitList: [],
      projectManagerList: [],
      leadAnalystList: [],
      dataSpecialistList: [],
      projectTypeList: [],
      savingsTypeList: []
    };
  },
  watch: {
    projectTypeId() {
      this.form.savingsTypeId = null;
    }
  },
  methods: {
    hideModal() {
      this.$modal.hide('new-project');
    },
    validateForm() {
      this.$refs.newProjectForm.validate(valid => {
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
        this.$modal.show('success', {
          message: 'Project successfully created.',
          name: 'new-project'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: 'Failed to create project. Please try again.'
        });
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
