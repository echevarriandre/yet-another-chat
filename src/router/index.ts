import { createRouter, createWebHistory } from "vue-router";

export enum RouteNames {
  Home = "home",
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: RouteNames.Home,
      component: () => import("../views/HomeView.vue"),
    },
  ],
});

export default router;
