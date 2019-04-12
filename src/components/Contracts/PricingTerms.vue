<template>
  <div>
    <Navigation :selected-contract="selectedContract" />
    pricing terms
  </div>
</template>

<script>
import Navigation from './Navigation';
export default {
  name: 'PricingTerms',
  components: {
    Navigation
  },
  props: {
    selectedContract: {
      type: Object,
      required: true
    }
  }
};
</script>
