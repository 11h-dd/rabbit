import { useUserStore } from "@/stores/userStore";

export default function isLogin() {
  const token = useUserStore().profile.result.token;
  return typeof token !== "undefined";
}
