import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/results",
    name: "Results",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Results.vue"),
  },
  {
    path: "/quiz",
    name: "Quiz",
    component: () => import(/* webpackChunkName: "quiz" */ "../views/Quiz.vue"),
  },
  {
    path: "*",
    name: "NotFound",
    component: () => import(/* webpackChunkName: "not-found" */ "../views/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
