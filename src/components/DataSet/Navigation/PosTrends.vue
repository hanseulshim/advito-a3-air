<template>
  <div>
    <i class="fas fa-chevron-up"></i>
    <router-link
      class="nav-item data-nav-item"
      to="/project/data/pos-trends/tickets"
      :class="{ active: $route.path === '/project/data/pos-trends/tickets' }"
      ><span>Tickets</span></router-link
    >
    <span class="spacer">|</span>
    <router-link
      class="nav-item data-nav-item"
      to="/project/data/pos-trends/segments"
      :class="{ active: $route.path === '/project/data/pos-trends/segments' }"
      ><span>O &amp; D Segments</span></router-link
    >
    <span class="spacer">|</span>
    <router-link
      class="nav-item data-nav-item"
      to="/project/data/pos-trends/fare-paid"
      :class="{
        active: $route.path === '/project/data/pos-trends/fare-paid'
      }"
      ><span>Fare Paid</span></router-link
    >
  </div>
</template>

<script>
export default {
  name: 'PosTrends'
};
</script>
