import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// FIXME guests can enter chat before logging in
// router.beforeEach((to, from): { name: RouteRecordName } | undefined => {
//   const userStore = useUserStore();
//   if (!to.meta.guest && !userStore.username) return { name: RouteNames.Login };
//   if (to.meta.guest && !to.meta.public && userStore.username) return { name: from.name ?? RouteNames.Users };
// });

export default router;
