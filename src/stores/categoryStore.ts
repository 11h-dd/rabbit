import { CategoryAPI } from "@/api/CategoryAPI";
import type { CateGory } from "@/types/cateGory";
import type { Status } from "@/types/Status";

type State = {
  categories: {
    homeCategory: CateGory[];
    status: Status;
  };
};
type Actions = {
  getCategories(): void;
};
export const useCategoryStore = defineStore<"category", State, Actions>(
  "category",
  {
    state: () => ({
      categories: {
        homeCategory: [],
        status: "idle",
      },
    }),
    actions: {
      async getCategories() {
        this.categories.status = "loading";
        try {
          const response = await CategoryAPI.getCategory();
          this.categories.homeCategory = response.result.map((category) => ({
            ...category,
            children: category.children?.slice(0, 2),
          }));
          this.categories.status = "success";
        } catch (e) {
          console.log(e);
          this.categories.status = "error";
        }
      },
    },
  }
);
