import { createRouter, createWebHistory } from "vue-router";

export enum RouteNames {
  Login = "login",
  Chat = "chat",
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: RouteNames.Login,
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/chat",
      name: RouteNames.Chat,
      component: () => import("../views/ChatView.vue"),
    },
  ],
});

export default router;
