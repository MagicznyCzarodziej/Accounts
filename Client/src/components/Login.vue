<template>
  <div>
    <h1>Login</h1>
    Login:
    <input
      type="text"
      name="username"
      v-model="username"
    >
    <br>
    Password:
    <input
      type="password"
      name="password"
      v-model="password"
    >
    <br>
    <button
     type="button"
     name="register"
     @click="login"
     >
      Login!
     </button>
     <div v-if="error">
       Error: {{ error }}
     </div>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService';

export default {
  name: 'Login',
  data() {
    return {
      username: this.username,
      password: this.password,
      error: null,
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          login: this.username,
          password: this.password
        });
        const token = response.data.token;
        localStorage.setItem('userToken', token);
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userLogin', this.username);

        this.$store.commit('logIn', {
          token,
          login: this.username,
        });
      } catch (error) {
        console.log(error);
        this.error = error.response.data.error;
      }
    }
  }

}
</script>

<style scoped>
</style>
