<template>
  <div>
    <div class="data-navigation-container">
      <router-link
        class="data-nav-item nav-item data-nav"
        :to="`/${$route.params.projectId}/data/import-errors/imported-tickets`"
        :class="{
          active: $route.path.includes(
            `/${$route.params.projectId}/data/import-errors`
          )
        }"
      >
        <span class="data-icon">
          <img alt="import-errors" src="@/assets/importErrors.png" />
        </span>
        <span class="nav-title">Import Errors</span>
      </router-link>
      <router-link
        class="data-nav-item nav-item data-nav"
        :to="`/${$route.params.projectId}/data/pos-trends/tickets`"
        :class="{
          active: $route.path.includes(
            `/${$route.params.projectId}/data/pos-trends`
          )
        }"
      >
        <span class="data-icon">
          <img alt="pos-trends" src="@/assets/posTrends.png" />
        </span>
        <span class="nav-title">PoS Trends</span>
      </router-link>
      <router-link
        class="data-nav-item nav-item data-nav"
        :to="`/${$route.params.projectId}/data/division-trends/tickets`"
        :class="{
          active: $route.path.includes(
            `/${$route.params.projectId}/data/division-trends`
          )
        }"
      >
        <span class="data-icon">
          <img alt="division-trends" src="@/assets/divisionTrends.png" />
        </span>
        <span class="nav-title">Division Trends</span>
      </router-link>

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
      <PosTrends
        v-if="
          $route.path.includes(`/${$route.params.projectId}/data/pos-trends`)
        "
      />
      <DivisionTrends
        v-if="
          $route.path.includes(
            `/${$route.params.projectId}/data/division-trends`
          )
        "
      />
      <ImportErrors
        v-if="
          $route.path.includes(`/${$route.params.projectId}/data/import-errors`)
        "
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
.data-navigation-container {
  display: flex;
  align-items: center;
}

.dataset {
  margin-left: auto;
}
.data-nav-item {
  &.data-nav {
    display: flex;
    align-items: center;
    margin-right: 6em;
  }
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
    border: 1px solid $dusty-gray;
    border-radius: 100%;
    padding: 10px;
    margin-right: 10px;
    width: 35px;
    height: 35px;
    img {
      width: 100%;
    }
  }
}
.sub-navigation-container {
  border-top: 2px solid $botticelli;
  margin-top: 10px;
  padding-top: 10px;
  position: relative;
  .pos-trends {
    margin-left: 15%;
    .fa-chevron-up {
      left: calc(19% + 1em + 22.375px);
    }
  }
  .division-trends {
    margin-left: 30%;
    .fa-chevron-up {
      left: calc(36% + 2em + 22.375px);
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
    left: 22.375px;
  }
}
</style>
