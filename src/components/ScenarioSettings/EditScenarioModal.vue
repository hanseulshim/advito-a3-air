<template>
  <modal
    classes="modal-container"
    name="edit-scenario"
    height="auto"
    width="1200px"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="title-row space-between">
      <div class="section-header">edit scenario</div>
      <el-tooltip effect="dark" content="Close Modal" placement="top">
        <i class="fas fa-times close-modal-button" @click="hideModal"></i>
      </el-tooltip>
    </div>
    <EditScenarioNavigation />
    <router-view />
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
    validateForm() {
      this.$refs.editProjectForm.validate(valid => {
        if (valid) {
          this.editScenario();
        } else {
          return false;
        }
      });
    },
    beforeOpen() {
      this.$router.replace({ name: 'scenario-name' });
    },
    beforeClose() {
      this.$router.replace({ name: 'scenario-settings' });
    }
  }
};
</script>
