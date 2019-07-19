<template>
  <modal
    classes="modal-container"
    name="normalization-modal"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="scroll-container">
      <div class="title-row space-between">
        <div class="section-header">Discount : {{ discount.name }}</div>
        <el-tooltip effect="dark" content="Close Modal" placement="top">
          <i class="fas fa-times close-modal-button" @click="hideModal" />
        </el-tooltip>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'NormalizationModal',
  components: {},
  data() {
    return {
      discount: {}
    };
  },
  computed: {},
  methods: {
    hideModal() {
      this.$modal.hide('normalization-modal');
    },
    beforeOpen(event) {
      this.discount = event.params.discount;
    },
    beforeClose() {
      this.discount = {};
    },
    toggleRow(id) {
      this.$emit('toggle-row', id);
    }
  }
};
</script>
<style lang="scss">
.scroll-container {
  height: 100%;
  overflow: auto;
}

.rules-menu-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1em;

  .rule-count {
    flex: 2;
  }

  .el-select {
    flex: 1;
  }
}
</style>
