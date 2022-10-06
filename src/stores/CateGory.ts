import { CategoryAPI } from "@/api/CategoryAPI";
import { CATEGORIES } from "@/constants/categories";
import type { CateGory } from "@/types/cateGory";
import type { Status } from "@/types/Status";
type State = {
  categories: {
    headerNav: (CateGory & { isOpen: boolean })[];
    status: Status;
  };
};

type Actions = {
  getCategories(): Promise<void>;
  toggle(id: string, isOpen: boolean): void;
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
