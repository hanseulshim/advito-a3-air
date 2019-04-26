<template>
  <modal
    classes="modal-container"
    name="new-location-collection"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <el-form
      ref="newLocationCollection"
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
        <button class="button" @click="validateForm">SAVE</button>
      </el-form-item>
    </el-form>
  </modal>
</template>

<script>
import {
  GET_CLIENT,
  GET_PROJECT,
  GET_LOCATION_COLLECTION_LIST
} from '@/graphql/queries';
import { CREATE_LOCATION_COLLECTION } from '@/graphql/mutations';
export default {
  name: 'NewLocationCollectionModal',
  apollo: {
    client: {
      query: GET_CLIENT
    },
    project: {
      query: GET_PROJECT
    }
  },
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
      this.$modal.hide('new-location-collection');
    },
    validateForm() {
      this.$refs.newLocationCollection.validate(valid => {
        if (valid) {
          this.createLocationCollection();
        } else {
          return false;
        }
      });
    },
    async createLocationCollection() {
      try {
        const data = await this.$apollo.mutate({
          mutation: CREATE_LOCATION_COLLECTION,
          variables: {
            ...this.form
          },
          update: (store, data) => {
            const locationCollection = data.data.createLocationCollection;
            const newData = store.readQuery({
              query: GET_LOCATION_COLLECTION_LIST
            });
            newData.locationCollectionList.forEach(
              collection => (collection.active = false)
            );
            newData.locationCollectionList.push(locationCollection);
            store.writeQuery({
              query: GET_LOCATION_COLLECTION_LIST,
              data: newData
            });
          }
        });
        this.$emit('toggle-row', data.data.createLocationCollection.id);
        this.$modal.show('success', {
          message: 'Location Collection successfully created.',
          name: 'new-location-collection'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    beforeOpen(event) {
      const collection = event.params.collection;
      this.form.id = collection.id;
      this.form.name = collection.name;
    },
    beforeClose() {
      this.form.id = null;
      this.form.name = null;
      this.form.description = null;
    }
  }
};
</script>
