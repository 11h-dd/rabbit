import type {
  Evaluate,
  EvaluateInfo,
  EvaluateRequestParams,
  Goods,
} from "@/types/Goods";
import type { Pagination, XtxResponse } from "@/types/Response";
import XtxRequestManager from "@/utils/XtxRequestManager";

export class GoodsAPI {
  //根据id获取数据
  static getGoodsInfo(id: string) {
    return XtxRequestManager.instance.request<
      XtxResponse<Goods>,
      { id: string }
    >({
      url: "/goods",
      params: { id },
    });
  }
  static getRelevantGoods(args?: { id?: number; limit?: number }) {
    if (typeof args !== "undefined" && typeof args.limit === "undefined") {
      args.limit = 16;
    } else {
      args = { limit: 16 };
    }
    return XtxRequestManager.instance.request<XtxResponse<Goods[]>>({
      url: "/goods/relevant",
      params: args,
    });
  }
  static getHotSaleGoods(id: string, type: 1 | 2 | 3, limit: number = 3) {
    return XtxRequestManager.instance.request<
      XtxResponse<Goods[]>,
      { id: string; type: number; limit: number }
    >({ url: "/goods/hot", data: { id, type, limit } });
  }
  static getEvaluateInfo(id: string) {
    return XtxRequestManager.instance.request<XtxResponse<EvaluateInfo>>({
      url: `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`,
    });
  }
  static getEvaluateList(id: string, reqParams: EvaluateRequestParams) {
    return XtxRequestManager.instance.request<
      XtxResponse<Pagination<Evaluate>>
    >({
      url: "https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page",
      params: reqParams,
    });
  }
}
