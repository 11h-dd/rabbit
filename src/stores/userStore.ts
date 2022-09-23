import { defineStore } from "pinia";
import type { User } from "@/types/Users";
type State = {
  profile: Partial<User>;
};
type Getters = {};
type Actions = {};
export const useUserStore = defineStore<"user", State, Getters, Actions>(
  "user",
  {
    state: () => ({ profile: {} }),
    getters: {},
    actions: {},
    persist: true,
  }
);
