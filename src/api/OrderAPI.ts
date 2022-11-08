import XtxRequestManager from "@/utils/XtxRequestManager";
import type {
  LogisticsResponse,
  OrderOfCreateResponse,
  OrderResponse,
  OrderState,
  SubmitOrderObject,
  SubmitOrderResponse,
} from "@/types/Orders";
import type { Pagination, XtxResponse } from "@/types/Response";
import type { EditAdressObject } from "@/stores/orderStore";
import type { Address } from "@/types/Orders";
export default class OrderAPI {
  static createOrder() {
    return XtxRequestManager.instance.request<
      XtxResponse<OrderOfCreateResponse>
    >({
      url: "/member/order/pre",
    });
  }
  static addAddress(address: EditAdressObject) {
    return XtxRequestManager.instance.request<
      XtxResponse<{ id: string }>,
      EditAdressObject
    >({
      url: "/member/address",
      method: "post",
      data: address,
    });
  }
  static getAddressList() {
    return XtxRequestManager.instance.request<XtxResponse<Address[]>>({
      url: "/member/address",
    });
  }
  static updateAddress(id: string, address: EditAdressObject) {
    return XtxRequestManager.instance.request<XtxResponse<{ id: string }>>({
      url: `/member/address/${id}`,
      method: "put",
      data: address,
    });
  }
  static submit(order: SubmitOrderObject) {
    return XtxRequestManager.instance.request<
      XtxResponse<SubmitOrderResponse>,
      SubmitOrderObject
    >({
      url: "/member/order",
      method: "post",
      data: order,
    });
  }
  static getOrderInfoById(id: string) {
    return XtxRequestManager.instance.request<XtxResponse<OrderResponse>>({
      url: `/member/order/${id}`,
    });
  }
  // 获取我的订单列表
  static getMyOrders(page: number, pageSize: number, orderState: OrderState) {
    return XtxRequestManager.instance.request<
      XtxResponse<Pagination<OrderResponse>>
    >({
      url: "/member/order",
      params: {
        page,
        pageSize,
        orderState,
      },
    });
  }
  //取消订单1.id 2.取消原因
  static cancelOrder(id: string, cancelReason: string) {
    return XtxRequestManager.instance.request<XtxResponse<OrderResponse>>({
      url: `/member/order/${id}/cancel`,
      method: "put",
      data: {
        cancelReason,
      },
    });
  }
  //删除订单
  static removeOrder(ids: string[]) {
    return XtxRequestManager.instance.request<XtxResponse<null>>({
      url: "/member/order",
      method: "delete",
      data: {
        ids,
      },
    });
  }
  //确认收货
  static confirmReceiptGoods(id: string) {
    return XtxRequestManager.instance.request<XtxResponse<OrderResponse>>({
      url: `/member/order/${id}/receipt`,
      method: "put",
    });
  }
  //查看物流
  static viewLogistics(id: string) {
    return XtxRequestManager.instance.request<XtxResponse<LogisticsResponse>>({
      url: `/member/order/${id}/logistics`,
    });
  }
}
