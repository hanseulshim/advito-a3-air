<template>
  <modal
    classes="modal-container"
    name="delete-normalization-market-modal"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="delete-modal-text">
      {{ 'Are you sure you want to delete this normalization market?' }}
    </div>
    <div class="delete-modal-button-container">
      <button class="button" @click="deleteNormalization">Yes</button>
      <button class="button" @click="hideModal">No</button>
    </div>
  </modal>
</template>

<script>
// import { GET_CONTRACT, GET_PRICING_TERM_LIST } from '@/graphql/queries';
// import { DELETE_PRICING_TERMS } from '@/graphql/mutations';
export default {
  name: 'DeleteNormalizationMarketModal',
  data() {
    return {
      contractId: null,
      idList: []
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('delete-normalization-market-modal');
    },
    async deleteNormalization() {
      //   try {
      //     await this.$apollo.mutate({
      //       mutation: DELETE_PRICING_TERMS,
      //       variables: {
      //         contractId: this.contractId,
      //         idList: this.idList
      //       },
      //       refetchQueries: () => [
      //         {
      //           query: GET_CONTRACT,
      //           variables: { id: this.contractId }
      //         },
      //         {
      //           query: GET_PRICING_TERM_LIST,
      //           variables: { contractId: this.contractId }
      //         }
      //       ]
      //     });
      //     this.$emit('clear-bulk-actions');
      //     this.$modal.show('success', {
      //       message: 'Pricing Term successfully deleted.',
      //       name: 'delete-normalization-modal'
      //     });
      //   } catch (error) {
      //     this.$modal.show('error', {
      //       message: error.message
      //     });
      //   }
      alert('Normalization Market deleted!');
    },
    beforeOpen() {
      // beforeOpen(event) {
      //   this.contractId = event.params.contractId;
      //   this.idList = event.params.idList;
    },
    beforeClose() {
      this.contractId = null;
      this.idList = [];
    }
  }
};
</script>
