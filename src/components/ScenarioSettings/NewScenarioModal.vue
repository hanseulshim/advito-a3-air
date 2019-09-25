<template>
  <modal
    classes="modal-container"
    name="new-scenario"
    height="auto"
    @before-close="beforeClose"
    @before-open="beforeOpen"
  >
    <el-form
      ref="newScenario"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="150px"
      hide-required-asterisk
    >
      <div class="title-row space-between">
        <div class="section-header">new scenario</div>
        <el-tooltip effect="dark" content="Close Modal" placement="top">
          <i class="fas fa-times close-modal-button" @click="hideModal"></i>
        </el-tooltip>
      </div>
      <el-form-item label="Name *" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Round *" prop="shortName">
        <el-input v-model="form.shortName" />
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="form.description" type="textarea" />
      </el-form-item>
      <el-form-item prop="initializationType">
        <el-radio-group
          v-model="form.initializationType"
          @change="restoreScenarioList"
        >
          <el-radio
            v-for="type in scenarioTypeList"
            :key="type.id"
            :label="type.id"
            >{{ type.name }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="form.initializationType === 94"
        prop="initializationProjectId"
      >
        <el-select
          v-model="form.initializationProjectId"
          class="select-modal"
          placeholder="Select Project"
          @change="getScenariosByProject"
        >
          <el-option
            v-for="item in projectList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="
          form.initializationType === 93 ||
            (form.initializationType === 94 && form.initializationProjectId)
        "
        prop="initializationScenarioId"
      >
        <el-select
          v-model="form.initializationScenarioId"
          class="select-modal"
          placeholder="Select Scenario"
        >
          <el-option
            v-for="item in scenarioList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
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
  GET_SCENARIO_LIST,
  GET_SCENARIO_TYPE_LIST,
  GET_PROJECTS
} from '@/graphql/queries';
import { SCENARIO_LOOKUP } from '@/graphql/constants';
import { CREATE_SCENARIO } from '@/graphql/mutations';
export default {
  name: 'NewScenarioModal',
  apollo: {
    projectList: {
      query: GET_PROJECTS,
      variables() {
        return {
          clientId: this.client.id,
          userId: this.user.id
        };
      },
      skip() {
        return !this.client || !this.user;
      }
    },
    scenarioTypeList: {
      query: GET_SCENARIO_TYPE_LIST
    }
  },
  data() {
    return {
      user: null,
      client: null,
      project: null,
      projectList: [],
      scenarioList: [],
      scenarioTypeList: [],
      SCENARIO_LOOKUP,
      form: {
        name: null,
        shortName: null,
        description: null,
        initializationType: null,
        initializationProjectId: null,
        initializationScenarioId: null
      }
    };
  },
  computed: {
    rules() {
      return {
        name: [
          {
            required: true,
            message: 'Please input a scenario name.',
            trigger: 'change'
          }
        ],
        shortName: [
          {
            required: true,
            message: 'Please input a round.',
            trigger: 'change'
          }
        ],
        initializationType: [
          {
            required: true,
            message: 'Please select a scenario initialization setting.',
            trigger: 'change'
          }
        ],
        initializationProjectId: [
          {
            required:
              this.form.initializationType === SCENARIO_LOOKUP.INIT_COPY_PROJECT
                ? true
                : false,
            message: 'Please make a selection.',
            trigger: 'change'
          }
        ],
        initializationScenarioId: [
          {
            required:
              this.form.initializationType ===
                SCENARIO_LOOKUP.INIT_COPY_SCENARIO ||
              SCENARIO_LOOKUP.INIT_COPY_PROJECT
                ? true
                : false,
            message: 'Please make a selection.',
            trigger: 'change'
          }
        ]
      };
    }
  },
  methods: {
    hideModal() {
      this.$modal.hide('new-scenario');
    },
    validateForm() {
      this.$refs.newScenario.validate(valid => {
        if (valid) {
          this.createScenario();
        } else {
          return false;
        }
      });
    },
    async restoreScenarioList(initType) {
      if (initType === 93) {
        try {
          const {
            data: { scenarioList }
          } = await this.$apollo.query({
            query: GET_SCENARIO_LIST,
            variables: {
              projectId: this.project.id
            }
          });
          this.scenarioList = scenarioList;
        } catch (error) {
          this.$modal.show('error', {
            message: error.message
          });
        }
      }
    },
    async getScenariosByProject(projectId) {
      try {
        const {
          data: { scenarioList }
        } = await this.$apollo.query({
          query: GET_SCENARIO_LIST,
          variables: {
            projectId
          }
        });
        this.scenarioList = scenarioList;
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    async createScenario() {
      try {
        await this.$apollo.mutate({
          mutation: CREATE_SCENARIO,
          variables: {
            projectId: this.project.id,
            ...this.form
          },
          refetchQueries: () => [
            {
              query: GET_SCENARIO_LIST,
              variables: {
                projectId: this.project.id
              }
            }
          ]
        });
        this.$modal.show('success', {
          message: 'Scenario successfully created.',
          name: 'new-scenario'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    beforeOpen(e) {
      const { user, client, project } = e.params;
      this.user = user;
      this.client = client;
      this.project = project;
    },
    beforeClose() {
      Object.keys(this.form).forEach(key => {
        this.form[key] = null;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import '@/styles/global.scss';
.el-radio-group {
  display: flex;
  flex-direction: column;
  font: inherit;

  .el-radio {
    font: inherit;
  }
}
</style>
