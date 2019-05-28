<template>
  <modal
    classes="modal-container"
    name="new-pricing-term"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <el-form
      ref="newPricingTerm"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="150px"
      hide-required-asterisk
    >
      <div class="title-row space-between">
        <div class="section-header">new pricing term</div>
        <el-tooltip effect="dark" content="Close Modal" placement="top">
          <i class="fas fa-times close-modal-button" @click="hideModal" />
        </el-tooltip>
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
import { GET_CONTRACT_LIST, GET_PRICING_TERM_LIST } from '@/graphql/queries';
import { CREATE_PRICING_TERM } from '@/graphql/mutations';
export default {
  name: 'NewPricingTermModal',
  data() {
    return {
      form: {
        contractId: null,
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
      this.$modal.hide('new-pricing-term');
    },
    validateForm() {
      this.$refs.newPricingTerm.validate(valid => {
        if (valid) {
          this.createPricingTerm();
        } else {
          return false;
        }
      });
    },
    async createPricingTerm() {
      try {
        await this.$apollo.mutate({
          mutation: CREATE_PRICING_TERM,
          variables: {
            ...this.form
          },
          update: (store, { data: { createPricingTerm } }) => {
            const query = {
              query: GET_PRICING_TERM_LIST,
              variables: {
                contractId: this.form.contractId
              }
            };
            const data = store.readQuery(query);
            data.pricingTermList.push(createPricingTerm);
            store.writeQuery({
              ...query,
              data
            });
          },
          refetchQueries: () => [
            {
              query: GET_CONTRACT_LIST,
              variables: { id: this.form.contractId }
            }
          ]
        });
        this.$modal.show('success', {
          message: 'Pricing Term successfully created.',
          name: 'new-pricing-term'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    beforeOpen(event) {
      this.form.contractId = event.params.contractId;
    },
    beforeClose() {
      this.form.contractId = null;
      this.form.name = null;
      this.form.ignore = false;
    }
  }
};
</script>
