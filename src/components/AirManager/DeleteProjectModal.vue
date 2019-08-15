<template>
  <modal
    classes="modal-container"
    name="delete"
    height="auto"
    :click-to-close="false"
    @before-open="beforeOpen"
  >
    <div class="delete-modal-text">
      Are you sure you want to delete this project?
    </div>
    <div class="delete-modal-button-container">
      <button class="button" @click="deleteProject">Yes</button>
      <button class="button" @click="hideModal">No</button>
    </div>
  </modal>
</template>

<script>
import { DELETE_PROJECT } from '@/graphql/mutations';
import { GET_PROJECTS } from '@/graphql/queries';
export default {
  name: 'DeleteModal',
  data() {
    return {
      id: null,
      clientId: null,
      userId: null
    };
  },
  methods: {
    async deleteProject() {
      try {
        await this.$apollo.mutate({
          mutation: DELETE_PROJECT,
          variables: {
            id: this.id
          },
          update: (store, { data: { deleteProject } }) => {
            const query = {
              query: GET_PROJECTS,
              variables: { clientId: this.clientId, userId: this.userId }
            };
            const data = store.readQuery(query);
            data.projectList = data.projectList.filter(
              p => p.id !== deleteProject
            );
            store.writeQuery({
              ...query,
              data
            });
          }
        });
        this.$modal.show('success', {
          message: 'Project successfully deleted.',
          name: 'delete'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: 'Failed to delete project. Please try again'
        });
      }
    },
    beforeOpen(event) {
      const { id, clientId, userId } = event.params;
      this.id = id;
      this.clientId = clientId;
      this.userId = userId;
    },
    hideModal() {
      this.$modal.hide('delete');
    }
  }
};
</script>
