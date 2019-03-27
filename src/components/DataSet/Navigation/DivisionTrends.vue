<template>
  <div class="division-trends">
    <router-link
      class="nav-item"
      to="/project/data/division-trends/tickets"
      :class="{
        active: $route.path === '/project/data/division-trends/tickets'
      }"
      ><span>Tickets</span></router-link
    >
    <span class="spacer">|</span>
    <router-link
      class="nav-item"
      to="/project/data/division-trends/segments"
      :class="{
        active: $route.path === '/project/data/division-trends/segments'
      }"
      ><span>O &amp; D Segments</span></router-link
    >
    <span class="spacer">|</span>
    <router-link
      class="nav-item"
      to="/project/data/division-trends/fare-paid"
      :class="{
        active: $route.path === '/project/data/division-trends/fare-paid'
      }"
      ><span>Fare Paid</span></router-link
    >
  </div>
</template>

<script>
export default {
  name: 'DivisionTrends'
};
</script>
