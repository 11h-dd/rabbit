<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import XtxRequestManager from "./utils/XtxRequestManager";
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();
userStore.$patch({ profile: { token: "test token" } });
// XtxRequestManager.instance.request<'返回值类型', {
//   a: 'data数据类型'
// }>({
//   url: "123",
//   data: { a: 'data数据类型' }
// })
// const v2 = XtxRequestManager.instance
// console.log(v1 === v2, 'v1===v2')
</script>

<template>
  <RouterView />
</template>

<style scoped lang="less">
.box {
  color: @xtxColor;
  .hoverShadow;
}
</style>
