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
import {
  GET_TRAVEL_SECTOR_LIST,
  GET_TRAVEL_SECTOR_COLLECTION
} from '@/graphql/queries';
import { DELETE_TRAVEL_SECTOR } from '@/graphql/mutations';
export default {
  name: 'DeleteTravelSectorModal',
  data() {
    return {
      id: null,
      groupId: null,
      projectId: null
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('delete-travel-sector');
    },
    async deleteTravelSector() {
      try {
        await this.$apollo.mutate({
          mutation: DELETE_TRAVEL_SECTOR,
          variables: {
            id: this.id
          },
          refetchQueries: () => [
            {
              query: GET_TRAVEL_SECTOR_LIST,
              variables: { groupId: this.groupId }
            },
            {
              query: GET_TRAVEL_SECTOR_COLLECTION,
              variables: { id: this.groupId, projectId: this.projectId }
            }
          ]
        });
        this.$emit('toggle-row', this.groupId);
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
      const { id, groupId, projectId } = event.params;
      this.id = id;
      this.groupId = groupId;
      this.projectId = projectId;
    },
    beforeClose() {
      this.id = null;
      this.groupId = null;
      this.projectId = null;
    }
  }
};
</script>
