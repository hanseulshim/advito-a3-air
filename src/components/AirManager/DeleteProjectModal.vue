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
import { GET_CLIENT, GET_PROJECTS } from '@/graphql/queries';
export default {
  name: 'DeleteModal',
  data() {
    return {
      id: null
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
          update: (store, data) => {
            const id = data.data.deleteProject;
            const client = store.readQuery({
              query: GET_CLIENT
            }).client;
            const newData = store.readQuery({
              query: GET_PROJECTS,
              variables: { clientId: client.id }
            });
            const projectIndex = newData.projectList.findIndex(
              project => project.id === id
            );
            newData.projectList.splice(projectIndex, 1);
            store.writeQuery({
              query: GET_PROJECTS,
              variables: { clientId: client.id },
              data: newData
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
      this.id = event.params.id;
    },
    hideModal() {
      this.$modal.hide('delete');
    }
  }
};
</script>
