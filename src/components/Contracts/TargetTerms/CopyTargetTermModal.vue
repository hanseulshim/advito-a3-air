<template>
  <modal
    classes="modal-container"
    name="copy-target-term"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <el-form
      ref="copyTargetTerm"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="150px"
      hide-required-asterisk
    >
      <div class="title-row space-between">
        <div class="section-header">copy target term</div>
        <el-tooltip effect="dark" content="Close Modal" placement="top">
          <i class="fas fa-times close-modal-button" @click="hideModal" />
        </el-tooltip>
      </div>
      <el-form-item label="Name *" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item class="save-container">
        <button class="button" @click="validateForm">SAVE</button>
      </el-form-item>
    </el-form>
  </modal>
</template>

<script>
import { GET_TARGET_TERM_LIST } from '@/graphql/queries';
import { COPY_TARGET_TERM } from '@/graphql/mutations';
export default {
  name: 'CopyTargetTermModal',
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
            message: 'Please input a target term name.',
            trigger: 'change'
          }
        ]
      }
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('copy-target-term');
    },
    validateForm() {
      this.$refs.copyTargetTerm.validate(valid => {
        if (valid) {
          this.copyTargetTerm();
        } else {
          return false;
        }
      });
    },
    async copyTargetTerm() {
      try {
        await this.$apollo.mutate({
          mutation: COPY_TARGET_TERM,
          variables: {
            ...this.form
          },
          update: (store, data) => {
            const targetTerm = data.data.copyTargetTerm;
            const newData = store.readQuery({
              query: GET_TARGET_TERM_LIST
            });
            newData.targetTermList.push(targetTerm);
            store.writeQuery({
              query: GET_TARGET_TERM_LIST,
              data: newData
            });
          }
        });
        this.$modal.show('success', {
          message: 'Target Term successfully created.',
          name: 'copy-target-term'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    beforeOpen(event) {
      const { id, name } = event.params.targetTerm;
      this.form.id = id;
      this.form.name = name;
    },
    beforeClose() {
      this.form.id = null;
      this.form.name = null;
    }
  }
};
</script>
