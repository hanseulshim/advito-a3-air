<template>
  <router-view
    :selected-contract="selectedContract"
    @select-contract="selectContract"
  />
</template>

<script>
export default {
  name: 'Contracts',
  data() {
    return {
      selectedContract: {}
    };
  },
  methods: {
    selectContract(selectedContract) {
      this.selectedContract = selectedContract;
    }
  }
};
</script>
