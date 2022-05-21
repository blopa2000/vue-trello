import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },

  actions: {
    detectUser({ commit }, user) {
      commit("setUser", user);
    },
  },

  getters: {
    existUser(state) {
      if (state.user === null) {
        return false;
      } else {
        return true;
      }
    },
  },
  modules: {},
});
