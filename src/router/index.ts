import { createRouter, createWebHistory, type RouteRecordName } from "vue-router";
import { RouteNames, routes } from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from): { name: RouteRecordName } | undefined => {
  const hasSession = sessionStorage.getItem("sessionId");
  if (!to.meta.guest && !hasSession) return { name: RouteNames.Login };
  if (to.meta.guest && !to.meta.public && hasSession) return { name: from.name ?? RouteNames.Chat };
});

export default router;
