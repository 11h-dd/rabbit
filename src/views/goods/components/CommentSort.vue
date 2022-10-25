<script setup lang="ts">
import type { EvaluateRequestParams } from "@/types/Goods";

const props = defineProps<{
  reqParams: EvaluateRequestParams;
}>();
const emit = defineEmits<{
  (e: "update:reqParams"): void;
}>();
const reqParams = useVModel(props, "reqParams", emit);
function updateReqParams(params: Partial<EvaluateRequestParams>) {
  reqParams.value = {
    ...reqParams.value,
    ...params,
  };
}
</script>
<template>
  <div class="sort">
    <span>排序：</span>
    <a
      href="javascript:"
      :class="{ active: reqParams.sortField == '' }"
      @click="updateReqParams({ sortField: '' })"
      >默认</a
    >
    <a
      href="javascript:"
      :class="{ active: reqParams.sortField == 'praiseCount' }"
      @click="updateReqParams({ sortField: 'praiseCount' })"
      >最新</a
    >
    <a
      href="javascript:"
      :class="{ active: reqParams.sortField == 'createTime' }"
      @click="
        updateReqParams({
          sortField: 'createTime',
        })
      "
      >最热</a
    >
  </div>
</template>
<style scoped lang="less">
.sort {
  height: 60px;
  line-height: 60px;
  border-top: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;
  margin: 0 20px;
  color: #666;
  > span {
    margin-left: 20px;
  }
  > a {
    margin-left: 30px;
    &.active,
    &:hover {
      color: @xtxColor;
    }
  }
}
</style>
