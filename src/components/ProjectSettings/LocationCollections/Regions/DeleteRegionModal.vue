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
    <div v-if="!countryListLength" class="delete-modal-text">
      Are you sure you want to delete this region?
    </div>
    <div v-else class="delete-modal-text">
      This Region has {{ countryListLength }} Countries and can not be deleted.
      Please move all countries to another Region in order to delete this
      Region.
    </div>
    <div class="delete-modal-button-container">
      <button v-if="!countryListLength" class="button" @click="deleteRegion">
        Yes
      </button>
      <button v-if="!countryListLength" class="button" @click="hideModal">
        No
      </button>
      <button v-else class="button" @click="hideModal">
        OK
      </button>
    </div>
  </modal>
</template>

<script>
import { GET_REGION_LIST, GET_LOCATION_COLLECTION } from '@/graphql/queries';
import { DELETE_REGION } from '@/graphql/mutations';
export default {
  name: 'DeleteRegionModal',
  data() {
    return {
      id: null,
      geoSetId: null,
      countryListLength: null,
      projectId: null
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
            id: this.id
          },
          update: (store, { data: { deleteRegion } }) => {
            const query = {
              query: GET_REGION_LIST,
              variables: {
                geoSetId: this.geoSetId
              }
            };
            const data = store.readQuery(query);
            data.regionList = data.regionList.filter(
              r => r.id !== deleteRegion
            );
            store.writeQuery({
              ...query,
              data
            });
          },
          refetchQueries: () => [
            {
              query: GET_LOCATION_COLLECTION,
              variables: { id: this.geoSetId, projectId: this.projectId }
            }
          ]
        });
        this.$emit('toggle-row', this.geoSetId);
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
      const { id, countryListLength, geoSetId, projectId } = event.params;
      this.id = id;
      this.geoSetId = geoSetId;
      this.countryListLength = countryListLength;
      this.projectId = projectId;
    },
    beforeClose() {
      this.id = null;
      this.geoSetId = null;
      this.countryListLength = null;
      this.projectId = null;
    }
  }
};
</script>
