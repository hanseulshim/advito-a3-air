<template>
  <div class="import-errors">
    <i class="fas fa-chevron-up"></i>
    <router-link
      class="nav-item data-nav-item"
      :to="
        `/projectList/${
          $route.params.projectId
        }/data/import-errors/imported-tickets`
      "
      :class="{
        active: $route.path.includes('imported-tickets')
      }"
    >
      <span>Imported Tickets</span>
    </router-link>
    <span class="spacer">|</span>
    <router-link
      class="nav-item data-nav-item"
      :to="
        `/projectList/${
          $route.params.projectId
        }/data/import-errors/error-tickets`
      "
      :class="{
        active: $route.path.includes('error-tickets')
      }"
    >
      <span>Error Tickets</span>
    </router-link>
    <span class="spacer">|</span>
    <router-link
      class="nav-item data-nav-item"
      :to="
        `/projectList/${$route.params.projectId}/data/import-errors/error-ratio`
      "
      :class="{
        active: $route.path.includes('error-ratio')
      }"
    >
      <span>Error Ratio</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ImportErrors'
};
</script>
