<template>
  <modal
    classes="modal-container"
    name="edit-preferred-airline-collection"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <el-form
      ref="editPreferredAirlineCollection"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="150px"
      hide-required-asterisk
    >
      <div class="title-row space-between">
        <div class="section-header">edit preferred airline collection</div>
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
import { GET_CLIENT, GET_PROJECT } from '@/graphql/queries';
import { EDIT_PREFERRED_AIRLINE_COLLECTION } from '@/graphql/mutations';
export default {
  name: 'EditPreferredAirlineCollectionModal',
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
      this.$modal.hide('edit-preferred-airline-collection');
    },
    validateForm() {
      this.$refs.editPreferredAirlineCollection.validate(valid => {
        if (valid) {
          this.editPreferredAirlineCollection();
        } else {
          return false;
        }
      });
    },
    async editPreferredAirlineCollection() {
      try {
        const data = await this.$apollo.mutate({
          mutation: EDIT_PREFERRED_AIRLINE_COLLECTION,
          variables: {
            ...this.form
          }
        });
        this.$emit('toggle-row', data.data.editPreferredAirlineCollection.id);
        this.$modal.show('success', {
          message: 'Preferred Airline Collection successfully edited.',
          name: 'edit-preferred-airline-collection'
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
      this.form.description = collection.description;
    },
    beforeClose() {
      this.form.id = null;
      this.form.name = null;
      this.form.description = null;
    }
  }
};
</script>
