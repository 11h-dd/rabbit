<script setup lang="ts">
import type { VNode } from "vue";

const defaults = useSlots().default?.();
function render() {
  const result = defaults?.reduce((results: VNode[], item, index, array) => {
    if (index < array.length - 1) {
      return results.concat([
        item,
        h("i", { class: "iconfont icon-angle-right" }),
      ]);
    } else {
      return results.concat([item]);
    }
  }, []);
  return h(
    "div",
    {
      class: "xtx-bread",
    },
    result
  );
}
</script>
<template>
  <render />
</template>
<style scoped lang="less">
.xtx-bread {
  display: flex;
  padding: 25px 10px;
}
:deep(i) {
  font-size: 12px;
  margin-left: 5px;
  margin-right: 5px;
  line-height: 20px;
}
</style>
