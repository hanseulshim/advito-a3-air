<template>
  <modal
    classes="modal-container"
    name="delete-travel-sector"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="delete-modal-text">
      Are you sure you want to delete this travel sector?
    </div>
    <div class="delete-modal-button-container">
      <button class="button" @click="deleteTravelSector">Yes</button>
      <button class="button" @click="hideModal">No</button>
    </div>
  </modal>
</template>

<script>
import { DELETE_TRAVEL_SECTOR } from '@/graphql/mutations';
export default {
  name: 'DeleteTravelSectorModal',
  data() {
    return {
      id: null,
      collectionId: null
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('delete-travel-sector');
    },
    async deleteTravelSector() {
      try {
        const data = await this.$apollo.mutate({
          mutation: DELETE_TRAVEL_SECTOR,
          variables: {
            id: this.id,
            collectionId: this.collectionId
          }
        });
        this.$emit('toggle-row', data.data.deleteTravelSector.id);
        this.$modal.show('success', {
          message: 'Travel Sector successfully deleted.',
          name: 'delete-travel-sector'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: 'Failed to delete travel sector. Please try again.'
        });
      }
    },
    beforeOpen(event) {
      const sector = event.params.sector;
      const collectionId = event.params.collectionId;
      this.id = sector.id;
      this.collectionId = collectionId;
    },
    beforeClose() {
      this.id = null;
      this.collectionId = null;
    }
  }
};
</script>
