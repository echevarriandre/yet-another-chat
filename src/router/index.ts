import { createRouter, createWebHistory } from "vue-router";

export enum RouteNames {
  Home = "home",
  About = "about",
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: RouteNames.Home,
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/about",
      name: RouteNames.About,
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
