import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      uid: "",
      email: "",
    },
    alert: {
      show: false,
      type: "error",
      message: "",
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },

    setAlert(state, payload) {
      state.alert = payload;
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
