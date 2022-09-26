import type { CateGory } from "@/types/cateGory";
import type { XtxResponse } from "@/types/Response";
import XtxRequestManager from "@/utils/XtxRequestManager";

export class CategoryAPI {
  static getCategory() {
    return XtxRequestManager.instance.request<XtxResponse<CateGory[]>>({
      url: "/home/category/head",
    });
  }
}
