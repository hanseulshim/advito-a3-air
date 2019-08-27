<template>
  <div class="login-container">
    <img class="login-logo" alt="advito-logo" src="@/assets/logo.png" />
    <div class="application-title shimmer">
      Reset Password
    </div>
    <div class="login-form">
      <el-form
        ref="resetPassword"
        :model="form"
        :rules="rules"
        label-position="top"
        label-width="150px"
        hide-required-asterisk
      >
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="Password"
            type="password"
          />
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input
            v-model="form.confirmPassword"
            placeholder="Confirm Password"
            type="password"
          />
        </el-form-item>
        <div class="submit-row">
          <button
            v-if="!showLoginButton"
            class="button"
            type="submit"
            @click="validateForm"
          >
            Reset
          </button>
          <button
            v-if="showLoginButton"
            type="button"
            class="button"
            @click="pushToLogin"
          >
            Go to Login
          </button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { RESET_PASSWORD } from '@/graphql/mutations';
export default {
  name: 'ResetPassword',
  data() {
    return {
      form: {
        password: null,
        confirmPassword: null
      },
      showLoginButton: false
    };
  },
  computed: {
    rules() {
      return {
        password: [
          {
            required: true,
            message: 'Please enter a valid password',
            trigger: 'change'
          }
        ],
        confirmPassword: [
          {
            required: true,
            message: 'Please enter a valid password',
            trigger: 'change'
          }
        ]
      };
    }
  },
  methods: {
    validateForm(event) {
      event.preventDefault();
      this.$refs.resetPassword.validate(valid => {
        if (valid) {
          this.resetPassword();
        } else {
          return false;
        }
      });
    },
    pushToLogin() {
      this.$router.replace({ name: 'login' });
    },
    async resetPassword() {
      const token = this.$route.query.t;
      if (token) {
        try {
          await this.$apollo.mutate({
            mutation: RESET_PASSWORD,
            variables: {
              token,
              ...this.form
            },
            client: 'advitoClient'
          });
          this.$modal.show('success', {
            message: 'Password Successfully reset'
          });
          this.showLoginButton = true;
        } catch (error) {
          this.$modal.show('error', {
            message: error.message
          });
        }
      } else
        this.$modal.show('error', {
          message: 'Invalid Token. Please go back to login'
        });
      this.showLoginButton = true;
    }
  }
};
</script>
<style lang="scss">
@import '@/styles/global.scss';

.reset-password-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.reset-password-logo {
  position: absolute;
  top: 0;
  left: 0;
  margin: 3em 0 0 5em;
  max-width: 200px;
  width: 100%;
  align-self: flex-start;
}
.reset-password-form {
  margin-top: 10%;
  padding: 3em 4em;
  width: 20%;
  border: 1px solid #dee1df;
  padding: 2em;
  background: #fff;
  border-radius: 10px;
}

.submit-reset-password {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10%;

  button {
    text-transform: uppercase;
  }
}
</style>
