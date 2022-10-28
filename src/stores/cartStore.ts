import { CartAPI } from "@/api/CartAPI";
import type { Cart } from "@/types/Cart";
import type { Sku, Spec } from "@/types/Goods";
import type { Status } from "@/types/Status";

type State = {
  carts: {
    result: Cart[];
    status: Status;
  };
};
type Actions = {
  addProductToCart(skuId: string, count: number): Promise<Cart>;
  getCarts(): Promise<void>;
  removeGoodsOfCart(args: {
    ids?: string[];
    clearAll?: boolean;
    clearInvalid?: boolean;
  }): Promise<void>;
  //修改
  alterCartGoods(args: {
    id: string;
    selected?: string;
    count?: number;
  }): Promise<Cart>;
  selecteAndDeselect(selected: boolean): Promise<void>;
};
type Getters = {
  //可购买
  effectiveGoods(): Cart[];
  //计算可购买数量
  effectiveTotalQuantity(): number;
  //商品总价
  effectiveTotalPrice(): number;
  //用户选择的商品列表
  selectGoods(): Cart[];
  //选择的商品数量
  selectedQuantity(): number;
  //选择的商品数量的价格
  selectedPrice(): number;
  //无效列表
  invalidGoods(): Cart[];
  //全选单选
  isAllSelected(): boolean;
};
export const useCartStore = defineStore<"cart", State, Getters, Actions>(
  "cart",
  {
    state: () => ({
      carts: {
        result: [],
        status: "idle",
      },
    }),
    actions: {
      async addProductToCart(skuId, count) {
        const response = await CartAPI.addProductToCart(skuId, count);
        await this.getCarts();
        return response.result;
      },
      async getCarts() {
        this.carts.status = "loading";
        try {
          const response = await CartAPI.getCarts();
          this.carts.result = response.result;
          this.carts.status = "success";
        } catch (error) {
          this.carts.status = "error";
        }
      },
      async removeGoodsOfCart(args) {
        const response = await CartAPI.removeGoodsOfCart(args);
        if (response.msg == "操作成功") {
          this.getCarts();
        } else {
        }
      },
      async alterCartGoods(args) {
        const response = await CartAPI.alterCartGoods(args);
        this.getCarts();
        return response.result;
      },
      async selecteAndDeselect(selected) {
        // 发送请求实现全选和取消全选
        await CartAPI.selecteAndDeselect(selected);
        // 更新购物车
        this.getCarts();
      },
    },
    getters: {
      effectiveGoods() {
        return this.carts.result.filter(
          (item) => item.isEffective && item.stock > 0
        );
      },
      effectiveTotalQuantity() {
        return this.carts.result.reduce(
          (quan, item) => (quan += item.count),
          0
        );
      },
      effectiveTotalPrice() {
        return this.carts.result.reduce(
          (totalPrice, item) => (totalPrice += parseFloat(item.nowPrice)),
          0
        );
      },
      selectGoods() {
        return this.effectiveGoods.filter((item) => item.selected);
      },
      selectedQuantity() {
        return this.selectGoods.length;
      },
      selectedPrice() {
        return this.selectGoods.reduce(
          (price, item) => (price += parseFloat(item.nowPrice)),
          0
        );
      },
      invalidGoods() {
        return this.carts.result.filter(
          (item) => !item.isEffective || item.stock === 0
        );
      },
      isAllSelected() {
        // if (this.selectedQuantity === 0) return false;
        return this.effectiveTotalQuantity === this.selectedQuantity;
      },
    },
  }
);
