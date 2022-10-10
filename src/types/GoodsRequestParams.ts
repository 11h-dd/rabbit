export interface GoodsRequestParams {
  categoryId: string; //分类ID
  inventory: boolean; //受否有库存
  onlyDiscount: boolean; //只显示特惠
  brandId: string; //品牌ID
  attrs: { groupName: string; propertyName: string }[]; //属性条件数组
  sortField: "" | "publishTime" | "orderNum" | "price" | "evaluateNum"; //排序字段
  sortMethod: "" | "asc" | "desc"; //排序规则
  page: number; //当前页
  pagesize: number; //页条数
  lowPrice: number; //最低价
  highPrice: number; //最高价
}
// export interface GoodsRequestParams {
//   // 二级分类ID
//   categoryId: string;
//   // 是否仅显示有货商品
//   inventory: boolean;
//   // 是否只显示特惠商品
//   onlyDiscount: boolean;
//   // "": 默认排序
//   // publishTime: 最新商品
//   // orderNum: 最高人气
//   // evaluate: 评论最多
//   // price: 价格
//   sortField: "" | "publishTime" | "orderNum" | "price" | "evaluateNum";
//   // asc: 升序
//   // desc: 降序
//   sortMethod: "" | "asc" | "desc";
//   // 品牌 ID
//   brandId: string;
//   // 筛选条件
//   // groupName: 筛选类别名称
//   // propertyName: 筛选条件名称
//   attrs: { groupName: string; propertyName: string }[];
//   // 当前页
//   page: number;
//   // 每页显示的数据条数
//   pageSize: number;
//   // 最低价
//   lowPrice: number;
//   // 最高价
//   highPrice: number;
// }
