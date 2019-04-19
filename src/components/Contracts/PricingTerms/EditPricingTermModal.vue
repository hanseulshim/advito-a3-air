<template>
  <modal
    classes="modal-container"
    name="edit-pricing-term"
    height="auto"
    @before-close="beforeClose"
    @before-open="beforeOpen"
  >
    <el-form
      ref="editPricingTerm"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="150px"
      hide-required-asterisk
    >
      <div class="title-row space-between">
        <div class="section-header">edit pricing term</div>
        <i class="fas fa-times close-modal-button" @click="hideModal"></i>
      </div>
      <el-form-item label="Term Name *" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Ignore">
        <el-checkbox v-model="form.ignore" />
      </el-form-item>
      <el-form-item class="save-container">
        <button class="button" @click="validateForm">SAVE</button>
      </el-form-item>
    </el-form>
  </modal>
</template>

<script>
import { EDIT_PRICING_TERM } from '@/graphql/mutations';
export default {
  name: 'EditPricingTermModal',
  data() {
    return {
      form: {
        id: null,
        name: null,
        ignore: false
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please input a pricing term name.',
            trigger: 'change'
          }
        ]
      }
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('edit-pricing-term');
    },
    validateForm() {
      this.$refs.editPricingTerm.validate(valid => {
        if (valid) {
          this.editPricingTerm();
        } else {
          return false;
        }
      });
    },
    async editPricingTerm() {
      try {
        await this.$apollo.mutate({
          mutation: EDIT_PRICING_TERM,
          variables: {
            ...this.form
          }
        });
        this.$modal.show('success', {
          message: 'Pricing Term successfully edited.',
          name: 'edit-pricing-term'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    beforeOpen(event) {
      const { id, name, ignore } = event.params.pricingTerm;
      this.form.id = id;
      this.form.name = name;
      this.form.ignore = ignore;
    },
    beforeClose() {
      this.form.id = null;
      this.form.name = null;
      this.form.ignore = false;
    }
  }
};
</script>
