<script setup lang="ts">
import { useCateGoryStore } from "@/stores/CateGory";

const store = useCateGoryStore();
const route = useRoute();
const target = computed(() =>
  store.currentTopAndSub(route.params.top as string, route.params.sub as string)
);
</script>
<template>
  <XtxBread>
    <XtxBreadItem path="/">首页</XtxBreadItem>
    <transition name="fade-right" mode="out-in">
      <XtxBreadItem :key="target.topCategory?.id">{{
        target.topCategory?.name
      }}</XtxBreadItem>
    </transition>
    <transition name="fade-right" mode="out-in">
      <XtxBreadItem :key="target.subCategory?.id">{{
        target.subCategory?.name
      }}</XtxBreadItem>
    </transition>
  </XtxBread>
</template>
