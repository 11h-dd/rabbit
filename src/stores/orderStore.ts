import OrderAPI from "@/api/OrderAPI";
import type {
  Address,
  LogisticsResponse,
  OrderOfCreateResponse,
  OrderResponse,
  OrderState,
  SubmitOrderObject,
  SubmitOrderResponse,
} from "@/types/Orders";
import type { Pagination } from "@/types/Response";
import type { Status } from "@/types/Status";
export interface EditAdressObject {
  // 修改时使用
  id?: string;
  // 修改时使用
  fullLocation?: string;
  receiver: string;
  contact: string;
  provinceCode: string;
  cityCode: string;
  countyCode: string;
  address: string;
  postalCode: string;
  addressTags: string;
  isDefault: boolean | number;
}
type State = {
  // 被创建的临时订单信息
  orderOfCreate: {
    result: Partial<OrderOfCreateResponse>;
    status: Status;
  };
  address: {
    result: Address[];
    status: Status;
  };
  //订单
  orderInfo: {
    result: OrderResponse;
    status: Status;
  };
  // 我的订单列表
  myOrderList: {
    [key in OrderState]: {
      result: Partial<Pagination<OrderResponse>>;
      status: Status;
    };
  };
  //物流信息
  logistic: {
    result: Partial<LogisticsResponse>;
    status: Status;
  };
};
type Getters = {};
type Actions = {
  // 创建订单
  createOrder(): Promise<void>;
  //添加收获地址
  addAddress(address: EditAdressObject): Promise<{ id: string }>;
  //获取收货地址列表
  getAddressList(): Promise<void>;
  updateAddress(address: EditAdressObject): Promise<{ id: string }>;
  submitOrder(order: SubmitOrderObject): Promise<SubmitOrderResponse>;
  getORderInforbyId(id: string): Promise<void>;
  // 获取我的订单列表
  // 获取我的订单列表
  getMyOrderList(
    page: number,
    pageSize: number,
    orderState: OrderState
  ): Promise<void>;
  //取消订单
  cancelOrder(id: string, reason: string): Promise<OrderResponse>;
  //删除
  removeOrder(ids: string[]): Promise<null>;
  // 收货确认
  confirmReceiptGoods(id: string): Promise<null>;
  //获取物流信息
  getViewLogistics(is: string): Promise<void>;
  // 再次购买
  createOrderById(id: string): Promise<void>;
};
export const useOrderStore = defineStore<"order", State, Getters, Actions>(
  "order",
  {
    state: () => ({
      // 被创建的临时订单信息
      orderOfCreate: {
        result: {
          userAddresses: [],
          goods: [],
          summary: {
            goodsCount: 0,
            totalPrice: 0,
            totalPayPrice: 0,
            postFee: 0,
            discountPrice: 0,
          },
        },
        status: "idle",
      },
      address: {
        result: [],
        status: "idle",
      },
      orderInfo: {
        result: {},
        status: "idle",
      },
      // 我的订单列表
      // 我的订单列表
      myOrderList: {
        0: { result: {}, status: "idle" },
        1: { result: {}, status: "idle" },
        2: { result: {}, status: "idle" },
        3: { result: {}, status: "idle" },
        4: { result: {}, status: "idle" },
        5: { result: {}, status: "idle" },
        6: { result: {}, status: "idle" },
      },
      //物流信息
      logistic: {
        result: {},
        status: "idle",
      },
    }),
    actions: {
      // 创建订单
      async createOrder() {
        // 更新加载状态
        this.orderOfCreate.status = "loading";
        // 捕获错误
        try {
          // 发送请求创建订单
          const response = await OrderAPI.createOrder();
          // 存储订单信息
          this.orderOfCreate.result = response.result;
          // 更新加载状态
          this.orderOfCreate.status = "success";
        } catch (error) {
          // 更新加载状态
          this.orderOfCreate.status = "error";
        }
      },
      async addAddress(address) {
        const response = await OrderAPI.addAddress(address);
        return response.result;
      },
      async getAddressList() {
        this.address.status = "loading";
        try {
          const response = await OrderAPI.getAddressList();
          this.address.result = response.result;
          this.address.status = "success";
        } catch (err) {
          this.address.status = "error";
        }
      },
      async updateAddress(address) {
        const { id, ...rest } = address;
        const response = await OrderAPI.updateAddress(id!, rest);
        return response.result;
      },
      async submitOrder(order) {
        const response = await OrderAPI.submit(order);
        return response.result;
      },
      async getORderInforbyId(id) {
        this.orderInfo.status = "loading";
        try {
          const response = await OrderAPI.getOrderInfoById(id);
          this.orderInfo.result = response.result;
          this.orderInfo.status = "success";
        } catch (err) {
          this.orderInfo.status = "error";
        }
      },
      // 获取我的订单列表
      async getMyOrderList(page, pageSize, orderState) {
        // 更新请求状态
        this.myOrderList[orderState].status = "loading";

        // 捕获请求错误
        try {
          // 发送请求获取我的订单列表
          const response = await OrderAPI.getMyOrders(
            page,
            pageSize,
            orderState
          );
          // 保存
          this.myOrderList[orderState].result = response.result;
          // 更新请求状态
          this.myOrderList[orderState].status = "success";
          // console.log(
          //   this.myOrderList[orderState].result,
          //   "this.myOrderList[orderState].result"
          // );
        } catch (error) {
          // 更新请求状态
          this.myOrderList[orderState].status = "error";
        }
      },
      async cancelOrder(id, reason) {
        const response = await OrderAPI.cancelOrder(id, reason);
        return response.result;
      },
      async removeOrder(ids) {
        const response = await OrderAPI.removeOrder(ids);
        return response.result;
      },
      async confirmReceiptGoods(id) {
        const response = await OrderAPI.confirmReceiptGoods(id);
        return response.result;
      },
      async getViewLogistics(id) {
        this.logistic.status = "loading";
        try {
          const response = await OrderAPI.viewLogistics(id);
          this.logistic.result = response.result;
          this.logistic.status = "success";
        } catch (error) {
          this.logistic.status = "error";
        }
      },
      async createOrderById(id) {
        // 更新加载状态
        this.orderOfCreate.status = "loading";
        // 捕获请求错误
        try {
          // 发送请求 创建订单
          const response = await OrderAPI.createOrderById(id);
          // 存储订单信息
          this.orderOfCreate.result = response.result;
          // 更新加载状态
          this.orderOfCreate.status = "success";
        } catch (error) {
          // 更新加载状态
          this.orderOfCreate.status = "error";
        }
      },
    },
  }
);
