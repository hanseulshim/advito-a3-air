<template>
  <modal
    classes="modal-container"
    name="new-region"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="title-row space-between">
      <div class="section-header">new region</div>
      <el-tooltip effect="dark" content="Close Modal" placement="top">
        <i class="fas fa-times close-modal-button" @click="hideModal" />
      </el-tooltip>
    </div>
    <el-form
      ref="newRegionForm"
      :model="form"
      :rules="rules"
      label-position="left"
      hide-required-asterisk
    >
      <el-form-item prop="name" label="New Region Name *">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item prop="code" label="New Region Code *">
        <el-input v-model="form.code" />
      </el-form-item>
      <el-form-item class="save-container">
        <button class="button" type="button" @click="validateForm">
          ADD REGION
        </button>
      </el-form-item>
    </el-form>
  </modal>
</template>

<script>
import { GET_REGION_LIST, GET_LOCATION_COLLECTION } from '@/graphql/queries';
import { ADD_REGION } from '@/graphql/mutations';
export default {
  name: 'NewRegionModal',
  data() {
    return {
      form: {
        name: null,
        code: null,
        geoSetId: null
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please input a region name.',
            trigger: 'change'
          }
        ],
        code: [
          {
            required: true,
            message: 'Please input a region code.',
            trigger: 'change'
          },
          {
            min: 2,
            max: 2,
            message: 'Region code should be two letters',
            trigger: 'change'
          }
        ]
      }
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('new-region');
    },
    validateForm() {
      this.$refs.newRegionForm.validate(valid => {
        if (valid) {
          this.addRegion();
        } else {
          return false;
        }
      });
    },
    async addRegion() {
      try {
        await this.$apollo.mutate({
          mutation: ADD_REGION,
          variables: {
            ...this.form
          },
          refetchQueries: () => [
            {
              query: GET_REGION_LIST,
              variables: { geoSetId: this.form.geoSetId }
            },
            {
              query: GET_LOCATION_COLLECTION,
              variables: { id: this.form.geoSetId }
            }
          ]
        });
        this.$emit('toggle-row', this.form.geoSetId);
        this.$modal.show('success', {
          message: 'Region successfully created.',
          name: 'new-region'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    beforeOpen(event) {
      this.form.geoSetId = event.params.geoSetId;
    },
    beforeClose() {
      this.form.geoSetId = null;
      this.form.name = null;
      this.form.code = null;
    }
  }
};
</script>
