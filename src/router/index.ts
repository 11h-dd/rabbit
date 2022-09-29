import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
      ],
    },
  ],
});

export default router;
