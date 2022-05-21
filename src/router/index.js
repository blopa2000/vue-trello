import Vue from "vue";
import VueRouter from "vue-router";
// import { auth } from "../api/firebase";
// import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
    props: true,
  },
  {
    path: "/signUp",
    name: "signUp",
    component: () => import("../views/SignUpView.vue"),
    props: true,
  },
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/board/:id",
    name: "board",
    component: () => import("../views/BoardView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach(async (to, from, next) => {
//   const res = store.dispatch("existeUsuario");
//   const rutaAuth = to.matched.some((record) => record.meta.requiresAuth);
//   console.log("accccsscs", res);
//   if (rutaAuth && !res) {
//     next("/login");
//   } else {
//     next("/");
//   }
// });

export default router;
