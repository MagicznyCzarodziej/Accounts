<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeCreate() {
    const token = localStorage.getItem('userToken');
    if (token) {
      this.$store.state.userToken = token;
      this.$store.state.userLogin = localStorage.getItem('userLogin');
      this.$store.state.isLoggedIn = true;

      localStorage.setItem('isLoggedIn', true);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
