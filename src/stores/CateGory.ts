import { CategoryAPI } from "@/api/CategoryAPI";
import type { CateGory } from "@/types/cateGory";
import type { Status } from "@/types/Status";
type State = {
  categories: {
    headerNav: CateGory[];
    status: Status;
  };
};

type Actions = {
  getCategories(): Promise<void>;
};
type Getters = {};
export const useCateGoryStore = defineStore<
  "Category",
  State,
  Actions,
  Getters
>("Category", {
  state: () => ({
    categories: {
      headerNav: [],
      status: "idle",
    },
  }),
  actions: {
    async getCategories() {
      this.categories.status = "loading";
      try {
        const response = await CategoryAPI.getCategory();
        this.categories.headerNav = response.result;
        this.categories.status = "success";
      } catch (err) {
        console.log(err);
        this.categories.status = "error";
      }
    },
  },
});
