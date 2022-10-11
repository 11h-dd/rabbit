import { CategoryAPI } from "@/api/CategoryAPI";
import { CATEGORIES } from "@/constants/categories";
import type { CateGory } from "@/types/cateGory";
import type { Goods } from "@/types/Goods";
import type { GoodsRequestParams } from "@/types/GoodsRequestParams";
import type { Pagination } from "@/types/Response";
import type { Status } from "@/types/Status";
type State = {
  categories: {
    headerNav: (CateGory & { isOpen: boolean })[];
    status: Status;
  };
  topCategories: {
    result: {
      [id: string]: CateGory;
    };
    status: Status;
  };
  subCategoryFilters: {
    result: {
      [id: string]: CateGory;
    };
    status: Status;
  };
  categoryGoods: {
    result: Pagination<Goods>;
    status: Status;
  };
};

type Actions = {
  getCategories(): Promise<void>;
  toggle(id: string, isOpen: boolean): void;
  getTopCategoryById(id: string): Promise<void>;
  getSubCategoryFilters(id: string): Promise<void>;
  getCategoryGoods(
    categoryId: GoodsRequestParams["categoryId"],
    reqParams?: Partial<Omit<GoodsRequestParams, "categoryId">>
  ): Promise<void>;
};
type Getters = {
  //一级分类
  currentTop: (state: State) => (topCategoryId: string) => CateGory | undefined;
  currentTopAndSub: (state: State) => (
    topCategoryId: string,
    subCategoryId: string
  ) => {
    topCategoryId: CateGory | undefined;
    subCategoryId: CateGory | undefined;
  };
};
export const useCateGoryStore = defineStore<
  "Category",
  State,
  Actions,
  Getters
>("Category", {
  state: () => ({
    categories: {
      headerNav: CATEGORIES.map((cateogry) => ({ ...cateogry, isOpen: false })),
      status: "idle",
    },
    topCategories: {
      result: {},
      status: "idle",
    },
    subCategoryFilters: {
      result: {},
      status: "idle",
    },
    categoryGoods: {
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
    async getCategories() {
      this.categories.status = "loading";
      try {
        const response = await CategoryAPI.getCategory();
        this.categories.headerNav = response.result.map((category) => ({
          ...category,
          isOpen: false,
        }));
        this.categories.status = "success";
      } catch (err) {
        console.log(err);
        this.categories.status = "error";
      }
    },
    toggle(id: string, target: boolean) {
      this.categories.headerNav.forEach((item) => {
        if (item.id === id) item.isOpen = target;
      });
      // const category = this.categories.headerNav.find(
      //   (category) => category.id === id
      // );
      // // 如果目标分类存在, 设置它的 isOpen 属性值为 target
      // if (category) category.isOpen = target;
    },
    async getTopCategoryById(id: string) {
      // 更新加载状态
      this.topCategories.status = "loading";
      // 捕获错误
      try {
        // 发送请求根据一级分类 id 获取分类信息
        let response = await CategoryAPI.getTopCategoryById(id);
        // 存储一级分类信息
        this.topCategories.result[response.result.id] = response.result;
        // 更新加载状态
        this.topCategories.status = "success";
      } catch (e) {
        // 更新加载状态
        this.topCategories.status = "error";
      }
    },
    async getSubCategoryFilters(id: string) {
      // 更新加载状态
      this.subCategoryFilters.status = "loading";
      // 捕获错误
      try {
        // 发送请求获取二级分类商品筛选条件
        let response = await CategoryAPI.getSubCategoryFilters(id);
        // 存储商品筛选条件
        this.subCategoryFilters.result[response.result.id] = response.result;
        // 更新加载状态
        this.subCategoryFilters.status = "success";
      } catch (e) {
        // 更新加载状态
        this.subCategoryFilters.status = "error";
      }
    },
    async getCategoryGoods(categoryId, reqParams) {
      // 如果数据已经加载完成, 不再进行加载
      if (this.categoryGoods.status === "finished") return;
      // 更新加载状态
      this.categoryGoods.status = "loading";
      // 捕获错误
      try {
        // 发送请求获取二级分类商品数据
        let response = await CategoryAPI.getCategoryGoods(
          categoryId,
          reqParams
        );
        // 重新在本地存储分页数据以及商品数据
        if (reqParams?.page === 1) {
          // 存储状态
          this.categoryGoods.result = response.result;
        } else {
          // 累加状态
          this.categoryGoods.result = {
            ...response.result,
            items: [
              ...this.categoryGoods.result.items,
              ...response.result.items,
            ],
          };
        }
        // 如果当前请求页已经是最后一页或者服务端没有商品数据
        if (
          reqParams?.page === response.result.pages ||
          response.result.pages === 0
        ) {
          // 更新加载状态
          this.categoryGoods.status = "finished";
        } else {
          // 更新加载状态
          this.categoryGoods.status = "success";
        }
      } catch (e) {
        // 更新加载状态
        this.categoryGoods.status = "error";
      }
    },
  },
  getters: {
    currentTop: (state) => (topCategoryId: string) =>
      state.categories.headerNav.find((item) => item.id === topCategoryId),
    // currentTopAndSub(state) {
    //   return function (topCategoryId: string, subCategoryId: string) {
    //     const topCategory = state.categories.headerNav.find(
    //       (item) => item.id === topCategoryId
    //     );
    //     const subCategory = topCategory?.children?.find(
    //       (item) => item.id === subCategoryId
    //     );
    //     return { topCategory, subCategory };
    //   };
    // },
    currentTopAndSub:
      (state) => (topCategoryId: string, subCategoryId: string) => {
        const topCategory = state.categories.headerNav.find(
          (item) => item.id === topCategoryId
        );
        const subCategory = topCategory?.children?.find(
          (item) => item.id === subCategoryId
        );
        return { topCategory, subCategory };
      },
  },
});
