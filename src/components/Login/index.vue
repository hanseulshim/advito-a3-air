<template>
  <div class="container">
    <h1 class="section-header">
      Welcome to A3
    </h1>
    <el-form>
      <el-form-item>
        <el-input v-model="form.username" placeholder="Login" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.password" placeholder="Password" />
      </el-form-item>
    </el-form>
    <button class="button">Login</button>
    <span>Forgot password?</span>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    async login() {
      try {
      } catch {}
    }
  }
};
</script>
