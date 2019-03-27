<template>
  <div class="import-errors">
    <router-link
      class="nav-item"
      to="/project/data/import-errors/imported-tickets"
      :class="{
        active: $route.path === '/project/data/import-errors/imported-tickets'
      }"
      ><span>Imported Tickets</span></router-link
    >
    <span class="spacer">|</span>
    <router-link
      class="nav-item"
      to="/project/data/import-errors/error-tickets"
      :class="{
        active: $route.path === '/project/data/import-errors/error-tickets'
      }"
      ><span>Error Tickets</span></router-link
    >
    <span class="spacer">|</span>
    <router-link
      class="nav-item"
      to="/project/data/import-errors/error-ratio"
      :class="{
        active: $route.path === '/project/data/import-errors/error-ratio'
      }"
      ><span>Error Ratio</span></router-link
    >
  </div>
</template>

<script>
export default {
  name: 'ImportErrors'
};
</script>
