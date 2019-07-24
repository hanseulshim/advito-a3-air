<template>
  <modal
    classes="modal-container"
    name="edit-project"
    height="auto"
    @before-open="beforeOpen"
  >
    <el-form
      ref="editProjectForm"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="150px"
      hide-required-asterisk
    >
      <div class="title-row space-between">
        <div class="section-header">edit project</div>
        <el-tooltip effect="dark" content="Close Modal" placement="top">
          <i class="fas fa-times close-modal-button" @click="hideModal"></i>
        </el-tooltip>
      </div>
      <el-form-item label="Client *">
        <el-input v-model="clientName" disabled></el-input>
      </el-form-item>
      <el-form-item label="Project Type">
        <el-input v-model="projectTypeName" disabled></el-input>
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
        <el-select
          v-model="form.projectManagerId"
          class="select-modal"
          filterable
        >
          <el-option
            v-for="item in projectManagerList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Lead Analyst *" prop="leadAnalystId">
        <el-select v-model="form.leadAnalystId" class="select-modal" filterable>
          <el-option
            v-for="item in leadAnalystList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Data Specialist *" prop="dataSpecialistId">
        <el-select
          v-model="form.dataSpecialistId"
          class="select-modal"
          filterable
        >
          <el-option
            v-for="item in dataSpecialistList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Currency *" prop="currencyId">
        <el-select v-model="form.currencyId" filterable class="select-modal">
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
import { EDIT_PROJECT } from '@/graphql/mutations';
import {
  GET_CURRENCY_LIST,
  GET_DISTANCE_UNIT_LIST,
  GET_PROJECT_MANAGER_LIST,
  GET_LEAD_ANALYST_LIST,
  GET_DATA_SPECIALIST_LIST,
  GET_PROJECT_TYPE_LIST,
  GET_SAVINGS_TYPE_LIST
} from '@/graphql/queries';
export default {
  name: 'EditProjectModal',
  apollo: {
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
          clientId: this.clientId
        };
      }
    },
    leadAnalystList: {
      query: GET_LEAD_ANALYST_LIST,
      variables() {
        return {
          clientId: this.clientId
        };
      }
    },
    dataSpecialistList: {
      query: GET_DATA_SPECIALIST_LIST,
      variables() {
        return {
          clientId: this.clientId
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
        id: null,
        savingsTypeId: null,
        effectiveFrom: null,
        effectiveTo: null,
        reportFrom: null,
        reportTo: null,
        description: null,
        projectManagerId: null,
        leadAnalystId: null,
        dataSpecialistId: null,
        currencyId: null,
        distanceUnitId: null
      },
      rules: {
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
      projectTypeName: null,
      projectTypeId: null,
      clientName: null,
      clientId: null,
      currencyList: [],
      distanceUnitList: [],
      projectManagerList: [],
      leadAnalystList: [],
      dataSpecialistList: [],
      projectTypeList: [],
      savingsTypeList: []
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('edit-project');
    },
    validateForm() {
      this.$refs.editProjectForm.validate(valid => {
        if (valid) {
          this.editProject();
        } else {
          return false;
        }
      });
    },
    async editProject() {
      try {
        await this.$apollo.mutate({
          mutation: EDIT_PROJECT,
          variables: {
            ...this.form
          }
        });
        this.$modal.show('success', {
          message: 'Project successfully edited.',
          name: 'edit-project'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: 'Failed to edit project. Please try again.'
        });
      }
    },
    beforeOpen(event) {
      const project = event.params.project;
      this.clientName = project.clientName;
      this.clientId = project.clientId;
      this.projectTypeName = project.projectTypeName;
      this.projectTypeId = project.projectTypeId;
      this.form.id = project.id;
      this.form.savingsTypeId = project.savingsTypeId;
      this.form.effectiveFrom = project.effectiveFrom;
      this.form.effectiveTo = project.effectiveTo;
      this.form.reportFrom = project.reportFrom;
      this.form.reportTo = project.reportTo;
      this.form.description = project.description;
      this.form.projectManagerId = project.projectManagerId;
      this.form.leadAnalystId = project.leadAnalystId;
      this.form.dataSpecialistId = project.dataSpecialistId;
      this.form.currencyId = project.currencyId;
      this.form.distanceUnitId = project.distanceUnitId;
    }
  }
};
</script>
