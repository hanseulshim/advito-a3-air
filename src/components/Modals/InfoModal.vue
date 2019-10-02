<template>
  <modal
    classes="modal-container"
    name="info"
    height="auto"
    @before-open="beforeOpen"
  >
    <div class="title-row space-between">
      <div class="section-header">Info</div>
      <el-tooltip effect="dark" content="Close Modal" placement="top">
        <i class="fas fa-times close-modal-button" @click="closeModal"></i>
      </el-tooltip>
    </div>
    <div>
      <pdf :src="source" :page="1" />
    </div>
  </modal>
</template>
<script>
import pdf from 'pdfvuer';
export default {
  name: 'InfoModal',
  components: {
    pdf
  },
  data() {
    return {
      source: ''
    };
  },
  methods: {
    closeModal() {
      this.$modal.hide('info');
    },
    beforeOpen(event) {
      const { source } = event.params;
      this.source = source;
    }
  }
};
</script>
