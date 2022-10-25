import type { Brands } from "./Brands";
import type { CateGory } from "./cateGory";
import type { User } from "@/types/Users";

export interface Goods {
  id: string;
  name: string;
  desc: string;
  price: string;
  picture: string;
  discount: number | null;
  orderNum: number | null;
  spuCode: string;
  oldPrice: string;
  inventory: number;
  brand: Brands[];
  salesCount: number;
  commentCount: number;
  collectCount: number;
  mainVideos: string[];
  videoScale: number;
  mainPictures: string[];
  specs: Spec[];
  skus: Sku[];
  categories: Pick<CateGory, "id" | "name" | "layer" | "parent">[];
  details: GoodsDetailInfo;
  isPreSale: boolean;
  isCollect: boolean;
  userAddresses: null;
  similarProducts: Goods[];
  hotByDay: Goods[];
  evaluationInfo: null;
}
export interface Spec {
  id: string;
  name: string;
  values: SpecValue[];
}
// 规格选项
export interface SpecValue {
  name: string;
  picture: string;
  desc: string;
  selected: boolean;
}
// 库存单位
export interface Sku {
  id: string;
  skuCode: string;
  price: string;
  oldPrice: string;
  inventory: number;
  specs: { name: string; valueName: string }[];
}
// 商品详情信息
export interface GoodsDetailInfo {
  pictures: string[];
  properties: { name: string; value: string }[];
}

// 评价信息
export interface EvaluateInfo {
  // 售卖数量
  salesCount: number;
  // 好评率
  praisePercent: string;
  // 评价数量(总)
  evaluateCount: number;
  // 评价数量(有图)
  hasPictureCount: number;
  // 评价标签
  tags: EvaluateTag[];
}

// 评价标签
export interface EvaluateTag {
  // 标签名称
  title: string;
  // 被打标签的数量
  tagCount: number;
}
export interface EvaluateRequestParams {
  page: number;
  pageSize: number;
  hasPicture: boolean;
  tag: string;
  sortField: "" | "praiseCount" | "createTime";
}

export interface Evaluate {
  id: string;
  score: number;
  content: string;
  officialReply: string;
  praiseCount: number;
  createTime: string;
  orderInfo: {
    quantity: number;
    createTime: string;
    specs: EvaluateSpec[];
  };
  member: Pick<User, "id" | "nickname" | "avatar">;
  tags: string[];
  pictures: string[];
}

// 评价中的规格
export interface EvaluateSpec {
  name: string;
  nameValue: string;
}
