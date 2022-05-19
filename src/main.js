import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./api/firebase";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

onAuthStateChanged(auth, (user) => {
  if (user) {
    const usuarioActivo = {
      email: user.email,
      uid: user.uid,
    };
    store.dispatch("detectarUsuario", usuarioActivo);
  } else {
    store.dispatch("detectarUsuario", user);
  }
});

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
