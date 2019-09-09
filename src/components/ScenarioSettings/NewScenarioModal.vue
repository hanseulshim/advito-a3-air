<template>
  <modal
    classes="modal-container"
    name="new-scenario"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
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
      <el-form-item label="Round *" prop="round">
        <el-select
          v-model="form.round"
          class="select-modal"
          @change="updateRound"
        >
          <el-option
            v-for="item in roundList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="form.description" type="textarea" />
      </el-form-item>
      <el-form-item prop="scenarioTemplate">
        <el-radio-group v-model="form.scenarioTemplate">
          <el-radio :label="1">Initialize a blank scenario</el-radio>
          <el-radio :label="2">Copy parameters from a scenario</el-radio>
          <el-radio :label="3">Copy paramters from another project</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="form.scenarioTemplate === 2 || form.scenarioTemplate === 3"
      >
        <el-select
          v-model="form.scenarioId"
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
// import { GET_SCENARIO_LIST } from '@/graphql/queries';
// import { CONTRACT_LOOKUP } from '@/graphql/constants';
// import { CREATE_SCENARIO } from '@/graphql/mutations';
export default {
  name: 'NewScenarioModal',
  apollo: {},
  data() {
    return {
      form: {
        name: null,
        typeId: null,
        round: null,
        description: null,
        scenarioTemplate: null,
        scenarioId: null
      },
      roundList: [],
      scenarioList: [],
      rules: {
        name: [
          {
            required: true,
            message: 'Please input a scenario name.',
            trigger: 'change'
          }
        ],
        round: [
          {
            required: true,
            message: 'Please input a round.',
            trigger: 'change'
          },
          { type: 'number', message: 'Round must be a number' }
        ],
        scenarioTemplate: [
          {
            required: true,
            message: 'Please select a scenario initialization setting.',
            trigger: 'change'
          }
        ]
      }
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('new-scenario');
    },
    validateForm() {
      this.$refs.newScenario.validate(valid => {
        if (valid) {
          this.createContract();
        } else {
          return false;
        }
      });
    },
    async createContract() {
      try {
        await this.$apollo.mutate({
          mutation: CREATE_CONTRACT,
          variables: {
            ...this.form,
            projectId: this.projectId
          },
          update: (store, { data: { createContract } }) => {
            const query = {
              query: GET_CONTRACT_LIST,
              variables: {
                projectId: this.projectId
              }
            };
            const data = store.readQuery(query);
            data.contractList.push(createContract);
            store.writeQuery({
              ...query,
              data
            });
          }
        });
        this.$modal.show('success', {
          message: 'Contract successfully created.',
          name: 'new-contract'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    updateType(value) {
      if (value !== CONTRACT_LOOKUP.PROPOSAL) {
        this.form.round = null;
      }
    },
    beforeOpen(event) {
      this.clientId = event.params.clientId;
      this.projectId = event.params.projectId;
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
