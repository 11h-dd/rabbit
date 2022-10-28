import type { Cart } from "@/types/Cart";
import type { Sku, Spec } from "@/types/Goods";
import type { XtxResponse } from "@/types/Response";
import XtxRequestManager from "@/utils/XtxRequestManager";

export class CartAPI {
  //加入购物车
  static addProductToCart(skuId: string, count: number) {
    return XtxRequestManager.instance.request<
      XtxResponse<Cart>,
      {
        skuId: string;
        count: number;
      }
    >({
      url: "/member/cart",
      method: "post",
      data: { skuId, count },
    });
  }
  //获取购物车列表
  static getCarts() {
    return XtxRequestManager.instance.request<XtxResponse<Cart>>({
      url: "/member/cart",
    });
  }
  //删除
  static removeGoodsOfCart(args: {
    ids?: string[];
    clearAll?: boolean;
    clearInvalid?: boolean;
  }) {
    return XtxRequestManager.instance.request<XtxResponse<boolean>>({
      method: "delete",
      url: "/member/cart",
      data: args,
    });
  }
  //修改购物车商品信息 (是否选中,数量)
  static alterCartGoods(args: {
    id: string;
    selected?: boolean;
    count?: number;
  }) {
    return XtxRequestManager.instance.request<XtxResponse<Cart>>({
      url: `/member/cart/${args.id}`,
      method: "put",
      data: args,
    });
  }
  // 全选、取消全选
  static selecteAndDeselect(selected: boolean) {
    return XtxRequestManager.instance.request<
      XtxResponse<null>,
      { selected: boolean }
    >({
      url: "/member/cart/selected",
      method: "put",
      data: {
        selected,
      },
    });
  }
  //skuid
  static getSkuInfo(id: string) {
    return XtxRequestManager.instance.request<
      XtxResponse<{ specs: Spec[]; skus: Sku[] }>
    >({
      url: `/goods/sku/${id}`,
    });
  }
}
