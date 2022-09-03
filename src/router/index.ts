import { useUserStore } from "@/stores/user";
import { createRouter, createWebHistory, type RouteRecordName } from "vue-router";
import { RouteNames, routes } from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from): { name: RouteRecordName } | undefined => {
  const userStore = useUserStore();
  if (!to.meta.guest && !userStore.username) return { name: RouteNames.Login };
  if (to.meta.guest && !to.meta.public && userStore.username) return { name: from.name ?? RouteNames.Chat };
});

export default router;
