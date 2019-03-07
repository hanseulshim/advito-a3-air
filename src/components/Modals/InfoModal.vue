<template>
  <modal classes="modal-container" name="info" height="auto">
    <div class="title-row">
      <div class="section-header">Info</div>
      <i class="fas fa-times close-modal-button" @click="closeModal"></i>
    </div>
    <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </div>
  </modal>
</template>

<script>
export default {
  name: 'InfoModal',
  methods: {
    closeModal() {
      this.$modal.hide('info');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';
.title-row {
  margin-bottom: 1em;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
</style>
