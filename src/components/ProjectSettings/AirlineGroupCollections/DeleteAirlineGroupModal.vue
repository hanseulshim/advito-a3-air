<template>
  <modal
    classes="modal-container"
    name="delete-airline-group"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="delete-modal-text">
      Are you sure you want to delete this airline group?
    </div>
    <div class="delete-modal-button-container">
      <button class="button" @click="deleteAirlineGroup">Yes</button>
      <button class="button" @click="hideModal">No</button>
    </div>
  </modal>
</template>

<script>
import { DELETE_AIRLINE_GROUP } from '@/graphql/mutations';
export default {
  name: 'DeleteAirlineGroupModal',
  data() {
    return {
      id: null,
      collectionId: null
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('delete-airline-group');
    },
    async deleteAirlineGroup() {
      try {
        const data = await this.$apollo.mutate({
          mutation: DELETE_AIRLINE_GROUP,
          variables: {
            id: this.id,
            collectionId: this.collectionId
          }
        });
        this.$emit('toggle-row', data.data.deleteAirlineGroup.id);
        this.$modal.show('success', {
          message: 'Airline Group successfully deleted.',
          name: 'delete-airline-group'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: 'Failed to delete airline group. Please try again.'
        });
      }
    },
    beforeOpen(event) {
      const airlineGroup = event.params.airlineGroup;
      const collectionId = event.params.collectionId;
      this.id = airlineGroup.id;
      this.collectionId = collectionId;
    },
    beforeClose() {
      this.id = null;
      this.collectionId = null;
    }
  }
};
</script>
