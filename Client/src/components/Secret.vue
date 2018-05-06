<template>
  <div>
    {{ sth }}
    <div v-if="error">
      Error: {{ error }}
    </div>
  </div>
</template>

<script>
import SecretService from '@/services/SecretService';

export default {
  name: 'Secret',
  data() {
    return {
      sth: null,
      error: null,
    }
  },
  methods: {

  },
  async mounted() {
    if (this.$store.state.isLoggedIn) {
      const response = await SecretService.secret();
      this.sth = response.data.data;
    } else {
      this.error = 'Autorization failed';
    }
  }

}
</script>

<style scoped>
</style>
