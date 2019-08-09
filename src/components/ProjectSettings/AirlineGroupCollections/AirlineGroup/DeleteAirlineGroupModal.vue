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
import {
  GET_AIRLINE_GROUP_LIST,
  GET_AIRLINE_GROUP_COLLECTION
} from '@/graphql/queries';
import { DELETE_AIRLINE_GROUP } from '@/graphql/mutations';
export default {
  name: 'DeleteAirlineGroupModal',
  data() {
    return {
      id: null,
      collectionId: null,
      projectId: null
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('delete-airline-group');
    },
    async deleteAirlineGroup() {
      try {
        await this.$apollo.mutate({
          mutation: DELETE_AIRLINE_GROUP,
          variables: {
            id: this.id
          },
          refetchQueries: () => [
            {
              query: GET_AIRLINE_GROUP_LIST,
              variables: { collectionId: this.collectionId }
            },
            {
              query: GET_AIRLINE_GROUP_COLLECTION,
              variables: {
                id: this.collectionId,
                projectId: this.projectId
              }
            }
          ]
        });
        this.$emit('toggle-row', this.collectionId);
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
      const { id, collectionId, projectId } = event.params;
      this.id = id;
      this.collectionId = collectionId;
      this.projectId = projectId;
    },
    beforeClose() {
      this.id = null;
      this.collectionId = null;
      this.projectId = null;
    }
  }
};
</script>
