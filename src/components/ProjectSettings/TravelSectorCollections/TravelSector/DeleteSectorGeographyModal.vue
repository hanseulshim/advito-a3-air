<template>
  <modal
    classes="modal-container"
    name="delete-bidirection"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="delete-modal-text">
      Are you sure you want to delete this bidirection?
    </div>
    <div class="delete-modal-button-container">
      <button class="button" @click="deleteSectorGeography">Yes</button>
      <button class="button" @click="hideModal">No</button>
    </div>
  </modal>
</template>

<script>
import { GET_TRAVEL_SECTOR_LIST } from '@/graphql/queries';
import { DELETE_SECTOR_GEOGRAPHY } from '@/graphql/mutations';
export default {
  name: 'DeleteSectorGeographyModal',
  data() {
    return {
      id: null,
      groupId: null
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('delete-bidirection');
    },
    async deleteSectorGeography() {
      try {
        await this.$apollo.mutate({
          mutation: DELETE_SECTOR_GEOGRAPHY,
          variables: {
            id: this.id
          },
          refetchQueries: () => [
            {
              query: GET_TRAVEL_SECTOR_LIST,
              variables: { groupId: this.groupId }
            }
          ]
        });
        this.$modal.show('success', {
          message: 'Bidirection successfully deleted.',
          name: 'delete-bidirection'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: 'Failed to delete bidirection. Please try again.'
        });
      }
    },
    beforeOpen(event) {
      const { id, groupId } = event.params;
      this.id = id;
      this.groupId = groupId;
    },
    beforeClose() {
      this.id = null;
      this.groupId = null;
    }
  }
};
</script>
