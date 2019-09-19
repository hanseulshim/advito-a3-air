<template>
  <div class="container">
    <el-form
      ref="scenarioName"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="150px"
      hide-required-asterisk
      class="scenario-name-form"
    >
      <el-form-item label="Name *" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Round *" prop="shortName">
        <el-input v-model="form.shortName" />
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="form.description" type="textarea" />
      </el-form-item>
      <div class="save-container-flex">
        <button class="button" type="button" @click="validateForm">SAVE</button>
      </div>
    </el-form>
  </div>
</template>
<script>
import { UPDATE_SCENARIO } from '@/graphql/mutations';
import { GET_SCENARIO_LIST } from '@/graphql/queries';
export default {
  name: 'ScenarioName',
  components: {},
  apollo: {},
  props: {
    scenario: {
      default: null,
      type: Object
    }
  },
  data() {
    return {
      form: {
        name: null,
        shortName: null,
        description: null
      },
      rules: {
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
            message: 'Please input a scenario round.',
            trigger: 'change'
          }
        ]
      }
    };
  },
  mounted() {
    this.form.name = this.scenario.name;
    this.form.shortName = this.scenario.shortName;
    this.form.description = this.scenario.description;
  },
  methods: {
    validateForm() {
      this.$refs.scenarioName.validate(valid => {
        if (valid) {
          this.editScenario();
        } else {
          return false;
        }
      });
    },
    async editScenario() {
      try {
        await this.$apollo.mutate({
          mutation: UPDATE_SCENARIO,
          variables: {
            id: this.scenario.id,
            ...this.form
          }
        });
        this.$modal.show('success', {
          message: 'Scenario successfully updated'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    }
  }
};
</script>
<style scoped lang="scss">
.scenario-name-form {
  display: flex;
  flex-direction: column;
  flex: 1;

  .el-form-item {
    max-width: 50%;
  }
}
.save-container-flex {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
}
</style>
