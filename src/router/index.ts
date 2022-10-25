import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: "/",
      component: () => import("@/components/XtxLayout.vue"),
      children: [
        { path: "", component: () => import("@/views/home/homepage.vue") },
        {
          path: "category/:id",
          component: () => import("@/views/category/TopCategoryPage.vue"),
        },
        {
          path: "category/sub/:top/:sub",
          component: () => import("@/views/category/SubCategoryPage.vue"),
        },
        {
          path: "goods/:id",
          component: () => import("@/views/goods/GoodsDetailPage.vue"),
        },
      ],
    },
    {
      path: "/login",
      component: () => import("@/views/login/LoginPage.vue"),
    },
    {
      path: "/login/callback",
      component: () => import("@/views/login/QQLoginBack.vue"),
      beforeEnter: () => {
        // 如果没有进行QQ扫码授权
        if (!window.QC.Login.check()) {
          return false;
        }
        return true;
      },
    },
  ],
});

export default router;
