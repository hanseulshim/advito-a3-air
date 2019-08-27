<template>
  <modal
    classes="modal-container"
    name="copy-normalization-modal"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="delete-modal-text">
      {{ 'Are you sure you want to copy this normalization?' }}
    </div>
    <div class="delete-modal-button-container">
      <button class="button" @click="copyNormalization">Yes</button>
      <button class="button" @click="hideModal">No</button>
    </div>
  </modal>
</template>
<script>
import { COPY_NORMALIZATION } from '@/graphql/mutations';
import { GET_NORMALIZATION_LIST, GET_DISCOUNT_LIST } from '@/graphql/queries';
export default {
  name: 'CopyNormalizationModal',

  data() {
    return {
      normalization: null,
      discountId: null,
      pricingTermId: null
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('copy-normalization-modal');
    },
    async copyNormalization() {
      try {
        await this.$apollo.mutate({
          mutation: COPY_NORMALIZATION,
          variables: {
            id: this.normalization.id
          },
          refetchQueries: () => [
            {
              query: GET_NORMALIZATION_LIST,
              variables: {
                discountId: this.discountId
              }
            },
            {
              query: GET_DISCOUNT_LIST,
              variables: {
                pricingTermId: this.pricingTermId
              }
            }
          ]
        });
        this.$modal.show('success', {
          message: 'Normalization successfully copied.',
          name: 'copy-normalization-modal'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    beforeOpen(event) {
      this.normalization = event.params.normalization;
      this.discountId = event.params.discountId;
      this.pricingTermId = event.params.pricingTermId;
    },
    beforeClose() {
      this.normalization = null;
      this.discountId = null;
      this.pricingTermId = null;
    }
  }
};
</script>
<style lang="scss">
@import '@/styles/global.scss';
@import './styles.scss';
</style>
