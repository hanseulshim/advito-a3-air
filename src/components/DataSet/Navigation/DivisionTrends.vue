<template>
  <div class="division-trends">
    <i class="fas fa-chevron-up"></i>
    <router-link
      class="nav-item data-nav-item"
      :to="`/${$route.params.projectId}/data/division-trends/tickets`"
      :class="{
        active: $route.path.includes('division-trends/tickets')
      }"
    >
      <span>Tickets</span>
    </router-link>
    <span class="spacer">|</span>
    <router-link
      class="nav-item data-nav-item"
      :to="`/${$route.params.projectId}/data/division-trends/segments`"
      :class="{
        active: $route.path.includes('division-trends/segments')
      }"
    >
      <span>O &amp; D Segments</span>
    </router-link>
    <span class="spacer">|</span>
    <router-link
      class="nav-item data-nav-item"
      :to="`/${$route.params.projectId}/data/division-trends/fare-paid`"
      :class="{
        active: $route.path.includes('division-trends/fare-paid')
      }"
    >
      <span>Fare Paid</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'DivisionTrends'
};
</script>
