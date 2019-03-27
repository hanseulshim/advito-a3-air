<template>
  <div class="navigation-container">
    <router-link
      class="nav-item"
      to="pos-trends"
      :class="{ active: $route.path === '/project/data/pos-trends' }"
      ><i class="far fa-building data-icon" /><span
        >PoS Trends</span
      ></router-link
    >
    <router-link
      class="nav-item"
      to="division-trends"
      :class="{ active: $route.path === '/project/data/division-trends' }"
      ><i class="far fa-newspaper data-icon" /><span
        >Division Trends</span
      ></router-link
    >
    <router-link
      class="nav-item"
      to="import-errors"
      :class="{ active: $route.path === '/project/data/import-errors' }"
      ><i class="far fa-file-alt data-icon" /><span
        >Import Errors</span
      ></router-link
    >
    <button class="button long annualization">ANNUALIZATION</button>
    <div class="dataset">
      <el-select :value="null" placeholder="Select Client">
        <!-- <el-option
          v-for="item in clientList"
          :key="item.value"
          :label="item.name"
          :value="item.id"
        ></el-option> -->
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataNavigation'
};
</script>

<style lang="scss" scoped>
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
  text-decoration: none;
  color: initial;
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
</style>
