<template>
  <modal
    classes="modal-container"
    name="edit-scenario"
    height="800px"
    width="1100px"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="container">
      <div class="title-row space-between">
        <div class="section-header">edit scenario</div>
        <el-tooltip effect="dark" content="Close Modal" placement="top">
          <i class="fas fa-times close-modal-button" @click="hideModal"></i>
        </el-tooltip>
      </div>
      <EditScenarioNavigation />
      <router-view :scenario="scenario" class="content" />
    </div>
  </modal>
</template>

<script>
import EditScenarioNavigation from './EditScenario/EditScenarioNavigation';
export default {
  name: 'EditScenarioModal',
  components: {
    EditScenarioNavigation
  },
  apollo: {},
  data() {
    return {
      scenario: {}
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('edit-scenario');
      this.$router.replace({ name: 'scenario-settings' });
    },
    beforeOpen(e) {
      this.$router.replace({ name: 'scenario-name' });
      this.scenario = e.params.scenario;
    },
    beforeClose() {
      this.$router.replace({ name: 'scenario-settings' });
      this.scenario = null;
    }
  }
};
</script>
<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.content {
  flex: 1;
}
</style>
