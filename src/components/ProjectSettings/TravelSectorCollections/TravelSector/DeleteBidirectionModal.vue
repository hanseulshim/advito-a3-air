<template>
  <modal
    classes="modal-container"
    name="delete-bidirection"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="delete-modal-text">
      Are you sure you want to delete this bidirection?
    </div>
    <div class="delete-modal-button-container">
      <button class="button" @click="deleteBidirection">Yes</button>
      <button class="button" @click="hideModal">No</button>
    </div>
  </modal>
</template>

<script>
import { DELETE_BIDIRECTION } from '@/graphql/mutations';
export default {
  name: 'DeleteBidirectionModal',
  data() {
    return {
      id: null,
      collectionId: null,
      index: null
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('delete-bidirection');
    },
    async deleteBidirection() {
      try {
        const data = await this.$apollo.mutate({
          mutation: DELETE_BIDIRECTION,
          variables: {
            id: this.id,
            collectionId: this.collectionId,
            index: this.index
          }
        });
        this.$emit('toggle-row', data.data.deleteBidirection.id);
        this.$modal.show('success', {
          message: 'Bidirection successfully deleted.',
          name: 'delete-bidirection'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: 'Failed to delete bidirection. Please try again.'
        });
      }
    },
    beforeOpen(event) {
      const id = event.params.id;
      const collectionId = event.params.collectionId;
      const index = event.params.index;
      this.id = id;
      this.collectionId = collectionId;
      this.index = index;
    },
    beforeClose() {
      this.id = null;
      this.collectionId = null;
      this.index = null;
    }
  }
};
</script>
