import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userToken: null,
    userLogin: null,
    isLoggedIn: false,
  },
  mutations: {
    logIn(state, payload) {
      state.userToken = payload.token;
      state.userLogin = payload.login;
      state.isLoggedIn = true;
    },
  },
  actions: {

  },
  getters: {

  },
});
