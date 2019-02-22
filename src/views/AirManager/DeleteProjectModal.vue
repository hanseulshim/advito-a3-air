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
import { GET_PROJECTS, GET_CLIENT, GET_USER } from '@/graphql/queries';
import { DELETE_PROJECT } from '@/graphql/mutations';
export default {
  name: 'DeleteModal',
  components: {
    SuccessModal,
    ErrorModal
  },
  apollo: {
    user: {
      query: GET_USER
    },
    client: {
      query: GET_CLIENT
    },
    projectList: {
      query: GET_PROJECTS,
      variables() {
        return {
          clientId: this.client.id,
          sessionToken: this.user.sessionToken
        };
      }
    }
  },
  data() {
    return {
      id: null
    };
  },
  methods: {
    deleteProject() {
      this.$apollo
        .mutate({
          mutation: DELETE_PROJECT,
          variables: { sessionToken: this.user.sessionToken, id: this.id }
        })
        .then(() => {
          this.$apollo.queries.projectList.refetch();
          this.$modal.show('success');
        })
        .catch(() => {
          this.$modal.show('error');
        });
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
