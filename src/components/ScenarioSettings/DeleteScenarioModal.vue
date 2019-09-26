<template>
  <modal
    classes="modal-container"
    name="delete-scenario"
    height="auto"
    width="800px"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="delete-modal-text">
      Are you sure you want to delete this scenario?
    </div>
    <div class="delete-modal-button-container">
      <button class="button" @click="deleteScenario">Yes</button>
      <button class="button" @click="hideModal">No</button>
    </div>
  </modal>
</template>
<script>
import { DELETE_SCENARIO } from '@/graphql/mutations';
import { GET_SCENARIO_LIST } from '@/graphql/queries';
export default {
  name: 'DeleteScenarioModal',
  apollo: {},
  components: {},
  data() {
    return {
      id: null,
      projectId: null
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('delete-scenario');
    },
    deleteScenario() {
      try {
        this.$apollo.mutate({
          mutation: DELETE_SCENARIO,
          variables: {
            id: this.id
          },
          refetchQueries: () => [
            {
              query: GET_SCENARIO_LIST,
              variables: {
                projectId: this.projectId
              }
            }
          ]
        });
        this.$modal.show('success', {
          message: 'Scenario successfully deleted',
          name: 'delete-scenario'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    beforeOpen(event) {
      this.id = event.params.id;
      this.projectId = event.params.projectId;
    },
    beforeClose() {
      this.id = null;
      this.projectId = null;
    }
  }
};
</script>
<style lang="scss">
.button-row {
  display: flex;
  justify-content: space-between;
  margin-top: 3em;
}
</style>
