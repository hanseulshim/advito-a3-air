<template>
  <modal
    classes="modal-container"
    name="delete-preferred-airline"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="delete-modal-text">
      Are you sure you want to delete this airline?
    </div>
    <div class="delete-modal-button-container">
      <button class="button" @click="deletePreferredAirline">Yes</button>
      <button class="button" @click="hideModal">No</button>
    </div>
  </modal>
</template>

<script>
import { DELETE_PREFERRED_AIRLINE } from '@/graphql/mutations';
export default {
  name: 'DeletePreferredAirlineModal',
  data() {
    return {
      id: null,
      collectionId: null
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('delete-preferred-airline');
    },
    async deletePreferredAirline() {
      try {
        const data = await this.$apollo.mutate({
          mutation: DELETE_PREFERRED_AIRLINE,
          variables: {
            id: this.id,
            collectionId: this.collectionId
          }
        });
        this.$emit('toggle-row', data.data.deletePreferredAirline.id);
        this.$modal.show('success', {
          message: 'Preferred Airline successfully deleted.',
          name: 'delete-preferred-airline'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: 'Failed to delete preferred airline. Please try again.'
        });
      }
    },
    beforeOpen(event) {
      const airline = event.params.airline;
      const collectionId = event.params.collectionId;
      this.id = airline.id;
      this.collectionId = collectionId;
    },
    beforeClose() {
      this.id = null;
      this.collectionId = null;
    }
  }
};
</script>
