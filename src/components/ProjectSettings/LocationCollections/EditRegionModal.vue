<template>
  <modal
    classes="modal-container"
    name="edit-region"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="title-row space-between">
      <div class="section-header">edit region</div>
      <i class="fas fa-times close-modal-button" @click="hideModal"></i>
    </div>
    <el-form
      ref="editRegionForm"
      :model="form"
      :rules="rules"
      label-position="left"
      hide-required-asterisk
    >
      <el-form-item prop="name" label-width="150px">
        <div class="region-name-container">
          <div>New Region Name</div>
          <el-input v-model="form.name" />
          <button class="button" @click="validateForm">ADD TO LIST</button>
        </div>
      </el-form-item>
    </el-form>
    <div>All Countries</div>
    <div>
      <div v-for="region in regionList" :key="region.id">
        {{ region.name }}
      </div>
    </div>
  </modal>
</template>

<script>
import { ADD_REGION } from '@/graphql/mutations';
export default {
  name: 'EditRegionModal',
  data() {
    return {
      form: {
        id: null,
        name: null
      },
      regionList: [],
      rules: {
        name: [
          {
            required: true,
            message: 'Please input a collection name.',
            trigger: 'change'
          }
        ]
      }
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('edit-region');
    },
    validateForm() {
      this.$refs.editRegionForm.validate(valid => {
        if (valid) {
          this.createRegion();
        } else {
          return false;
        }
      });
    },
    async createRegion() {
      try {
        const data = await this.$apollo.mutate({
          mutation: ADD_REGION,
          variables: {
            ...this.form
          }
        });
        this.$modal.show('success', {
          message: 'Region successfully created.'
        });
        this.$emit('toggle-row', data.data.addRegion.id);
      } catch (error) {
        this.$modal.show('error', {
          message: 'Failed to create region. Please try again.'
        });
      }
    },
    beforeOpen(event) {
      const collection = event.params.collection;
      this.form.id = collection.id;
      this.regionList = collection.regionList;
    },
    beforeClose() {
      this.form.id = null;
      this.form.name = null;
    }
  }
};
</script>

<style lang="scss">
.region-name-container {
  display: flex;
  align-items: center;
  margin-left: -150px;
  .el-input {
    flex: 1;
    margin: 0 1em;
  }
  .el-form-item__error {
    left: 50%;
  }
}
</style>
