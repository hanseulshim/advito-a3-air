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
      <i class="fas fa-times close-modal-button" @click="hideModal"></i>
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
        <button class="button" @click="validateForm">ADD REGION</button>
      </el-form-item>
    </el-form>
  </modal>
</template>

<script>
import { ADD_REGION } from '@/graphql/mutations';
export default {
  name: 'NewRegionModal',
  data() {
    return {
      form: {
        name: null,
        code: null,
        id: null
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
        const data = await this.$apollo.mutate({
          mutation: ADD_REGION,
          variables: {
            ...this.form
          }
        });
        this.$modal.show('success', {
          message: 'Region successfully created.',
          name: 'new-region'
        });
        this.$emit('toggle-row', data.data.addRegion.id);
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    beforeOpen(event) {
      const collection = event.params.collection;
      this.form.id = collection.id;
    },
    beforeClose() {
      this.form.id = null;
      this.form.name = null;
      this.form.code = null;
    }
  }
};
</script>
