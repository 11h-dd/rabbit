import { HomeAPI } from "@/api/HomeAPI";
import type { Brands } from "@/types/Brands";
import type { Status } from "@/types/Status";

type State = {
  brands: {
    result: Brands[];
    status: Status;
  };
  banners: {
    result: Brands[];
    status: Status;
  };
};
type Getters = {};

type Actions = {
  // 获取推荐品牌
  getBrands(limit?: number): Promise<void>;
  getBanners(): Promise<void>;
};

export const useHomeStores = defineStore<"home", State, Actions, Getters>(
  "home",
  {
    state: () => ({
      brands: {
        result: [],
        status: "idle",
      },
      banners: {
        result: [],
        status: "idle",
      },
    }),
    actions: {
      async getBrands(limit = 10) {
        this.brands.status = "loading";
        try {
          const response = await HomeAPI.getHotBrands(limit);
          this.brands.result = response.result;
          this.brands.status = "success";
        } catch (e) {
          console.log(e);
          this.brands.status = "error";
        }
      },
      async getBanners() {
        // 更新加载状态
        this.banners.status = "loading";
        // 捕获错误
        try {
          // 发送请求获取轮播图
          let response = await HomeAPI.getBanners(2);
          // 存储轮播图
          this.banners.result = response.result;
          // 更新加载状态
          this.banners.status = "success";
        } catch (e) {
          // 更新加载状态
          this.banners.status = "error";
        }
      },
    },
  }
);
