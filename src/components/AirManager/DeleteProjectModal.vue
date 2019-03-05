<template>
  <modal
    classes="modal-container"
    name="delete"
    height="auto"
    :click-to-close="false"
    @before-open="beforeOpen"
  >
    <div style="text-align: center">
      Are you sure you want to delete this project?
    </div>
    <div class="close-container">
      <button class="button" @click="deleteProject">Yes</button>
      <button class="button" @click="hideModal">No</button>
    </div>
    <SuccessModal
      :hide-modal="hideModal"
      message="Project successfully deleted."
    />
    <ErrorModal message="Failed to delete project. Please try again" />
  </modal>
</template>

<script>
import SuccessModal from '@/components/Modals/SuccessModal.vue';
import ErrorModal from '@/components/Modals/ErrorModal.vue';
import { DELETE_PROJECT } from '@/graphql/mutations';
import { GET_CLIENT, GET_PROJECTS } from '@/graphql/queries';
export default {
  name: 'DeleteModal',
  components: {
    SuccessModal,
    ErrorModal
  },
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
        this.$modal.show('success');
      } catch (error) {
        this.$modal.show('error');
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

<style lang="scss" scoped>
.close-container {
  display: flex;
  justify-content: space-evenly;
  margin-top: 2em;
}
</style>
