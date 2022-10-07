import type { CateGory } from "@/types/cateGory";
import type { XtxResponse } from "@/types/Response";
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
}
