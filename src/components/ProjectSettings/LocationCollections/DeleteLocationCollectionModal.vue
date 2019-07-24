<template>
  <modal
    classes="modal-container"
    name="delete-location-collection"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="delete-modal-text">
      Are you sure you want to delete this collection?
    </div>
    <div class="delete-modal-button-container">
      <button class="button" @click="deleteLocationCollection">Yes</button>
      <button class="button" @click="hideModal">No</button>
    </div>
  </modal>
</template>

<script>
import { GET_LOCATION_COLLECTION_LIST } from '@/graphql/queries';
import { DELETE_LOCATION_COLLECTION } from '@/graphql/mutations';
export default {
  name: 'DeleteLocationCollectionModal',
  data() {
    return {
      id: null,
      clientId: null
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('delete-location-collection');
    },
    async deleteLocationCollection() {
      try {
        await this.$apollo.mutate({
          mutation: DELETE_LOCATION_COLLECTION,
          variables: {
            id: this.id
          },
          refetchQueries: () => [
            {
              query: GET_LOCATION_COLLECTION_LIST,
              variables: { clientId: this.clientId }
            }
          ]
        });
        this.$modal.show('success', {
          message: 'Location Collection successfully deleted.',
          name: 'delete-location-collection'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: 'Failed to delete location collection. Please try again.'
        });
      }
    },
    beforeOpen(event) {
      this.id = event.params.id;
      this.clientId = event.params.clientId;
    },
    beforeClose() {
      this.id = null;
      this.clientId = null;
    }
  }
};
</script>
