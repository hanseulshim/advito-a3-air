<template>
  <modal
    classes="modal-container"
    name="copy-contract"
    height="auto"
    @before-close="beforeClose"
    @before-open="beforeOpen"
  >
    <el-form
      ref="copyContract"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="150px"
      hide-required-asterisk
    >
      <div class="title-row space-between">
        <div class="section-header">copy contract</div>
        <el-tooltip effect="dark" content="Close Modal" placement="top">
          <i class="fas fa-times close-modal-button" @click="hideModal"></i>
        </el-tooltip>
      </div>
      <el-form-item label="Name *" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item class="save-container">
        <button class="button" type="button" @click="validateForm">SAVE</button>
      </el-form-item>
    </el-form>
  </modal>
</template>

<script>
import { GET_CONTRACT_LIST } from '@/graphql/queries';
import { COPY_CONTRACT } from '@/graphql/mutations';
export default {
  name: 'CopyContractModal',
  data() {
    return {
      form: {
        id: null,
        name: null
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please input a contract name.',
            trigger: 'change'
          }
        ]
      }
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('copy-contract');
    },
    validateForm() {
      this.$refs.copyContract.validate(valid => {
        if (valid) {
          this.copyContract();
        } else {
          return false;
        }
      });
    },
    async copyContract() {
      try {
        await this.$apollo.mutate({
          mutation: COPY_CONTRACT,
          variables: {
            ...this.form
          },
          update: (store, { data: { copyContract } }) => {
            const query = {
              query: GET_CONTRACT_LIST
            };
            const data = store.readQuery(query);
            data.contractList.push(copyContract);
            store.writeQuery({
              ...query,
              data
            });
          }
        });
        this.$modal.show('success', {
          message: 'Contract successfully copied.',
          name: 'copy-contract'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    beforeOpen(event) {
      this.form.id = event.params.id;
    },
    beforeClose() {
      this.form.id = null;
      this.form.name = null;
    }
  }
};
</script>
