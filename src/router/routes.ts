import type { RouteRecordRaw } from "vue-router";

export enum RouteNames {
  Login = "login",
  Chat = "chat",
}

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: RouteNames.Login,
    component: () => import("../views/LoginView.vue"),
    meta: {
      guest: true,
    },
  },
  {
    path: "/chat",
    name: RouteNames.Chat,
    component: () => import("../views/ChatView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("../views/404View.vue"),
    meta: {
      guest: true,
      public: true,
    },
  },
];
