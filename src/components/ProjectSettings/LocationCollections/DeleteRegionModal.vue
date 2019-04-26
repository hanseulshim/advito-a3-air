<template>
  <modal
    classes="modal-container"
    name="delete-region"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="title-row space-between">
      <div class="section-header">delete region</div>
      <el-tooltip effect="dark" content="Close Modal" placement="top">
        <i class="fas fa-times close-modal-button" @click="hideModal" />
      </el-tooltip>
    </div>
    <div v-if="deleteRegionStatus" class="delete-modal-text">
      Are you sure you want to delete this region?
    </div>
    <div v-else class="delete-modal-text">
      This Region has {{ countryListLength }} Countries and can not be deleted.
      Please move all countries to another Region in order to delete this
      Region.
    </div>
    <div class="delete-modal-button-container">
      <button v-if="deleteRegionStatus" class="button" @click="deleteRegion">
        Yes
      </button>
      <button v-if="deleteRegionStatus" class="button" @click="hideModal">
        No
      </button>
      <button v-else class="button" @click="hideModal">
        OK
      </button>
    </div>
  </modal>
</template>

<script>
import { DELETE_REGION } from '@/graphql/mutations';
export default {
  name: 'DeleteRegionModal',
  data() {
    return {
      form: {
        id: null,
        collectionId: null
      },
      deleteRegionStatus: null,
      countryListLength: null
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('delete-region');
    },
    async deleteRegion() {
      try {
        await this.$apollo.mutate({
          mutation: DELETE_REGION,
          variables: {
            ...this.form
          }
        });
        this.$emit('toggle-row', this.form.collectionId);
        this.$modal.show('success', {
          message: 'Region successfully deleted.',
          name: 'delete-region'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: 'Failed to delete region. Please try again.'
        });
        this.hideModal();
      }
    },
    beforeOpen(event) {
      const collection = event.params.collection;
      const region = event.params.region;
      this.form.id = region.id;
      this.form.collectionId = collection.id;
      this.deleteRegionStatus = region.countryList.length === 0;
      this.countryListLength = region.countryList.length;
    },
    beforeClose() {
      this.form.id = null;
      this.form.collectionId = null;
      this.deleteRegionStatus = null;
      this.countryListLength = null;
    }
  }
};
</script>
