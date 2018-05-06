<template>
  <div>
    <h1>Register</h1>
    Login:
    <input
      type="text"
      name="login"
      v-model="login"
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
     @click="register"
     >
      Register!
     </button>
     <div v-if="error">
       Error: {{ error }}
     </div>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService';

export default {
  name: 'Register',
  data() {
    return {
      login: this.login,
      password: this.password,
      error: null,
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          login: this.login,
          password: this.password,
        });
        const token = response.data.token;
        localStorage.setItem('userToken', token);
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userLogin', this.login);

        this.$store.commit('logIn', {
          token,
          login: this.login,
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
