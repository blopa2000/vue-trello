import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./api/firebase";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

(async () => {
  await onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      const user = {
        email: currentUser.email,
        uid: currentUser.uid,
      };
      store.dispatch("detectUser", user);
    } else {
      store.dispatch("detectUser", null);
    }
  });

  new Vue({
    store,
    router,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app");
})();
