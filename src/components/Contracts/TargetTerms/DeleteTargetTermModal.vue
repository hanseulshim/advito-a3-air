<template>
  <modal
    classes="modal-container"
    name="delete-target-term"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="delete-modal-text">
      {{
        idList.length > 1
          ? 'Are you sure you want to delete these target terms?'
          : 'Are you sure you want to delete this target term?'
      }}
    </div>
    <div class="delete-modal-button-container">
      <button class="button" @click="deleteTargetTerm">Yes</button>
      <button class="button" @click="hideModal">No</button>
    </div>
  </modal>
</template>

<script>
import { GET_TARGET_TERM_LIST } from '@/graphql/queries';
import { DELETE_TARGET_TERMS } from '@/graphql/mutations';
export default {
  name: 'DeleteTargetTermModal',
  data() {
    return {
      idList: []
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('delete-target-term');
    },
    async deleteTargetTerm() {
      try {
        await this.$apollo.mutate({
          mutation: DELETE_TARGET_TERMS,
          variables: {
            idList: this.idList
          },
          update: (store, data) => {
            const idList = data.data.deleteTargetTerms;
            const newData = store.readQuery({
              query: GET_TARGET_TERM_LIST
            });
            const indexList = idList.map(id =>
              newData.targetTermList.findIndex(term => term.id === id)
            );
            indexList.forEach(index => {
              newData.targetTermList.splice(index, 1);
            });
            store.writeQuery({
              query: GET_TARGET_TERM_LIST,
              data: newData
            });
          }
        });
        this.$emit('clear-bulk-actions');
        this.$modal.show('success', {
          message: 'Pricing Term successfully deleted.',
          name: 'delete-target-term'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    beforeOpen(event) {
      this.idList = event.params.idList;
    },
    beforeClose() {
      this.idList = [];
    }
  }
};
</script>
