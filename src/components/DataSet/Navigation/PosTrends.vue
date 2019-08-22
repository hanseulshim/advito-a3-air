<template>
  <div class="pos-trends">
    <i class="fas fa-chevron-up"></i>
    <router-link
      class="nav-item data-nav-item"
      :to="`/${$route.params.projectId}/data/pos-trends/tickets`"
      :class="{ active: $route.path.includes('pos-trends/tickets') }"
    >
      <span>Tickets</span>
    </router-link>
    <span class="spacer">|</span>
    <router-link
      class="nav-item data-nav-item"
      :to="`/${$route.params.projectId}/data/pos-trends/segments`"
      :class="{ active: $route.path.includes('pos-trends/segments') }"
    >
      <span>O &amp; D Segments</span>
    </router-link>
    <span class="spacer">|</span>
    <router-link
      class="nav-item data-nav-item"
      :to="`/${$route.params.projectId}/data/pos-trends/fare-paid`"
      :class="{
        active: $route.path.includes('pos-trends/fare-paid')
      }"
    >
      <span>Fare Paid</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'PosTrends'
};
</script>
