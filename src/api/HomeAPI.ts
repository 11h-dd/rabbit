// src/api/HomeAPI.ts
import XtxRequestManager from "@/utils/XtxRequestManager";
import type { XtxResponse } from "@/types/Response";
import type { Brands } from "@/types/Brands";
import type { Banner } from "@/types/Banner";
import type { Goods } from "@/types/Goods";
import type { HotRecommends } from "@/types/HotRecommends";

export class HomeAPI {
  // 推荐品牌
  static getHotBrands(limit: number) {
    return XtxRequestManager.instance.request<
      XtxResponse<Brands[]>,
      { limit: number }
    >({
      url: "/home/brand",
      data: { limit },
    });
  }
  //轮播图
  static getBanners(distributionSite: 1 | 2) {
    return XtxRequestManager.instance.request<
      XtxResponse<Banner[]>,
      { distributionSite: 1 | 2 }
    >({ url: "/home/banner", params: { distributionSite } });
  }
  //新鲜好物
  static getFreshGoods(limit: number) {
    return XtxRequestManager.instance.request<
      XtxResponse<Goods>,
      { limit: number }
    >({
      url: "/home/new",
      data: { limit },
    });
  }
  //人气推荐
  static getHotRecommends() {
    return XtxRequestManager.instance.request<XtxResponse<HotRecommends[]>>({
      url: "/home/hot",
    });
  }
}
