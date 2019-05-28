<template>
  <modal
    classes="modal-container"
    name="delete-target-level"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="delete-modal-text">
      Are you sure you want to delete this target level?
    </div>
    <div class="delete-modal-button-container">
      <button class="button" @click="deleteTargetLevel">Yes</button>
      <button class="button" @click="hideModal">No</button>
    </div>
  </modal>
</template>

<script>
import { GET_TARGET_LEVEL_LIST } from '@/graphql/queries';
import { DELETE_TARGET_LEVEL } from '@/graphql/mutations';
export default {
  name: 'DeleteTargetLevelModal',
  data() {
    return {
      id: null,
      targetTermId: null
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('delete-target-level');
    },
    async deleteTargetLevel() {
      try {
        await this.$apollo.mutate({
          mutation: DELETE_TARGET_LEVEL,
          variables: {
            id: this.id
          },
          update: (store, { data: deleteTargetLevel }) => {
            const query = {
              query: GET_TARGET_LEVEL_LIST,
              variables: {
                targetTermId: this.targetTermId
              }
            };
            const data = store.readQuery(query);
            const index = data.targetLevelList.findIndex(
              term => term.id === deleteTargetLevel
            );
            data.targetLevelList.splice(index, 1);
            store.writeQuery({
              ...query,
              data
            });
          }
        });
        this.$emit('clear-bulk-actions');
        this.$modal.show('success', {
          message: 'Pricing Term successfully deleted.',
          name: 'delete-target-level'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    beforeOpen(event) {
      this.id = event.params.id;
      this.targetTermId = event.params.targetTermId;
    },
    beforeClose() {
      this.id = null;
      this.targetTermId = null;
    }
  }
};
</script>
