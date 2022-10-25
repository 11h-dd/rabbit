import { GoodsAPI } from "@/api/GoodsAPI";
import type {
  Goods,
  GoodsDetailInfo,
  EvaluateInfo,
  Evaluate,
  EvaluateRequestParams,
} from "@/types/Goods";
import type { Pagination } from "@/types/Response";
import type { Status } from "@/types/Status";
import chunk from "lodash/chunk";
export interface Data {
  price: string;
  oldPrice: string;
  inventory: number; //库存
  skuId: string;
}
type State = {
  goodsInfo: {
    result: Goods;
    status: Status;
  };
  relevantAndLike: {
    // 加载状态
    status: Status;
    // 同类商品
    relevantGoods: { [id: string]: Goods[][] };
    // 猜你喜欢
    likeGoods: Goods[][];
  };
  hotSaleGoods: {
    // 加载状态
    status: Status;
    // 榜单数据
    result: {
      // 24小时榜
      1: Goods[];
      // 周榜
      2: Goods[];
      // 总榜
      3: Goods[];
    };
  };
  evaluateInfo: {
    result: EvaluateInfo;
    status: Status;
  };
  // 商品评价列表
  evaluateList: {
    result: Pagination<Evaluate>;
    status: Status;
  };
};
type Actions = {
  //id获取信息
  getGoodsInfo(id: string): Promise<void>;
  updateGoods(data: Data): void;
  getRelevantLikeGoods(args?: { id?: string; limit?: number }): Promise<void>;
  getHotSaleGoods(id: string, type: 1 | 2 | 3, limit?: number): Promise<void>;
  getEvaluateInfo(id: string): Promise<void>;
  getEvaluateList(id: string, reqParams: EvaluateRequestParams): Promise<void>;
};
type Getters = {
  // 获取商品图片
  mainPictures(): string[];
  baseInfo(): Pick<Goods, "name" | "desc" | "price" | "oldPrice">;
  goodsPropeties(): GoodsDetailInfo;
};
export const useGoodsStore = defineStore<"goods", State, Getters, Actions>(
  "goods",
  {
    state: () => ({
      goodsInfo: {
        status: "idle",
        result: {
          id: "",
          name: "",
          desc: "",
          price: "",
          picture: "",
          discount: null,
          orderNum: null,
          spuCode: "",
          oldPrice: "",
          inventory: 0,
          brand: [],
          salesCount: 0,
          commentCount: 0,
          collectCount: 0,
          mainVideos: [],
          videoScale: 0,
          mainPictures: [],
          specs: [],
          skus: [],
          categories: [],
          details: {
            pictures: [],
            properties: [],
          },
          isPreSale: false,
          isCollect: false,
          userAddresses: null,
          similarProducts: [],
          hotByDay: [],
          evaluationInfo: null,
        },
      },
      relevantAndLike: {
        // 加载状态
        status: "idle",
        // 同类商品
        relevantGoods: {},
        // 猜你喜欢
        likeGoods: [],
      },
      hotSaleGoods: {
        status: "idle",
        result: {
          1: [],
          2: [],
          3: [],
        },
      },
      evaluateInfo: {
        result: {
          salesCount: 0,
          praisePercent: "",
          evaluateCount: 0,
          hasPictureCount: 0,
          tags: [],
        },
        status: "idle",
      },
      evaluateList: {
        result: {
          page: 0,
          pages: 0,
          pageSize: 0,
          counts: 0,
          items: [],
        },
        status: "idle",
      },
    }),
    actions: {
      //根据id获取数据
      async getGoodsInfo(id) {
        this.goodsInfo.status = "loading";
        try {
          const response = await GoodsAPI.getGoodsInfo(id);
          this.goodsInfo.result = response.result;
          this.goodsInfo.status = "success";
        } catch (e) {
          this.goodsInfo.status = "error";
        }
      },
      updateGoods(data) {
        this.goodsInfo.result.price = data.price;
        this.goodsInfo.result.oldPrice = data.oldPrice;
        this.goodsInfo.result.inventory = data.inventory;
      },
      async getRelevantLikeGoods(args) {
        this.relevantAndLike.status = "loading";
        try {
          const response = await GoodsAPI.getRelevantGoods(args);
          const result = chunk(response.result, 4);
          if (args?.id) {
            this.relevantAndLike.relevantGoods[args.id] = result;
          } else {
            // 存储猜你喜欢
            this.relevantAndLike.likeGoods = result;
          }
          this.relevantAndLike.status = "success";
        } catch (err) {
          this.relevantAndLike.status = "error";
        }
      },
      async getHotSaleGoods(id, type, limit) {
        this.hotSaleGoods.status = "loading";
        try {
          const response = await GoodsAPI.getHotSaleGoods(id, type, limit);
          this.hotSaleGoods.result[type] = response.result;
          this.hotSaleGoods.status = "success";
        } catch (e) {
          this.hotSaleGoods.status = "error";
        }
      },
      async getEvaluateInfo(id) {
        this.evaluateInfo.status = "loading";
        try {
          const response = await GoodsAPI.getEvaluateInfo(id);
          this.evaluateInfo.result = response.result;
          this.evaluateInfo.status = "success";
        } catch (err) {
          this.evaluateInfo.status = "error";
        }
      },
      async getEvaluateList(id, reqParams) {
        // 更新加载状态
        this.evaluateList.status = "loading";
        // 捕获错误
        try {
          // 发送请求获取评价列表
          let response = await GoodsAPI.getEvaluateList(id, reqParams);
          // 存储评价列表
          this.evaluateList.result = response.result;
          // 更新加载状态
          this.evaluateList.status = "success";
        } catch (e) {
          // 更新加载状态
          this.evaluateList.status = "error";
        }
      },
    },
    getters: {
      mainPictures() {
        return this.goodsInfo.result.mainPictures;
      },
      baseInfo() {
        const { name, desc, price, oldPrice } = this.goodsInfo.result;
        return { name, desc, price, oldPrice };
      },
      goodsPropeties() {
        return {
          pictures: this.goodsInfo.result.details.pictures,
          properties: this.goodsInfo.result.details.properties,
        };
      },
    },
  }
);
