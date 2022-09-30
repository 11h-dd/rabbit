import { HomeAPI } from "@/api/HomeAPI";
import type { Brands } from "@/types/Brands";
import type { Status } from "@/types/Status";

type State = {
  brands: {
    result: Brands[];
    status: Status;
  };
};
type Getters = {};

type Actions = {
  // 获取推荐品牌
  getBrands(limit?: number): Promise<void>;
};

export const useHomeStores = defineStore<"home", State, Actions, Getters>(
  "home",
  {
    state: () => ({
      brands: {
        result: [],
        status: "idle",
      },
    }),
    actions: {
      async getBrands(limit = 10) {
        this.brands.status = "loading";
        try {
          const response = await HomeAPI.getHotBrands(limit);
          this.brands.result = response.result;
          this.brands.status = "success";
        } catch (e) {
          console.log(e);
          this.brands.status = "error";
        }
      },
    },
  }
);
