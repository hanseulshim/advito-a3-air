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
      clientId: null,
      projectId: null
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
            id: this.id,
            projectId: this.projectId
          },
          refetchQueries: () => [
            {
              query: GET_PREFERRED_AIRLINE_COLLECTION_LIST,
              variables: { clientId: this.clientId, projectId: this.projectId }
            }
          ]
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
