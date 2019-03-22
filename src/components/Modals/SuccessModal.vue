<template>
  <modal
    classes="modal-container"
    name="success"
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
  name: 'SuccessModal',
  data() {
    return {
      message: '',
      name: ''
    };
  },
  methods: {
    closeModal() {
      this.$modal.hide('success');
      this.$modal.hide(this.name);
    },
    beforeOpen(event) {
      this.message = event.params.message;
      this.name = event.params.name;
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
