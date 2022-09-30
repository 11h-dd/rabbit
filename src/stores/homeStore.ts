import { HomeAPI } from "@/api/HomeAPI";
import type { Banner } from "@/types/Banner";
import type { cate2 } from "@/types/cate2";
import type { Goods } from "@/types/Goods";
import type { HotRecommends } from "@/types/HotRecommends";
import type { Status } from "@/types/Status";
import type { Special } from "@/types/Special";
type State = {
  banners: {
    result: Banner[];
    status: Status;
  };
  Fresh: {
    result: Goods[];
    status: Status;
  };
  hotRecommends: {
    result: HotRecommends[];
    status: Status;
  };
  goods: {
    result: cate2;
    status: Status;
  };
  specials: {
    result: Special[];
    status: Status;
  };
};
type Actions = {
  getBanners(): Promise<void>;
  getFreshData(): Promise<void>;
  getHotRecommends(): Promise<void>;
  getGoods(): Promise<void>;
  getSpecial(limit?: number): Promise<void>;
};
export const useHomeStore = defineStore<"Home", State, Actions>("Home", {
  state: () => ({
    banners: {
      result: [],
      status: "idle",
    },
    Fresh: {
      result: [],
      status: "idle",
    },
    hotRecommends: {
      result: [],
      status: "idle",
    },
    goods: {
      result: [],
      status: "idle",
    },
    specials: {
      result: [],
      status: "idle",
    },
  }),
  actions: {
    // 获取轮播图数据
    async getBanners() {
      // 更新数据加载状态
      this.banners.status = "loading";
      // 捕获错误
      try {
        // 发送请求获取轮播图数据
        let response = await HomeAPI.getBanners(1);
        // 存储轮播图数据
        this.banners.result = response.result;
        // 更新数据加载状态
        this.banners.status = "success";
      } catch (e) {
        // 更新数据加载状态
        this.banners.status = "error";
      }
    },
    async getFreshData(limit = 4) {
      this.Fresh.status = "loading";
      try {
        const response = await HomeAPI.getFreshGoods(limit);
        this.Fresh.result = response.result;
        this.Fresh.status = "success";
      } catch (e) {
        this.Fresh.status = "error";
      }
    },
    async getHotRecommends() {
      // 更新加载状态
      this.hotRecommends.status = "loading";
      // 捕获错误
      try {
        // 发送请求获取人气推荐状态
        let response = await HomeAPI.getHotRecommends();
        // 存储人气推荐状态
        this.hotRecommends.result = response.result;
        // 更新加载状态
        this.hotRecommends.status = "success";
      } catch (e) {
        // 更新加载状态
        this.hotRecommends.status = "error";
      }
    },
    async getGoods() {
      // 更新加载状态
      this.goods.status = "loading";
      // 捕获错误
      try {
        // 发送请求获取产品区块数据
        let response = await HomeAPI.getGoods();
        // 存储产品区块数据
        this.goods.result = response.result;
        // 更新加载状态
        this.goods.status = "success";
      } catch (e) {
        // 更新加载状态
        this.goods.status = "error";
      }
    },
    async getSpecial(limit = 3) {
      // 更新加载状态
      this.specials.status = "loading";
      // 捕获错误
      try {
        // 发送请求 获取最新专题状态
        let response = await HomeAPI.getSpecial(limit);
        // 存储最新专题状态
        this.specials.result = response.result;
        // 更新加载状态
        this.specials.status = "success";
      } catch (e) {
        // 更新加载状态
        this.specials.status = "error";
      }
    },
  },
});
