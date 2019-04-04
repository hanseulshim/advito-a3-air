<template>
  <div>
    <div class="navigation-container">
      <router-link
        class="nav-item"
        to="/project/data/pos-trends/tickets"
        :class="{ active: $route.path.includes('/project/data/pos-trends') }"
      >
        <i class="far fa-building data-icon" />
        <span class="nav-title">PoS Trends</span>
      </router-link>
      <router-link
        class="nav-item"
        to="/project/data/division-trends/tickets"
        :class="{
          active: $route.path.includes('/project/data/division-trends')
        }"
      >
        <i class="far fa-newspaper data-icon" />
        <span class="nav-title">Division Trends</span>
      </router-link>
      <router-link
        class="nav-item"
        to="/project/data/import-errors/imported-tickets"
        :class="{ active: $route.path.includes('/project/data/import-errors') }"
      >
        <i class="far fa-file-alt data-icon" />
        <span class="nav-title">Import Errors</span>
      </router-link>
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
  -ms-grid-columns: 15% 1em 15% 1em 15% 1em auto 1em 150px 1em 200px;
  row-gap: 1em;
  column-gap: 1em;
  align-items: center;
}
.annualization {
  -ms-grid-row: 1;
  grid-row: 1;
  -ms-grid-column: 9;
  grid-column: 9;
  grid-area: annualization;
}
.dataset {
  -ms-grid-row: 1;
  grid-row: 1;
  -ms-grid-column: 11;
  grid-column: 11;
  grid-area: dataset;
}
.nav-item {
  .nav-title {
    font-size: 16px;
  }
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
    border: 1px solid $dusty-gray;
    border-radius: 100%;
    padding: 15px;
    margin-right: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
  }
}
.sub-navigation-container {
  border-top: 2px solid $botticelli;
  margin-top: 10px;
  padding-top: 10px;
  position: relative;
  .division-trends {
    margin-left: 15%;
    .fa-chevron-up {
      left: calc(15% + 1em + 25px);
    }
  }
  .import-errors {
    margin-left: 30%;
    .fa-chevron-up {
      left: calc(30% + 2em + 18px);
    }
  }
  .spacer {
    margin: 0 15px;
  }
  .fa-chevron-up {
    position: absolute;
    top: -10px;
    background: $white;
    color: $botticelli;
    left: 18px;
  }
}
</style>
