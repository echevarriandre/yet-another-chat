import { createRouter, createWebHistory } from "vue-router";

export enum RouteNames {
  Login = "login",
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: RouteNames.Login,
      component: () => import("../views/LoginView.vue"),
    },
  ],
});

export default router;
