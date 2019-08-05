<template>
  <modal
    classes="modal-container"
    name="delete-travel-sector-collection"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="delete-modal-text">
      Are you sure you want to delete this collection?
    </div>
    <div class="delete-modal-button-container">
      <button class="button" @click="deleteTravelSectorCollection">Yes</button>
      <button class="button" @click="hideModal">No</button>
    </div>
  </modal>
</template>

<script>
import { GET_TRAVEL_SECTOR_COLLECTION_LIST } from '@/graphql/queries';
import { DELETE_TRAVEL_SECTOR_COLLECTION } from '@/graphql/mutations';
export default {
  name: 'DeleteTravelSectorCollectionModal',
  data() {
    return {
      id: null,
      clientId: null,
      projectId: null
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('delete-travel-sector-collection');
    },
    async deleteTravelSectorCollection() {
      try {
        await this.$apollo.mutate({
          mutation: DELETE_TRAVEL_SECTOR_COLLECTION,
          variables: {
            id: this.id,
            projectId: this.projectId
          },
          refetchQueries: () => [
            {
              query: GET_TRAVEL_SECTOR_COLLECTION_LIST,
              variables: { clientId: this.clientId, projectId: this.projectId }
            }
          ]
        });
        this.$modal.show('success', {
          message: 'Travel Sector Collection successfully deleted.',
          name: 'delete-travel-sector-collection'
        });
      } catch (error) {
        this.$modal.show('error', {
          message:
            'Failed to delete travel sector collection. Please try again.'
        });
      }
    },
    beforeOpen(event) {
      const { id, clientId, projectId } = event.params;
      this.id = id;
      this.clientId = clientId;
      this.projectId = projectId;
    },
    beforeClose() {
      this.id = null;
      this.clientId = null;
      this.projectId = null;
    }
  }
};
</script>
