<template>
  <modal
    classes="modal-container"
    name="copy-location-collection"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <el-form
      ref="copyLocationCollection"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="150px"
      hide-required-asterisk
    >
      <div class="title-row space-between">
        <div class="section-header">copy location collection</div>
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
import { GET_LOCATION_COLLECTION_LIST } from '@/graphql/queries';
import { COPY_LOCATION_COLLECTION } from '@/graphql/mutations';
export default {
  name: 'CopyLocationCollectionModal',
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
      project: {},
      client: {}
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('copy-location-collection');
    },
    validateForm() {
      this.$refs.copyLocationCollection.validate(valid => {
        if (valid) {
          this.copyLocationCollection();
        } else {
          return false;
        }
      });
    },
    async copyLocationCollection() {
      try {
        const {
          data: { copyLocationCollection }
        } = await this.$apollo.mutate({
          mutation: COPY_LOCATION_COLLECTION,
          variables: {
            ...this.form,
            projectId: this.project.id,
            clientId: this.client.id
          },
          refetchQueries: () => [
            {
              query: GET_LOCATION_COLLECTION_LIST,
              variables: { clientId: this.client.id }
            }
          ]
        });
        this.$emit('toggle-row', copyLocationCollection);
        this.$modal.show('success', {
          message: 'Location Collection successfully copied.',
          name: 'copy-location-collection'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    beforeOpen(event) {
      const { id, name } = event.params.collection;
      this.client = event.params.client;
      this.project = event.params.project;
      this.form.id = id;
      this.form.name = name;
    },
    beforeClose() {
      this.form.id = null;
      this.form.name = null;
      this.form.description = null;
    }
  }
};
</script>
