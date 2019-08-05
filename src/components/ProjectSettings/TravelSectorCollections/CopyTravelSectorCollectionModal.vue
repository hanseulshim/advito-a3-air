<template>
  <modal
    classes="modal-container"
    name="new-travel-sector-collection"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <el-form
      ref="newTravelSectorCollection"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="150px"
      hide-required-asterisk
    >
      <div class="title-row space-between">
        <div class="section-header">copy travel sector collection</div>
        <el-tooltip effect="dark" content="Close Modal" placement="top">
          <i class="fas fa-times close-modal-button" @click="hideModal" />
        </el-tooltip>
      </div>
      <div>
        <div class="form-label-no-select">Client</div>
        <span>{{ client.name }}</span>
      </div>
      <div>
        <div class="form-label-no-select">Project</div>
        <span>{{ project.name }}</span>
      </div>
      <el-form-item label="Collection Name *" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="form.description" type="textarea" />
      </el-form-item>
      <el-form-item class="save-container">
        <button class="button" type="button" @click="validateForm">SAVE</button>
      </el-form-item>
    </el-form>
  </modal>
</template>

<script>
import { GET_TRAVEL_SECTOR_COLLECTION_LIST } from '@/graphql/queries';
import { COPY_TRAVEL_SECTOR_COLLECTION } from '@/graphql/mutations';
export default {
  name: 'CopyTravelSectorCollectionModal',
  data() {
    return {
      form: {
        id: null,
        name: null,
        description: null
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please input a collection name.',
            trigger: 'change'
          }
        ]
      },
      client: {},
      project: {}
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('new-travel-sector-collection');
    },
    validateForm() {
      this.$refs.newTravelSectorCollection.validate(valid => {
        if (valid) {
          this.copyTravelSectorCollection();
        } else {
          return false;
        }
      });
    },
    async copyTravelSectorCollection() {
      try {
        await this.$apollo.mutate({
          mutation: COPY_TRAVEL_SECTOR_COLLECTION,
          variables: {
            ...this.form,
            clientId: this.client.id,
            projectId: this.project.id
          },
          refetchQueries: () => [
            {
              query: GET_TRAVEL_SECTOR_COLLECTION_LIST,
              variables: {
                clientId: this.client.id,
                projectId: this.project.id
              }
            }
          ]
        });
        this.$modal.show('success', {
          message: 'Travel Sector Collection successfully created.',
          name: 'new-travel-sector-collection'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    beforeOpen(event) {
      const { collection, client, project } = event.params;
      this.form.id = collection.id;
      this.form.name = collection.name;
      this.client = client;
      this.project = project;
    },
    beforeClose() {
      this.form.id = null;
      this.form.name = null;
      this.form.description = null;
    }
  }
};
</script>
