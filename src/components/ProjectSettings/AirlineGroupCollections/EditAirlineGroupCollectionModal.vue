<template>
  <modal
    classes="modal-container"
    name="edit-airline-group-collection"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <el-form
      ref="editAirlineGroupCollection"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="150px"
      hide-required-asterisk
    >
      <div class="title-row space-between">
        <div class="section-header">edit airline group collection</div>
        <el-tooltip effect="dark" content="Close Modal" placement="top">
          <i class="fas fa-times close-modal-button" @click="hideModal"></i>
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
      <el-form-item label="Effective Dates *">
        <div class="date-picker-container">
          <el-form-item prop="effectiveStartDate" class="date-picker-item">
            <el-date-picker
              v-model="form.effectiveStartDate"
              type="date"
              format="dd MMM yyyy"
              class="date-picker"
            />
          </el-form-item>
          <el-form-item prop="effectiveEndDate" class="date-picker-item">
            <el-date-picker
              v-model="form.effectiveEndDate"
              type="date"
              format="dd MMM yyyy"
              class="date-picker"
            />
          </el-form-item>
        </div>
      </el-form-item>
      <el-form-item class="save-container">
        <button class="button" type="button" @click="validateForm">SAVE</button>
      </el-form-item>
    </el-form>
  </modal>
</template>

<script>
import { EDIT_AIRLINE_GROUP_COLLECTION } from '@/graphql/mutations';
export default {
  name: 'EditAirlineGroupCollectionModal',
  data() {
    return {
      form: {
        id: null,
        name: null,
        description: null,
        effectiveStartDate: null,
        effectiveEndDate: null
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please input a collection name.',
            trigger: 'change'
          }
        ],
        effectiveStartDate: [
          {
            required: true,
            message: 'Please select an effective start date',
            trigger: 'change'
          }
        ],
        effectiveEndDate: [
          {
            required: true,
            message: 'Please select an effective end date',
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
      this.$modal.hide('edit-airline-group-collection');
    },
    validateForm() {
      this.$refs.editAirlineGroupCollection.validate(valid => {
        if (valid) {
          this.editAirlineGroupCollection();
        } else {
          return false;
        }
      });
    },
    async editAirlineGroupCollection() {
      try {
        await this.$apollo.mutate({
          mutation: EDIT_AIRLINE_GROUP_COLLECTION,
          variables: {
            ...this.form,
            projectId: this.project.id
          }
        });
        this.$emit('toggle-row', this.form.id);
        this.$modal.show('success', {
          message: 'Airline Group collection successfully edited.',
          name: 'edit-airline-group-collection'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    beforeOpen(event) {
      const {
        id,
        name,
        description,
        effectiveStartDate,
        effectiveEndDate
      } = event.params.collection;
      this.client = event.params.client;
      this.project = event.params.project;
      this.form.id = id;
      this.form.name = name;
      this.form.description = description;
      this.form.effectiveStartDate = effectiveStartDate;
      this.form.effectiveEndDate = effectiveEndDate;
    },
    beforeClose() {
      this.form.id = null;
      this.form.name = null;
      this.form.description = null;
      this.form.effectiveStartDate = null;
      this.form.effectiveEndDate = null;
    }
  }
};
</script>
