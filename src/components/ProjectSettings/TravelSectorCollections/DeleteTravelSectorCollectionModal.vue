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
      active: null
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
            id: this.id
          },
          update: (store, data) => {
            const id = data.data.deleteTravelSectorCollection;
            const newData = store.readQuery({
              query: GET_TRAVEL_SECTOR_COLLECTION_LIST
            });
            const projectIndex = newData.travelSectorCollectionList.findIndex(
              project => project.id === id
            );
            newData.travelSectorCollectionList.splice(projectIndex, 1);
            if (this.active) {
              const advitoStandard = newData.travelSectorCollectionList.filter(
                collection => collection.id === 1
              )[0];
              advitoStandard.active = true;
            }
            store.writeQuery({
              query: GET_TRAVEL_SECTOR_COLLECTION_LIST,
              data: newData
            });
          }
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
      const collection = event.params.collection;
      this.id = collection.id;
      this.active = collection.active;
    },
    beforeClose() {
      this.id = null;
      this.active = null;
    }
  }
};
</script>
