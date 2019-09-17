<template>
  <el-form
    ref="tripDistribution"
    :model="form"
    label-position="left"
    label-width="75px"
    hide-required-asterisk
  >
    <div class="form-row">
      <el-form-item label="Market *" prop="market" class="flex-3">
        <el-select v-model="form.market" prop="market">
          <el-option
            v-for="market in markets"
            :key="market"
            :label="market"
            :value="market"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Sector" class="flex-2">
        <el-input v-model="form.sector" disabled />
      </el-form-item>
    </div>
    <div class="form-row">
      <div class="form-column">
        <span class="form-title">Booked In</span>
        <el-checkbox v-model="form.allScenarios" @change="handleCheckAllFares"
          >All Fare Categories</el-checkbox
        >
        <el-checkbox v-model="form.firstClass" class="tabbed"
          >First Class</el-checkbox
        >
        <el-checkbox v-model="form.businessClass" class="tabbed"
          >Business Class</el-checkbox
        >
        <el-checkbox v-model="form.unrestrictedEconomy" class="tabbed"
          >Unrestricted Economy</el-checkbox
        >
        <el-checkbox v-model="form.restrictedEconomy" class="tabbed"
          >Restricted Economy</el-checkbox
        >
        <el-checkbox v-model="form.leisureFares" class="tabbed"
          >Leisure Fares</el-checkbox
        >
      </div>
      <div class="form-column">
        <span class="form-title"> Point Of Sale</span>
        <el-checkbox v-model="form.allPOS"
          >All Point of Sale Countries</el-checkbox
        >
      </div>
    </div>
  </el-form>
</template>

<script>
export default {
  name: 'ScenarioTripDistribution',
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
      markets: ['A', 'B', 'C', 'D'],
      fareCategories: [],
      form: {
        market: null,
        sector: 'Intra Eur',
        allScenarios: false,
        firstClass: false,
        businessClass: false,
        unrestrictedEconomy: false,
        restrictedEconomy: false,
        leisureFares: false
      }
    };
  },
  methods: {
    handleCheckAllFares(val) {
      if (val) {
        this.form.firstClass = true;
        this.form.businessClass = true;
        this.form.unrestrictedEconomy = true;
        this.form.restrictedEconomy = true;
        this.form.leisureFares = true;
      } else if (!val) {
        this.form.firstClass = false;
        this.form.businessClass = false;
        this.form.unrestrictedEconomy = false;
        this.form.restrictedEconomy = false;
        this.form.leisureFares = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.form-row {
  display: flex;
  box-sizing: border-box;
  flex: 1;
}

.form-column {
  display: flex;
  flex-direction: column;

  .el-checkbox {
    margin-bottom: 5px;
  }

  .tabbed {
    margin-left: 10px;
  }
}

.el-form-item {
  margin-right: 4em;
}

.flex-2 {
  flex: 2;
}

.flex-3 {
  flex: 3;
}

.form-title {
  font-weight: 500;
  color: black;
}
</style>
