<template>
  <el-form
    ref="scenarioParams"
    :model="form"
    :rules="rules"
    label-position="left"
    label-width="300px"
    hide-required-asterisk
  >
    <div class="form-row">
      <el-form-item prop="preferredCarrier" class="column" label-width="0px">
        <span class="radio-group-title"
          >Preferred carrier influence/compliance</span
        >
        <el-radio-group v-model="form.preferredCarrier">
          <el-radio :label="1">Little or no influence</el-radio>
          <el-radio :label="2">Minimal influence</el-radio>
          <el-radio :label="3">Medium influence</el-radio>
          <el-radio :label="4">Strong influence</el-radio>
          <el-radio :label="5">Very strong influence</el-radio>
          <el-radio :label="6">Mandate</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="priceSensitivity" class="column" label-width="0px">
        <span class="radio-group-title">Price sensitivity</span>
        <el-radio-group v-model="form.priceSensitivity">
          <el-radio :label="1">Little or no influence</el-radio>
          <el-radio :label="2">Minimal influence</el-radio>
          <el-radio :label="3">Medium influence</el-radio>
          <el-radio :label="4">Strong influence</el-radio>
          <el-radio :label="5">Very strong influence</el-radio>
          <el-radio :label="6">Primary influence</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="travelerBias" class="column" label-width="0px">
        <span class="radio-group-title">Traveler bias</span>
        <el-radio-group v-model="form.travelerBias" label="Traveler bias">
          <el-radio :label="1">Automatically adjust bias</el-radio>
          <el-radio :label="2">Eliminate 20% of residual bias</el-radio>
          <el-radio :label="3">Eliminate 40% of residual bias</el-radio>
          <el-radio :label="4">Eliminate 60% of residual bias</el-radio>
          <el-radio :label="5">Eliminate 80% of residual bias</el-radio>
          <el-radio :label="6">Eliminate all bias effects</el-radio>
        </el-radio-group>
      </el-form-item>
    </div>
    <div class="form-row">
      <div class="form-column">
        <el-form-item
          prop="servedMarketThreshold"
          label="Served Market Threshold (%)"
        >
          <el-input
            v-model="form.servedMarketThreshold"
            type="number"
            size="small"
          />
        </el-form-item>
        <el-form-item prop="overlapThreshold" label="Overlap Threshold (%)">
          <el-input
            v-model="form.overlapThreshold"
            type="number"
            size="small"
          />
        </el-form-item>
        <el-form-item
          prop="segmentDelta"
          label="Assumed increase/decrease in segments (%)"
        >
          <el-input v-model="form.segmentDelta" type="number" size="small" />
        </el-form-item>
        <el-form-item
          prop="fareDelta"
          label="Assumed increase/decrease in fares (%)"
        >
          <el-input v-model="form.faredelta" type="number" size="small" />
        </el-form-item>
      </div>
      <div class="form-column">
        <p class="radio-group-title">Advanced features</p>
        <el-checkbox v-model="form.historicalShares"
          >Use historical share instead of predicted share</el-checkbox
        >
        <el-checkbox v-model="form.publishedFares"
          >Use published fares per carrier instead of blended fares</el-checkbox
        >
        <el-checkbox v-model="form.ignoreCarriers"
          >Ignore carriers with service less than
          <el-input v-model="form.serviceLessThan" type="number" size="small"
        /></el-checkbox>
      </div>
    </div>
    <div class="save-container">
      <button class="button" type="button" @click="saveScenarioParameters">
        SAVE
      </button>
    </div>
  </el-form>
</template>

<script>
export default {
  name: 'ScenarioParameters',
  components: {},
  props: {
    scenario: {
      default: null,
      type: Object
    }
  },
  apollo: {},
  data() {
    return {
      form: {
        preferredCarrier: null,
        priceSensitivity: null,
        travelerBias: null,
        servedMarketThreshold: null,
        overlapThreshold: null,
        segmentDelta: null,
        fareDelta: null,
        historicalShares: false,
        publishedFares: false,
        ignoreCarriers: false,
        serviceLessThan: null
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
  methods: {
    validateForm() {
      this.$refs.scenarioParams.validate(valid => {
        if (valid) {
          this.saveScenarioParameters();
        } else {
          return false;
        }
      });
    },
    saveScenarioParameters() {
      alert('Parameters saved!');
    }
  }
};
</script>
<style scoped lang="scss">
.form-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.5em;
  .el-form-item {
    flex: 1;
  }

  .el-radio-group {
    display: flex;
    flex-direction: column;
    font: inherit;

    .el-radio {
      font: inherit;
      height: 30px;
    }
  }

  .radio-group-title {
    font-weight: 500;
    color: black;
  }

  .form-column {
    margin-right: 5em;
    flex: 1;

    .el-checkbox {
      margin-bottom: 1em;
    }

    .el-form-item {
      margin-bottom: 5px;
    }
  }

  .el-input {
    width: 75px;
  }
}
.save-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3em;
}
</style>
