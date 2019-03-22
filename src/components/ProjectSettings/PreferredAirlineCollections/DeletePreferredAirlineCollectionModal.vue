<template>
  <modal
    classes="modal-container"
    name="delete-preferred-airline-collection"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="delete-modal-text">
      Are you sure you want to delete this collection?
    </div>
    <div class="delete-modal-button-container">
      <button class="button" @click="deletePreferredAirlineCollection">
        Yes
      </button>
      <button class="button" @click="hideModal">No</button>
    </div>
  </modal>
</template>

<script>
import { GET_PREFERRED_AIRLINE_COLLECTION_LIST } from '@/graphql/queries';
import { DELETE_PREFERRED_AIRLINE_COLLECTION } from '@/graphql/mutations';
export default {
  name: 'DeletePreferredAirlineCollectionModal',
  data() {
    return {
      id: null,
      active: null
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('delete-preferred-airline-collection');
    },
    async deletePreferredAirlineCollection() {
      try {
        await this.$apollo.mutate({
          mutation: DELETE_PREFERRED_AIRLINE_COLLECTION,
          variables: {
            id: this.id
          },
          update: (store, data) => {
            const id = data.data.deletePreferredAirlineCollection;
            const newData = store.readQuery({
              query: GET_PREFERRED_AIRLINE_COLLECTION_LIST
            });
            const projectIndex = newData.preferredAirlineCollectionList.findIndex(
              project => project.id === id
            );
            newData.preferredAirlineCollectionList.splice(projectIndex, 1);
            if (this.active) {
              const advitoStandard = newData.preferredAirlineCollectionList.filter(
                collection => collection.id === 1
              )[0];
              advitoStandard.active = true;
            }
            store.writeQuery({
              query: GET_PREFERRED_AIRLINE_COLLECTION_LIST,
              data: newData
            });
          }
        });
        this.$modal.show('success', {
          message: 'Preferred Airline Collection successfully deleted.',
          name: 'delete-preferred-airline-collection'
        });
      } catch (error) {
        this.$modal.show('error', {
          message:
            'Failed to delete preferred airline collection. Please try again.'
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
