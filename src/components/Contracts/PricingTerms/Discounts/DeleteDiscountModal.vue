<template>
  <modal
    classes="modal-container"
    name="delete-discount"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="delete-modal-text">
      {{
        idList.length > 1
          ? 'Are you sure you want to delete these discounts?'
          : 'Are you sure you want to delete this discount?'
      }}
    </div>
    <div class="delete-modal-button-container">
      <button class="button" @click="deleteDiscount">Yes</button>
      <button class="button" @click="hideModal">No</button>
    </div>
  </modal>
</template>

<script>
import { GET_DISCOUNT_LIST, GET_PRICING_TERM } from '@/graphql/queries';
import { DELETE_DISCOUNTS } from '@/graphql/mutations';
export default {
  name: 'DeleteDiscountModal',
  data() {
    return {
      idList: [],
      pricingTermId: null
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('delete-discount');
    },
    async deleteDiscount() {
      try {
        await this.$apollo.mutate({
          mutation: DELETE_DISCOUNTS,
          variables: {
            idList: this.idList,
            pricingTermId: this.pricingTermId
          },
          refetchQueries: () => [
            {
              query: GET_PRICING_TERM,
              variables: {
                id: this.pricingTermId
              }
            },
            {
              query: GET_DISCOUNT_LIST,
              variables: { pricingTermId: this.pricingTermId }
            }
          ]
        });
        this.$emit('toggle-row', this.pricingTermId);
        this.$modal.show('success', {
          message: 'Discount(s) successfully deleted.',
          name: 'delete-discount'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    beforeOpen(event) {
      this.idList = event.params.idList;
      this.pricingTermId = event.params.pricingTermId;
    },
    beforeClose() {
      this.idList = [];
      this.pricingTermId = null;
    }
  }
};
</script>
