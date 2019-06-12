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
import { GET_CONTRACT, GET_TARGET_TERM_LIST } from '@/graphql/queries';
import { DELETE_TARGET_TERMS } from '@/graphql/mutations';
export default {
  name: 'DeleteTargetTermModal',
  data() {
    return {
      contractId: null,
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
          update: (store, { data: { deleteTargetTerms } }) => {
            const query = {
              query: GET_TARGET_TERM_LIST,
              variables: {
                contractId: this.contractId
              }
            };
            const data = store.readQuery(query);
            data.targetTermList = data.targetTermList.filter(
              term => deleteTargetTerms.indexOf(term.id) === -1
            );
            store.writeQuery({
              ...query,
              data
            });
          },
          refetchQueries: () => [
            {
              query: GET_CONTRACT,
              variables: { id: this.contractId }
            }
          ]
        });
        this.$emit('clear-bulk-actions');
        this.$modal.show('success', {
          message: 'Target Term successfully deleted.',
          name: 'delete-target-term'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    beforeOpen(event) {
      this.contractId = event.params.contractId;
      this.idList = event.params.idList;
    },
    beforeClose() {
      this.contractId = null;
      this.idList = [];
    }
  }
};
</script>
