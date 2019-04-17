<template>
  <modal
    classes="modal-container"
    name="delete-pricing-term"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="delete-modal-text">
      Are you sure you want to delete this pricing term?
    </div>
    <div class="delete-modal-button-container">
      <button class="button" @click="deletePricingTerm">Yes</button>
      <button class="button" @click="hideModal">No</button>
    </div>
  </modal>
</template>

<script>
import { GET_PRICING_TERM_LIST } from '@/graphql/queries';
import { DELETE_PRICING_TERMS } from '@/graphql/mutations';
export default {
  name: 'DeletePricingTermModal',
  data() {
    return {
      idList: []
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('delete-pricing-term');
    },
    async deletePricingTerm() {
      try {
        await this.$apollo.mutate({
          mutation: DELETE_PRICING_TERMS,
          variables: {
            idList: this.idList
          },
          update: (store, data) => {
            const idList = data.data.deletePricingTerms;
            const newData = store.readQuery({
              query: GET_PRICING_TERM_LIST
            });
            const indexList = newData.pricingTermList.filter(
              term => idList.indexOf(term.id) !== -1
            );
            indexList.forEach(index => {
              newData.pricingTermList.splice(index, 1);
            });
            store.writeQuery({
              query: GET_PRICING_TERM_LIST,
              data: newData
            });
          }
        });
        this.$modal.show('success', {
          message: 'Pricing Term successfully deleted.',
          name: 'delete-pricing-term'
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
