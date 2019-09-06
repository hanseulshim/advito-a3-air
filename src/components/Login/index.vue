<template>
  <div v-loading="loading" class="login-container">
    <img class="login-logo" alt="advito-logo" src="@/assets/logo.png" />
    <div class="application-title">
      Welcome to A3
    </div>
    <div class="login-form">
      <el-form
        ref="loginForm"
        :model="form"
        :rules="rules"
        label-position="top"
        label-width="150px"
        hide-required-asterisk
      >
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="Login" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="Password"
            type="password"
          />
        </el-form-item>
        <div class="submit-row">
          <button class="button" type="submit" @click="validateForm">
            Login
          </button>
          <span class="forgot-password" @click="showForgotPasswordModal"
            >Forgot password?</span
          >
        </div>
      </el-form>
    </div>
    <ForgotPasswordModal />
  </div>
</template>
<script>
import { LOGIN } from '@/graphql/mutations';
import { setUser } from '@/helper';
import ForgotPasswordModal from './ForgotPasswordModal';
export default {
  name: 'Login',
  components: {
    ForgotPasswordModal
  },
  data() {
    return {
      form: {
        username: null,
        password: null
      },
      loading: false
    };
  },
  computed: {
    rules() {
      return {
        username: [
          {
            required: true,
            message: 'Please enter a valid username',
            trigger: 'change'
          }
        ],
        password: [
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
    showForgotPasswordModal() {
      this.$modal.show('forgot-password');
    },
    validateForm(e) {
      e.preventDefault();

      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.login();
        } else {
          return false;
        }
      });
    },
    async login() {
      this.loading = true;
      try {
        const {
          data: { login }
        } = await this.$apollo.mutate({
          mutation: LOGIN,
          variables: {
            ...this.form
          },
          client: 'advitoClient'
        });
        setUser(login);
        this.$router.replace({ name: 'root' });
        this.loading = false;
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
        this.loading = false;
      }
    }
  }
};
</script>
<style lang="scss">
@import '@/styles/global.scss';

.login-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-logo {
  margin: 3em 0 0 5em;
  max-width: 200px;
  width: 100%;
  /* height: auto; */
  align-self: flex-start;
}

.application-title {
  font-size: 4em;
  text-align: center;
  margin-top: 2.5em;
  font-weight: 100;
  line-height: 1.25em;
  color: black;
}

.login-form {
  padding: 3em 4em;
  width: 20%;
}

.submit-row {
  display: flex;
  justify-content: space-between;
  margin-top: 10%;

  button {
    text-transform: uppercase;
  }
}

.forgot-password {
  cursor: pointer;
}
</style>
