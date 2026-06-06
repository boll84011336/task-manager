import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/login/index.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/",
      component: () => import("../views/LayoutView.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          redirect: "/dashboard",
        },
        {
          path: "dashboard",
          name: "Dashboard",
          component: () => import("../views/dashboard/index.vue"),
        },
        {
          path: "tasks",
          name: "Tasks",
          component: () => import("../views/tasks/index.vue"),
        },
        {
          path: "users",
          name: "Users",
          component: () => import("../views/users/index.vue"),
        },
        {
          path: "test",
          name: "Test",
          component: () => import("@/views/testpage/index.vue"),
        },
        {
          path: "permissions",
          name: "Permissions",
          component: () => import("@/views/permissions/index.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/dashboard",
    },
  ],
});

// Route Guard
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next("/login");
    return;
  }

  if (to.meta.requiresAdmin && authStore.user?.role !== "admin") {
    next("/dashboard");
    return;
  }

  if (to.path === "/login" && authStore.isLoggedIn) {
    next("/dashboard");
    return;
  }

  next();
});

export default router;
