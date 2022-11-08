import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  RouterView,
} from "vue-router";
import authGard from "./authGuard";

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
        {
          path: "/cart",
          component: () => import("@/views/cart/CatrPage.vue"),
        },
        {
          path: "/checkout/order",
          component: () => import("@/views/pay/checkoutPage.vue"),
        },
        {
          path: "/checkout/pay",
          component: () => import("@/views/pay/PayPage.vue"),
        },
        {
          path: "/pay/callback",
          component: () => import("@/views/pay/PayResultPage.vue"),
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
    {
      path: "/",
      component: () => import("@/components/XtxLayout.vue"),
      children: [
        {
          path: "member",
          component: () => import("@/components/XtxMemberLayout.vue"),
          redirect: "/member/home",
          children: [
            {
              path: "home",
              component: () =>
                import("@/views/memeber/home/MemberHomePage.vue"),
            },
            {
              path: "order",
              component: () => h(RouterView),
              children: [
                {
                  path: "",
                  component: () =>
                    import("@/views/memeber/order/OrderListPage.vue"),
                },
                {
                  path: ":id",
                  component: () =>
                    import("@/views/memeber/order/OrderDetailPage.vue"),
                },
              ],
            },
            {
              path: "order/:id",
              component: () =>
                import("@/views/memeber/order/OrderDetailPage.vue"),
            },
          ],
        },
      ],
    },
  ],
});
router.beforeEach(authGard);
export default router;
