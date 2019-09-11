<template>
  <div>
    <div class="scenario-navigation-container">
      <router-link
        class="scenario-nav-item nav-item"
        :to="
          `/${
            $route.params.projectId
          }/scenario-settings/edit-scenario/scenario-name`
        "
        :class="{
          active: $route.path.includes(
            `/${
              $route.params.projectId
            }/scenario-settings/edit-scenario/scenario-name`
          )
        }"
      >
        <span class="nav-title">Scenario Name</span>
        <i class="fas fa-chevron-up" />
      </router-link>
      <router-link
        class="scenario-nav-item nav-item"
        :to="
          `/${
            $route.params.projectId
          }/scenario-settings/edit-scenario/scenario-contracts`
        "
        :class="{
          active: $route.path.includes(
            `/${
              $route.params.projectId
            }/scenario-settings/edit-scenario/scenario-contracts`
          )
        }"
      >
        <span class="nav-title">Contracts</span>
        <i class="fas fa-chevron-up" />
      </router-link>
      <router-link
        class="scenario-nav-item nav-item"
        :to="
          `/${
            $route.params.projectId
          }/scenario-settings/edit-scenario/scenario-preferred-airlines`
        "
        :class="{
          active: $route.path.includes(
            `/${
              $route.params.projectId
            }/scenario-settings/edit-scenario/scenario-preferred-airlines`
          )
        }"
      >
        <span class="nav-title"> Preferred Airlines</span>
        <i class="fas fa-chevron-up" />
      </router-link>
      <router-link
        class="scenario-nav-item nav-item"
        :to="
          `/${
            $route.params.projectId
          }/scenario-settings/edit-scenario/scenario-parameters`
        "
        :class="{
          active: $route.path.includes(
            `/${
              $route.params.projectId
            }/scenario-settings/edit-scenario/scenario-parameters`
          )
        }"
      >
        <span class="nav-title">Parameters</span>
        <i class="fas fa-chevron-up" />
      </router-link>
      <router-link
        class="scenario-nav-item nav-item"
        :to="
          `/${
            $route.params.projectId
          }/scenario-settings/edit-scenario/scenario-trip-distribution`
        "
        :class="{
          active: $route.path.includes(
            `/${
              $route.params.projectId
            }/scenario-settings/edit-scenario/scenario-trip-distribution`
          )
        }"
      >
        <span class="nav-title">Trip Distribution</span>
        <i class="fas fa-chevron-up" />
      </router-link>
    </div>
  </div>
</template>

<script>
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
  margin-top: 3em;
  margin-bottom: 3em;
  border-bottom: 2px solid $botticelli;
  padding-bottom: 10px;
}

.scenario-nav-item {
  margin-right: 6em;
  position: relative;
  .nav-title {
    font-size: 14px;
  }
  &.active {
    span {
      color: $tradewind;
    }
    .fa-chevron-up {
      visibility: visible;
    }
  }
  &:hover {
    span {
      color: $tradewind;
    }
  }
  .fa-chevron-up {
    position: absolute;
    visibility: hidden;
    bottom: -15px;
    background: $white;
    color: $botticelli;
    left: 22.375px;
  }
}
</style>
