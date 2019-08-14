<template>
  <modal
    classes="modal-container"
    name="delete-normalization-modal"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="delete-modal-text">
      {{ 'Are you sure you want to delete this normalization?' }}
    </div>
    <div class="delete-modal-button-container">
      <button class="button" @click="deleteNormalization">Yes</button>
      <button class="button" @click="hideModal">No</button>
    </div>
  </modal>
</template>

<script>
import { DELETE_NORMALIZATION } from '@/graphql/mutations';
import { GET_NORMALIZATION_LIST } from '@/graphql/queries';
export default {
  name: 'DeleteNormalizationModal',
  data() {
    return {
      id: null,
      discountId: null
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('delete-normalization-modal');
    },
    async deleteNormalization() {
      try {
        await this.$apollo.mutate({
          mutation: DELETE_NORMALIZATION,
          variables: {
            id: this.id
          },
          refetchQueries: () => [
            {
              query: GET_NORMALIZATION_LIST,
              variables: {
                discountId: this.discountId
              },
              fetchPolicy: 'network-only'
            }
          ]
        });
        this.$modal.show('success', {
          message: 'Normalization successfully deleted.',
          name: 'delete-normalization-modal'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    beforeOpen(event) {
      this.id = event.params.id;
      this.discountId = event.params.discountId;
    },
    beforeClose() {
      this.id = null;
      this.discountId = null;
    }
  }
};
</script>
