<script setup lang="ts">
import { useCateGoryStore } from "@/stores/CateGory";
const store = useCateGoryStore();
const route = useRoute();
const target = computed(() => store.currentTop(route.params.id as string));
</script>

<template>
  <XtxBread>
    <XtxBreadItem path="/">首页</XtxBreadItem>
    <transition name="fade-right" mode="out-in">
      <XtxBreadItem :key="target?.id">{{ target?.name }}</XtxBreadItem>
    </transition>
  </XtxBread>
</template>

<style scoped lang="less"></style>
