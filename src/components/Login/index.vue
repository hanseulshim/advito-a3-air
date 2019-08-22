<template>
  <div class="login-container">
    <img class="login-logo" alt="advito-logo" src="@/assets/logo.png" />
    <div class="application-title shimmer">
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
        <el-form-item prop="password" type="password">
          <el-input v-model="form.password" placeholder="Password" />
        </el-form-item>
      </el-form>
      <div class="submit-row">
        <button class="button" type="button" @click="validateForm">
          Login
        </button>
        <span>Forgot password?</span>
      </div>
    </div>
  </div>
</template>
<script>
import { LOGIN } from '@/graphql/mutations';
import { setUser } from '@/helper';
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: null,
        password: null
      }
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
    validateForm() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.login();
        } else {
          return false;
        }
      });
    },
    async login() {
      try {
        const { username, password } = this.form;
        const {
          data: { login }
        } = await this.$apollo.mutate({
          mutation: LOGIN,
          variables: {
            username,
            password
          },
          client: 'advitoClient'
        });
        setUser(login);
        this.$router.replace({ name: 'root' });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    }
  }
};
</script>
<style lang="scss">
/* @import '@/styles/global.scss';
@import './styles.scss'; */
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
  width: 10%;
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

.shimmer {
  display: inline-block;
  color: white;

  background: #acacac -webkit-gradient(linear, 100% 0, 0 0, from(#acacac), color-stop(0.5, #ffffff), to(#acacac));

  background-position: -4rem top; /*50px*/
  background-repeat: no-repeat;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-animation-name: shimmer;
  -webkit-animation-duration: 5.2s;
  -webkit-animation-iteration-count: infinite;
  -webkit-background-size: 4rem 100%; /*50px*/
}

@-webkit-keyframes shimmer {
  0% {
    background-position: -4rem top; /*50px*/
  }

  40% {
    background-position: 25.5rem top; /*200px*/
  }

  100% {
    background-position: 25.5rem top; /*200px*/
  }
}

.login-form {
  padding: 3em 4em;
  width: 25%;
}

.submit-row {
  display: flex;
  justify-content: space-between;
  margin-top: 10%;

  button {
    text-transform: uppercase;
  }
}
</style>
