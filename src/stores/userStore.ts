import { defineStore } from "pinia";
import type { User } from "@/types/Users";
import type { Status } from "@/types/Status";
import type { XtxResponse } from "@/types/Response";
import { AxiosError } from "axios";
type State = {
  profile: {
    result: Partial<User>;
    status: Status;
    error: string;
  };
};
type Getters = {};
type Actions = {
  //全部登录
  login(callback: () => Promise<XtxResponse<User>>): Promise<void>;
};
export const useUserStore = defineStore<"user", State, Getters, Actions>(
  "user",
  {
    state: () => ({ profile: { result: {}, status: "idle", error: "" } }),
    getters: {},
    actions: {
      async login(callback) {
        this.profile.status = "loading";
        this.profile.error = "";
        try {
          const response = await callback();
          this.profile.result = response.result;
          this.profile.status = "success";
        } catch (err) {
          this.profile.status = "error";
          if (err instanceof AxiosError) {
            this.profile.error = err.response?.data.message;
          } else if (err instanceof Error) {
            this.profile.error = err.message;
          }
        }
      },
    },
    persist: true,
  }
);
