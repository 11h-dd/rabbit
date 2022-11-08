import type { CollectionParams, CollectionResponse } from "@/types/Member";
import type { Pagination, XtxResponse } from "@/types/Response";
import XtxRequestManager from "@/utils/XtxRequestManager";

export class MemberAPI {
  // 获取收藏列表
  static getCollections(reqParams: CollectionParams) {
    return XtxRequestManager.instance.request<
      XtxResponse<Pagination<CollectionResponse>>
    >({
      url: "/member/collect",
      params: reqParams,
    });
  }
}
