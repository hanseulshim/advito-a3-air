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
      <el-form-item label="Round *" prop="round">
        <el-select v-model="form.round">
          <el-option
            v-for="item in roundList"
            :key="item.id"
            :label="item.label"
            :value="item.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="form.description" type="textarea" />
      </el-form-item>
    </el-form>
    <div class="save-container-flex">
      <button class="button" type="button" @click="validateForm">SAVE</button>
    </div>
  </div>
</template>

<script>
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
      roundList: [
        { id: 1, label: 'Baseline' },
        { id: 2, label: 'P1' },
        { id: 3, label: 'P2' }
      ],
      form: {
        name: null,
        round: null,
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
        round: [
          {
            required: true,
            message: 'Please select a scenario round.',
            trigger: 'change'
          }
        ]
      }
    };
  },
  mounted() {
    this.form.name = this.scenario.scenarioName;
    this.form.round = this.scenario.round;
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
    editScenario() {
      alert('form successfully saved');
    }
  }
};
</script>
<style scoped lang="scss">
.scenario-name-form {
  width: 50%;
}
.save-container-flex {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5em;
}
</style>
