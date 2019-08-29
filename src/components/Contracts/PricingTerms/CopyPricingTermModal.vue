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
        <el-tooltip effect="dark" content="Close Modal" placement="top">
          <i class="fas fa-times close-modal-button" @click="hideModal"></i>
        </el-tooltip>
      </div>
      <el-form-item label="Term Name *" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Ignore">
        <el-checkbox v-model="form.ignore" />
      </el-form-item>
      <el-form-item class="save-container">
        <button class="button" type="button" @click="validateForm">SAVE</button>
      </el-form-item>
    </el-form>
  </modal>
</template>

<script>
import {
  GET_PRICING_TERM_LIST,
  GET_CONTRACT_LIST,
  GET_PROJECT
} from '@/graphql/queries';
import { COPY_PRICING_TERM } from '@/graphql/mutations';
export default {
  name: 'CopyPricingTermModal',
  apollo: {
    project: {
      query: GET_PROJECT
    }
  },
  data() {
    return {
      form: {
        id: null,
        name: null,
        ignore: false
      },
      project: {},
      contractId: null,
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
          update: (store, { data: { copyPricingTerm } }) => {
            const query = {
              query: GET_PRICING_TERM_LIST,
              variables: {
                contractId: this.contractId
              }
            };
            const data = store.readQuery(query);
            data.pricingTermList.push(copyPricingTerm);
            store.writeQuery({
              ...query,
              data
            });
          },
          refetchQueries: () => [
            {
              query: GET_CONTRACT_LIST,
              variables: { id: this.contractId, projectId: this.project.id }
            }
          ]
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
      const contractId = event.params.contractId;
      const { id, ignore } = event.params.pricingTerm;
      this.form.id = id;
      this.form.ignore = ignore;
      this.contractId = contractId;
    },
    beforeClose() {
      this.form.id = null;
      this.form.name = null;
      this.form.ignore = false;
      this.contractId = null;
    }
  }
};
</script>
