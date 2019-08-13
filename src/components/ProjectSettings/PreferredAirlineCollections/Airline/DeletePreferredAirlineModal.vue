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
import {
  GET_PREFERRED_AIRLINE_LIST,
  GET_PREFERRED_AIRLINE_COLLECTION
} from '@/graphql/queries';
import { DELETE_PREFERRED_AIRLINE } from '@/graphql/mutations';
export default {
  name: 'DeletePreferredAirlineModal',
  data() {
    return {
      id: null,
      groupId: null
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('delete-preferred-airline');
    },
    async deletePreferredAirline() {
      try {
        await this.$apollo.mutate({
          mutation: DELETE_PREFERRED_AIRLINE,
          variables: {
            id: this.id
          },
          refetchQueries: () => [
            {
              query: GET_PREFERRED_AIRLINE_LIST,
              variables: { groupId: this.groupId }
            },
            {
              query: GET_PREFERRED_AIRLINE_COLLECTION,
              variables: {
                id: this.groupId,
                projectId: this.projectId
              }
            }
          ]
        });
        this.$emit('toggle-row', this.groupId);
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
