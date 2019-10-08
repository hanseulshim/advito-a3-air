<template>
  <modal
    classes="modal-container"
    name="info"
    height="auto"
    width="750px"
    @before-open="beforeOpen"
  >
    <div id="pdf-container">
      <div class="title-row space-between">
        <div class="section-header">{{ name }}</div>
        <el-tooltip effect="dark" content="Close Modal" placement="top">
          <i class="fas fa-times close-modal-button" @click="closeModal"></i>
        </el-tooltip>
      </div>
      <div v-if="source">
        <pdf
          v-for="i in numPages"
          :id="i"
          :key="i"
          :src="source"
          :page="i"
          :scale.sync="scale"
          style="width:100%;"
        />
      </div>
    </div>
    <div id="buttons">
      <a class="item" @click="page > 1 ? page-- : 1">
        <i class="left chevron icon"></i>
        Back
      </a>
      <a class="ui active item pageCount">
        {{ page }} / {{ numPages ? numPages : '∞' }}
      </a>
      <a class="item" @click="page < numPages ? page++ : 1">
        Forward
        <i class="right chevron icon"></i>
      </a>
    </div>
  </modal>
</template>
<script>
import pdfvuer from 'pdfvuer';
export default {
  name: 'InfoModal',
  components: {
    pdf: pdfvuer
  },
  data() {
    return {
      source: '',
      page: 1,
      numPages: 0,
      pdfdata: undefined,
      scale: 'page-width',
      name: ''
    };
  },
  methods: {
    closeModal() {
      this.$modal.hide('info');
    },
    getPdf() {
      this.pdfdata = pdfvuer.createLoadingTask(this.source);
      this.pdfdata.then(pdf => {
        this.numPages = pdf.numPages;
      });
    },

    beforeOpen(event) {
      if (event.params) {
        const { source, name } = event.params;
        this.source = source;
        this.name = name;
        this.getPdf();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#buttons {
  display: flex;
  border-top: 1px solid #ededed;
  padding: 5px 0px;
  a {
    flex: 1;
    text-align: center;
    cursor: pointer;
  }

  .pageCount {
    border-right: 1px solid #ededed;
    border-left: 1px solid #ededed;
  }
}
</style>
