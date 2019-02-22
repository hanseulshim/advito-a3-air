<template>
  <modal
    classes="modal-container"
    name="success"
    height="auto"
    :click-to-close="false"
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
  props: {
    hideModal: {
      type: Function,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  methods: {
    closeModal() {
      this.$modal.hide('success');
      this.hideModal();
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
