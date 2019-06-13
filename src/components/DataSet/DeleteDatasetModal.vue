<template>
  <modal
    classes="modal-container"
    name="deleteDataset"
    height="auto"
    width="800px"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="title-row space-between">
      <div class="section-header">Delete Dataset</div>
      <el-tooltip effect="dark" content="Close Modal" placement="top">
        <i class="fas fa-times close-modal-button" @click="hideModal" />
      </el-tooltip>
    </div>
    <p>
      This dataset is associated with the following projects: Project A, Project
      B, Project C. It will be deleted from all associated projects. Would you
      like to proceed?
    </p>
    <div class="button-row">
      <button class="button" @click="hideModal">Cancel</button>
      <button class="button" @click="deleteDataSet">Confirm</button>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'DeleteDatasetModal',
  apollo: {},
  components: {},
  data() {
    return {
      id: null
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('deleteDataset');
    },
    deleteDataSet() {
      this.$emit('delete-dataset', this.id);
      this.hideModal();
    },
    beforeOpen(event) {
      this.id = event.params.id;
    },
    beforeClose() {}
  }
};
</script>
<style lang="scss">
.button-row {
  display: flex;
  justify-content: space-between;
  margin-top: 5em;
}
</style>
