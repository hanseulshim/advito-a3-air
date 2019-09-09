<template>
  <div>
    <div class="scenario-navigation-container">
      <router-link
        class="data-nav-item nav-item data-nav"
        :to="`/${$route.params.projectId}/scenario-settings/scenario-name`"
        :class="{
          active: $route.path.includes(
            `/${$route.params.projectId}/scenario-settings/scenario-name`
          )
        }"
      >
        <span class="nav-title">Scenario Name</span>
      </router-link>
      <router-link
        class="data-nav-item nav-item data-nav"
        :to="`/${$route.params.projectId}/scenario-settings/scenario-contracts`"
        :class="{
          active: $route.path.includes(
            `/${$route.params.projectId}/scenario-settings/scenario-contracts`
          )
        }"
      >
        <span class="nav-title">Contracts</span>
      </router-link>
      <router-link
        class="data-nav-item nav-item data-nav"
        :to="
          `/${
            $route.params.projectId
          }/scenario-settings/scenario-preferred-airlines`
        "
        :class="{
          active: $route.path.includes(
            `/${
              $route.params.projectId
            }/scenario-settings/scenario-preferred-airlines`
          )
        }"
      >
        <span class="nav-title"> Preferred Airlines</span>
      </router-link>
      <router-link
        class="data-nav-item nav-item data-nav"
        :to="
          `/${$route.params.projectId}/scenario-settings/scenario-parameters`
        "
        :class="{
          active: $route.path.includes(
            `/${$route.params.projectId}/scenario-settings/scenario-parameters`
          )
        }"
      >
        <span class="nav-title">Parameters</span>
      </router-link>
      <router-link
        class="data-nav-item nav-item data-nav"
        :to="
          `/${
            $route.params.projectId
          }/scenario-settings/scenario-trip-distribution`
        "
        :class="{
          active: $route.path.includes(
            `/${
              $route.params.projectId
            }/scenario-settings/scenario-trip-distribution`
          )
        }"
      >
        <span class="nav-title">Trip Distribution</span>
      </router-link>
    </div>
    <!-- <div class="sub-navigation-container">
      <ScenarioName
        v-if="
          $route.path.includes(
            `/${$route.params.projectId}/scenario-settings/scenario-name`
          )
        "
      />
      <ScenarioContracts
        v-if="
          $route.path.includes(
            `/${$route.params.projectId}/scenario-settings/scenario-contracts`
          )
        "
      />
      <ScenarioPreferredAirlines
        v-if="
          $route.path.includes(
            `/${
              $route.params.projectId
            }/scenario-settings/scenario-preferred-airlines`
          )
        "
      />
      <ScenarioParamters
        v-if="
          $route.path.includes(
            `/${$route.params.projectId}/scenario-settings/scenario-parameters`
          )
        "
      />
      <ScenarioTripDistribution
        v-if="
          $route.path.includes(
            `/${
              $route.params.projectId
            }/scenario-settings/scenario-trip-distribution`
          )
        "
      />
    </div> -->
  </div>
</template>

<script>
// import PosTrends from './PosTrends';
// import DivisionTrends from './DivisionTrends';
// import ImportErrors from './ImportErrors';
export default {
  name: 'EditScenarioNavigation',
  components: {},
  props: {}
};
</script>

<style lang="scss">
@import '@/styles/global.scss';
.scenario-navigation-container {
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
      left: calc(15% + 1em + 22.375px);
    }
  }
  .division-trends {
    margin-left: 30%;
    .fa-chevron-up {
      left: calc(30% + 2em + 22.375px);
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
