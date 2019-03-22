<template>
  <modal
    classes="modal-container"
    name="error"
    height="auto"
    :click-to-close="false"
    @before-open="beforeOpen"
  >
    <div style="text-align: center">{{ message }}</div>
    <div class="close-container">
      <button class="button" @click="closeModal">CLOSE</button>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'ErrorModal',
  data() {
    return {
      message: ''
    };
  },
  methods: {
    closeModal() {
      this.$modal.hide('error');
    },
    beforeOpen(event) {
      this.message = event.params.message;
    }
  }
};
</script>

<style lang="scss" scoped>
.close-container {
  display: flex;
  justify-content: center;
  margin-top: 2em;
}
</style>
