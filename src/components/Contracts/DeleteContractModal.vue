<template>
  <modal
    classes="modal-container"
    name="delete-contract"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="delete-modal-text">
      Are you sure you want to delete this contract?
    </div>
    <div class="delete-modal-button-container">
      <button class="button" @click="deleteContract">Yes</button>
      <button class="button" @click="hideModal">No</button>
    </div>
  </modal>
</template>

<script>
import { GET_CONTRACT_LIST } from '@/graphql/queries';
import { DELETE_CONTRACT } from '@/graphql/mutations';
export default {
  name: 'DeleteContractModal',
  data() {
    return {
      id: null
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('delete-contract');
    },
    async deleteContract() {
      try {
        await this.$apollo.mutate({
          mutation: DELETE_CONTRACT,
          variables: {
            id: this.id
          },
          update: (store, data) => {
            const id = data.data.deleteContract;
            const newData = store.readQuery({
              query: GET_CONTRACT_LIST
            });
            const index = newData.contractList.findIndex(
              contract => contract.id === id
            );
            newData.contractList.splice(index, 1);
            store.writeQuery({
              query: GET_CONTRACT_LIST,
              data: newData
            });
          }
        });
        this.$modal.show('success', {
          message: 'Contract successfully deleted.',
          name: 'delete-contract'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    beforeOpen(event) {
      this.id = event.params.id;
    },
    beforeClose() {
      this.id = null;
    }
  }
};
</script>
