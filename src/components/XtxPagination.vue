<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    page: number;
    pages: number;
    maxVisiblePageNum?: number;
  }>(),
  {
    maxVisiblePageNum: 6,
  }
);
const emit = defineEmits<{
  (e: "update:page"): void;
}>();
const page = useVModel(props, "page", emit);

//当前页
// const page = ref(5);
//页面中最大能显示数量
//偏移量
const pageInfo = computed(() => {
  //计算页码偏移量
  const pageOffset = Math.floor(props.maxVisiblePageNum / 2);
  //显示者的开始页面
  let start = page.value - pageOffset;
  //显示着的结束页码
  let end = start + props.maxVisiblePageNum - 1;
  if (start < 1) {
    start = 1;
    //重新计算结束页码
    let end_tmp = start + props.maxVisiblePageNum - 1;
    end = end_tmp > props.pages ? props.pages : end_tmp;
  }
  if (end > props.pages) {
    end = props.pages;
    let start_tmp = end - props.maxVisiblePageNum + 1;
    start = start_tmp < 1 ? 1 : start_tmp;
  }
  let pagesArray = [];
  for (let index = start; index < end; index++) {
    pagesArray.push(index);
  }
  return { start, end, pagesArray };
});
</script>
<template>
  <div class="xtx-pagination">
    <a href="javascript:" v-if="page > 1" @click="page--">上一页</a>
    <span v-if="pageInfo.start > 1">...</span>
    <a
      @click="page = item"
      href="javascript:"
      v-for="item in pageInfo.pagesArray"
      :key="item"
      :class="{ active: item == page }"
      >{{ item }}</a
    >
    <span v-if="pageInfo.end < pages">...</span>
    <a href="javascript:" v-if="page < pages" @click="page++">下一页</a>
  </div>
</template>

<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
