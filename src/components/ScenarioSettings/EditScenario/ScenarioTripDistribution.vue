<template>
  <el-form
    ref="tripDistribution"
    :model="form"
    label-position="left"
    label-width="75px"
    hide-required-asterisk
    class="trip-dist-form"
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
        <div class="checkbox-container">
          <el-checkbox
            v-for="country in pointOfSaleList"
            :key="country.countryCode"
            :label="country.id"
            >{{ country.countryCode }}</el-checkbox
          >
        </div>
      </div>
      <div class="form-column">
        <span class="form-title"> Divisions</span>
        <el-checkbox v-model="form.allPOS">All Divisions</el-checkbox>
        <div class="checkbox-container">
          <el-checkbox
            v-for="country in pointOfSaleList"
            :key="country.countryCode"
            :label="country.id"
            >{{ country.countryCode }}</el-checkbox
          >
        </div>
      </div>
    </div>
    <div class="trip-dist-controls">
      <button class="button no-width" type="button">SET TO HISTORY</button>
      <button class="button no-width" type="button">SET TO QSI</button>
      <button class="button no-width" type="button">
        CLEAR TRIP DISTRIBUTION
      </button>
    </div>
    <div class="form-row flex-1">
      <el-table ref="tripDistributionTable" :data="tableData" class="tripTable">
        <el-table-column label="Airlines" />
        <el-table-column label="Historical Share" />
        <el-table-column label="Future QSI Share" />
        <el-table-column label="Trip Distribution" />
      </el-table>
    </div>
    <div class="save-container">
      <button class="button" type="button" @click="saveScenarioParameters">
        SAVE
      </button>
    </div>
  </el-form>
</template>
<script>
import {
  GET_CLIENT,
  GET_PROJECT,
  GET_SCENARIO,
  GET_SCENARIO_MARKET_LIST
} from '@/graphql/queries';
export default {
  name: 'ScenarioTripDistribution',
  props: {
    scenarioId: {
      default: null,
      type: Number
    }
  },
  apollo: {
    client: {
      query: GET_CLIENT
    },
    project: {
      query: GET_PROJECT
    },
    scenario: {
      query: GET_SCENARIO,
      variables() {
        return {
          id: this.scenarioId
        };
      }
    },
    scenarioMarketList: {
      query: GET_SCENARIO_MARKET_LIST,
      variables() {
        return {
          clientGcn: this.client.gcn,
          projectId: this.project.id
        };
      }
    }
  },
  data() {
    return {
      client: {},
      project: {},
      scenairo: {},
      scenarioMarketList: [],
      markets: ['A', 'B', 'C', 'D'],
      fareCategories: [],
      pointOfSaleList: [
        {
          id: 1,
          countryCode: 'USA'
        },
        {
          id: 2,
          countryCode: 'FRA'
        },
        {
          id: 3,
          countryCode: 'GER'
        },
        {
          id: 4,
          countryCode: 'ANG'
        },
        {
          id: 5,
          countryCode: 'SPN'
        },
        {
          id: 6,
          countryCode: 'AUS'
        }
      ],
      tableData: [],
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
    },
    saveScenarioParameters() {
      alert('saved');
    }
  }
};
</script>
<style lang="scss" scoped>
.trip-dist-form {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.form-row {
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  margin-bottom: 1em;
}

.form-column {
  display: flex;
  flex-direction: column;
  width: 30%;
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

.flex-1 {
  flex: 1;
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
  margin-bottom: 10px;
}

.trip-dist-controls {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin: 1em 0;
  button {
    margin-left: 2.5%;
  }
}

.tripTable {
}

.checkbox-container {
  display: flex;
  flex-direction: column;
  border: 1px solid #dedede;
  padding: 1em;
  height: 100px;
  overflow: scroll;
}

.save-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
}
</style>
