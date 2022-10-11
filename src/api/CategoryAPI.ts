import type { CateGory } from "@/types/cateGory";
import type { Goods } from "@/types/Goods";
import type { GoodsRequestParams } from "@/types/GoodsRequestParams";
import type { Pagination, XtxResponse } from "@/types/Response";
import XtxRequestManager from "@/utils/XtxRequestManager";

export class CategoryAPI {
  static getCategory() {
    return XtxRequestManager.instance.request<XtxResponse<CateGory[]>>({
      url: "/home/category/head",
    });
  }
  static getTopCategoryById(id: string) {
    return XtxRequestManager.instance.request<XtxResponse<CateGory>>({
      url: "/category",
      params: { id },
    });
  }
  static getSubCategoryFilters(id: string) {
    return XtxRequestManager.instance.request<XtxResponse<CateGory>>({
      url: "/category/sub/filter",
      params: { id },
    });
  }
  //二级分类商品列表
  static getCategoryGoods(
    categoryId: GoodsRequestParams["categoryId"],
    reqParams?: Partial<Omit<GoodsRequestParams, "categoryId">>
  ) {
    return XtxRequestManager.instance.request<
      XtxResponse<Pagination<Goods>>,
      Partial<GoodsRequestParams>
    >({
      url: "/category/goods",
      method: "POST",
      data: { categoryId, ...reqParams },
    });
  }
}
