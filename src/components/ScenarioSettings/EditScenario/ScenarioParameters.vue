<template>
  <el-form
    ref="scenarioParams"
    :model="form"
    :rules="rules"
    label-position="left"
    label-width="300px"
    hide-required-asterisk
    class="scenario-params-form"
  >
    <div v-loading="$apollo.loading" class="form-row">
      <el-form-item prop="influenceLevelCd" class="column" label-width="0px">
        <span class="radio-group-title"
          >Preferred carrier influence/compliance</span
        >
        <el-radio-group v-model="form.influenceLevelCd">
          <el-radio
            v-for="influenceLevel in scenarioParameters.influenceLevelList"
            :key="influenceLevel.id"
            :label="influenceLevel.id"
            >{{ influenceLevel.name }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item
        prop="priceInfluenceLevelCd"
        class="column"
        label-width="0px"
      >
        <span class="radio-group-title">Price sensitivity</span>
        <el-radio-group v-model="form.priceInfluenceLevelCd">
          <el-radio
            v-for="priceLevel in scenarioParameters.priceInfluenceLevelList"
            :key="priceLevel.id"
            :label="priceLevel.id"
            >{{ priceLevel.name }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="biasOverride" class="column" label-width="0px">
        <span class="radio-group-title">Traveler bias</span>
        <el-radio-group v-model="form.biasOverride" label="Traveler bias">
          <el-radio
            v-for="biasOverride in scenarioParameters.biasOverrideList"
            :key="biasOverride.id"
            :label="biasOverride.id"
            >{{ biasOverride.name }}</el-radio
          >
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
          prop="segmentIncrease"
          label="Assumed increase/decrease in segments (%)"
        >
          <el-input v-model="form.segmentIncrease" type="number" size="small" />
        </el-form-item>
        <el-form-item
          prop="fareIncrease"
          label="Assumed increase/decrease in fares (%)"
        >
          <el-input v-model="form.fareIncrease" type="number" size="small" />
        </el-form-item>
      </div>
      <div class="form-column">
        <p class="radio-group-title">Advanced features</p>
        <el-checkbox v-model="form.useHistoricalShare"
          >Use historical share instead of predicted share</el-checkbox
        >
        <el-checkbox v-model="form.useHistoricalFares"
          >Use published fares per carrier instead of blended fares</el-checkbox
        >
        <el-checkbox v-model="form.ignoresSmallQsi"
          >Ignore carriers with service less than (%)
          <el-input v-model="form.smallQsiThreshold" type="number" size="small"
        /></el-checkbox>
      </div>
    </div>
    <div class="save-container">
      <button class="button" type="button" @click="validateForm">
        SAVE
      </button>
    </div>
  </el-form>
</template>
<script>
import { GET_SCENARIO_PARAMETERS, GET_SCENARIO } from '@/graphql/queries';
import { UPDATE_SCENARIO_PARAMETERS } from '@/graphql/mutations';
export default {
  name: 'ScenarioParameters',
  components: {},
  props: {
    scenarioId: {
      type: Number,
      default: null
    }
  },
  apollo: {
    scenario: {
      query: GET_SCENARIO,
      variables() {
        return {
          id: this.scenarioId
        };
      },
      result({ data: { scenario } }) {
        const {
          influenceLevelCd,
          priceInfluenceLevelCd,
          biasOverride,
          servedMarketThreshold,
          overlapThreshold,
          segmentIncrease,
          fareIncrease,
          useHistoricalShare,
          useHistoricalFares,
          ignoresSmallQsi,
          smallQsiThreshold
        } = scenario;

        this.form.influenceLevelCd = influenceLevelCd;
        this.form.priceInfluenceLevelCd = priceInfluenceLevelCd;
        this.form.biasOverride = biasOverride;
        this.form.servedMarketThreshold = servedMarketThreshold;
        this.form.overlapThreshold = overlapThreshold;
        this.form.segmentIncrease = segmentIncrease;
        this.form.fareIncrease = fareIncrease;
        this.form.useHistoricalShare = useHistoricalShare;
        this.form.useHistoricalFares = useHistoricalFares;
        this.form.ignoresSmallQsi = ignoresSmallQsi;
        this.form.smallQsiThreshold = smallQsiThreshold;
      }
    },
    scenarioParameters: {
      query: GET_SCENARIO_PARAMETERS
    }
  },
  data() {
    return {
      scenarioParameters: {},
      form: {
        influenceLevelCd: null,
        priceInfluenceLevelCd: null,
        biasOverride: null,
        servedMarketThreshold: null,
        overlapThreshold: null,
        segmentIncrease: null,
        fareIncrease: null,
        useHistoricalShare: false,
        useHistoricalFares: false,
        ignoresSmallQsi: false,
        smallQsiThreshold: null
      },
      rules: {
        influenceLevelCd: [
          {
            required: true,
            message: 'Please select a preferred carrier influence level',
            trigger: 'change'
          }
        ],
        priceInfluenceLevelCd: [
          {
            required: true,
            message: 'Please select a price influence level.',
            trigger: 'change'
          }
        ],
        biasOverride: [
          {
            required: true,
            message: 'Please select a traveler bias adjustment.',
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
    cleanObject(obj) {
      for (let key in obj) {
        if (typeof obj[key] === 'string') {
          obj[key] = Number(obj[key]);
        }
      }
      return obj;
    },
    async saveScenarioParameters() {
      try {
        const cleanedForm = this.cleanObject(this.form);
        await this.$apollo.mutate({
          mutation: UPDATE_SCENARIO_PARAMETERS,
          variables: {
            id: this.scenario.id,
            ...cleanedForm
          },
          refetchQueries: () => [
            {
              query: GET_SCENARIO,
              variables: {
                id: this.scenario.id
              }
            }
          ]
        });
        this.$modal.show('success', {
          message: 'Scenario parameters successfully updated.'
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
.scenario-params-form {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.form-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.5em;
  flex: 1;
  .el-form-item {
    width: 30%;
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
  margin-top: auto;
}
</style>
