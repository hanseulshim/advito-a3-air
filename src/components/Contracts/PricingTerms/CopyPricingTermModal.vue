<template>
  <modal
    classes="modal-container"
    name="copy-pricing-term"
    height="auto"
    @before-close="beforeClose"
    @before-open="beforeOpen"
  >
    <el-form
      ref="copyPricingTerm"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="150px"
      hide-required-asterisk
    >
      <div class="title-row space-between">
        <div class="section-header">copy pricing term</div>
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
import { GET_PRICING_TERM_LIST } from '@/graphql/queries';
import { COPY_PRICING_TERM } from '@/graphql/mutations';
export default {
  name: 'CopyPricingTermModal',
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
      this.$modal.hide('copy-pricing-term');
    },
    validateForm() {
      this.$refs.copyPricingTerm.validate(valid => {
        if (valid) {
          this.copyPricingTerm();
        } else {
          return false;
        }
      });
    },
    async copyPricingTerm() {
      try {
        await this.$apollo.mutate({
          mutation: COPY_PRICING_TERM,
          variables: {
            ...this.form
          },
          update: (store, data) => {
            const pricingTerm = data.data.copyPricingTerm;
            const newData = store.readQuery({
              query: GET_PRICING_TERM_LIST
            });
            newData.pricingTermList.push(pricingTerm);
            store.writeQuery({
              query: GET_PRICING_TERM_LIST,
              data: newData
            });
          }
        });
        this.$modal.show('success', {
          message: 'Pricing Term successfully copied.',
          name: 'copy-pricing-term'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    beforeOpen(event) {
      const { id, ignore } = event.params.pricingTerm;
      this.form.id = id;
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
