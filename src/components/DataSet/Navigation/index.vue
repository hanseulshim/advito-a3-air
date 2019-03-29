<template>
  <div>
    <div class="navigation-container">
      <router-link
        class="nav-item"
        to="/project/data/pos-trends/tickets"
        :class="{ active: $route.path.includes('/project/data/pos-trends') }"
        ><i class="far fa-building data-icon" /><span
          >PoS Trends</span
        ></router-link
      >
      <router-link
        class="nav-item"
        to="/project/data/division-trends/tickets"
        :class="{
          active: $route.path.includes('/project/data/division-trends')
        }"
        ><i class="far fa-newspaper data-icon" /><span
          >Division Trends</span
        ></router-link
      >
      <router-link
        class="nav-item"
        to="/project/data/import-errors/imported-tickets"
        :class="{ active: $route.path.includes('/project/data/import-errors') }"
        ><i class="far fa-file-alt data-icon" /><span
          >Import Errors</span
        ></router-link
      >
      <button class="button long annualization">ANNUALIZATION</button>
      <div class="dataset">
        <el-select
          :value="selectedFilter"
          placeholder="Select Client"
          @change="updateFilter"
        >
          <el-option
            v-for="item in filterSelectList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="sub-navigation-container">
      <PosTrends v-if="$route.path.includes('/project/data/pos-trends')" />
      <DivisionTrends
        v-if="$route.path.includes('/project/data/division-trends')"
      />
      <ImportErrors
        v-if="$route.path.includes('/project/data/import-errors')"
      />
    </div>
  </div>
</template>

<script>
import PosTrends from './PosTrends';
import DivisionTrends from './DivisionTrends';
import ImportErrors from './ImportErrors';
export default {
  name: 'DataNavigation',
  components: {
    PosTrends,
    DivisionTrends,
    ImportErrors
  },
  props: {
    filterSelectList: {
      required: true,
      type: Array
    },
    selectedFilter: {
      required: true,
      type: String
    }
  },
  methods: {
    updateFilter(value) {
      this.$emit('update-filter', value);
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/global.scss';
.navigation-container {
  display: grid;
  grid-template-areas: 'pos division import . annualization dataset';
  grid-template-columns: 15% 15% 15% auto 150px 200px;
  row-gap: 1em;
  column-gap: 1em;
  align-items: center;
}
.annualization {
  grid-area: annualization;
}
.dataset {
  grid-area: dataset;
}
.nav-item {
  &.active {
    span {
      color: $tradewind;
    }
    .data-icon {
      border-color: $tradewind;
    }
  }
  &:hover {
    span {
      color: $tradewind;
    }
    .data-icon {
      border-color: $tradewind;
    }
  }
  .data-icon {
    font-size: 1.5em;
    border: 1px solid $gray;
    border-radius: 100%;
    padding: 10px;
    margin-right: 5px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
  }
}
.sub-navigation-container {
  border-top: 1px solid $tradewind;
  margin-top: 10px;
  padding-top: 10px;
  position: relative;
  .division-trends {
    margin-left: 15%;
    .fa-chevron-up {
      left: calc(15% + 1em + 18px);
    }
  }
  .import-errors {
    margin-left: 30%;
    .fa-chevron-up {
      left: calc(30% + 2em + 18px);
    }
  }
  .spacer {
    margin: 0 10px;
  }
  .fa-chevron-up {
    position: absolute;
    top: -10px;
    background: $white;
    color: $tradewind;
    left: 18px;
  }
}
</style>
