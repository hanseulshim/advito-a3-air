<template>
  <div>
    <Navigation :selected-contract="selectedContract" />
    Target terms
  </div>
</template>

<script>
import Navigation from './Navigation';
export default {
  name: 'TargetTerms',
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
