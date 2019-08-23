<template>
  <modal
    classes="modal-container"
    name="forgot-password"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <el-form
      ref="forgotPassword"
      :model="form"
      :rules="rules"
      label-position="top"
      label-width="150px"
      hide-required-asterisk
    >
      <div class="title-row space-between">
        <div class="section-header">Forgot Password?</div>
        <i class="fas fa-times close-modal-button" @click="hideModal"></i>
      </div>
      <el-form-item
        label="Enter your email address below to reset your password"
        prop="email"
      >
        <el-input v-model="form.email" placeholder="Email" />
      </el-form-item>
      <el-form-item class="save-container">
        <button class="button" type="button" @click="validateForm">
          SUBMIT
        </button>
      </el-form-item>
    </el-form>
  </modal>
</template>
<script>
import { SEND_RESET_PASSWORD } from '@/graphql/mutations';
export default {
  name: 'ForgotPasswordModal',
  data() {
    return {
      form: {
        email: null
      },
      rules: {
        email: [
          {
            required: true,
            message: 'Please input a valid email',
            trigger: 'change'
          }
        ]
      }
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('forgot-password');
    },
    validateForm() {
      this.$refs.forgotPassword.validate(valid => {
        if (valid) {
          this.submitEmail();
        } else {
          return false;
        }
      });
    },
    async submitEmail() {
      try {
        await this.$apollo.mutate({
          mutation: SEND_RESET_PASSWORD,
          variables: {
            email: this.form.email
          },
          client: 'advitoClient'
        });
        this.$modal.show('success', {
          message: 'Email instructions have been sent!',
          name: 'forgot-password'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    beforeOpen() {},
    beforeClose() {}
  }
};
</script>
<style lang="scss">
@import '@/styles/global.scss';
</style>
