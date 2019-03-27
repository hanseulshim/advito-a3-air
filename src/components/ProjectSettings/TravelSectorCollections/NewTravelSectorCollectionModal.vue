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
        <i class="fas fa-times close-modal-button" @click="hideModal"></i>
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
  GET_TRAVEL_SECTOR_COLLECTION_LIST
} from '@/graphql/queries';
import { CREATE_TRAVEL_SECTOR_COLLECTION } from '@/graphql/mutations';
export default {
  name: 'NewTravelSectorCollectionModal',
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
      this.$modal.hide('new-travel-sector-collection');
    },
    validateForm() {
      this.$refs.newTravelSectorCollection.validate(valid => {
        if (valid) {
          this.createTravelSectorCollection();
        } else {
          return false;
        }
      });
    },
    async createTravelSectorCollection() {
      try {
        const data = await this.$apollo.mutate({
          mutation: CREATE_TRAVEL_SECTOR_COLLECTION,
          variables: {
            ...this.form
          },
          update: (store, data) => {
            const travelSectorCollection =
              data.data.createTravelSectorCollection;
            const newData = store.readQuery({
              query: GET_TRAVEL_SECTOR_COLLECTION_LIST
            });
            newData.travelSectorCollectionList.forEach(
              collection => (collection.active = false)
            );
            newData.travelSectorCollectionList.push(travelSectorCollection);
            store.writeQuery({
              query: GET_TRAVEL_SECTOR_COLLECTION_LIST,
              data: newData
            });
          }
        });
        this.$emit('toggle-row', data.data.createTravelSectorCollection.id);
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
