import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usuario: {
      email: "",
      uid: "",
    },
  },
  mutations: {
    setUsuario(state, payload) {
      state.usuario = payload;
    },
  },
  // Recibe datos de onAuthStateChanged (main.js)
  actions: {
    detectarUsuario({ commit }, usuario) {
      commit("setUsuario", usuario);
    },
  },
  // Devuelve true/false si existe un usuario
  getters: {
    existeUsuario(state) {
      if (state.usuario === null) {
        return false;
      } else {
        return true;
      }
    },
  },
  modules: {},
});
