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
import { DELETE_NORMALIZATION_MARKET } from '@/graphql/mutations';
import { GET_NORMALIZATION_MARKET_LIST } from '@/graphql/queries';
export default {
  name: 'DeleteNormalizationMarketModal',
  data() {
    return {
      normMarket: null,
      normalization: null
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('delete-normalization-market-modal');
    },
    async deleteNormalization() {
      try {
        await this.$apollo.mutate({
          mutation: DELETE_NORMALIZATION_MARKET,
          variables: {
            id: this.normMarket.id
          },
          refetchQueries: () => [
            {
              query: GET_NORMALIZATION_MARKET_LIST,
              variables: { normalizationId: this.normalization.id },
            }
          ]
        });
        this.$modal.show('success', {
          message: 'Normalization market successfully deleted.',
          name: 'delete-normalization-market-modal'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    beforeOpen(event) {
      this.normMarket = event.params.normMarket;
      this.normalization = event.params.normalization;
    },
    beforeClose() {
      this.normMarket = null;
    }
  }
};
</script>
