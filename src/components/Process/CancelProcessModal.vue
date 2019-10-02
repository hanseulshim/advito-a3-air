<template>
  <modal classes="modal-container" name="cancel-process" height="auto">
    <div class="title-row space-between">
      <div class="section-header">cancel process</div>
      <el-tooltip effect="dark" content="Close Modal" placement="top">
        <i class="fas fa-times close-modal-button" @click="hideModal"></i>
      </el-tooltip>
    </div>
    <div>
      All processed records will be deleted. Are you sure you would like to
      cancel Processing?
    </div>
    <div class="delete-modal-button-container">
      <button class="button" @click="hideModal">No</button>
      <button class="button" @click="stopProcess">Yes</button>
    </div>
  </modal>
</template>

<script>
import {
  GET_PROJECT,
  GET_PROCESS,
  GET_RECENT_PROCESS_LIST
} from '@/graphql/queries';
import { STOP_PROCESS } from '@/graphql/mutations';
export default {
  name: 'CancelProcessModal',
  apollo: {
    project: {
      query: GET_PROJECT
    }
  },
  methods: {
    hideModal() {
      this.$modal.hide('cancel-process');
    },
    stopProcess() {
      this.$apollo.mutate({
        mutation: STOP_PROCESS,
        variables: { projectId: this.project.id },
        refetchQueries: () => [
          {
            query: GET_PROCESS,
            variables: {
              projectId: this.project.id
            }
          },
          {
            query: GET_RECENT_PROCESS_LIST,
            variables: {
              projectId: this.project.id
            }
          }
        ]
      });
      this.hideModal();
    }
  }
};
</script>
