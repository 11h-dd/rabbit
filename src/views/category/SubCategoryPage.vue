<script setup lang="ts">
import GoodsList from "@/views/category/components/GoodsList.vue";
import { useCateGoryStore } from "@/stores/CateGory";
import type { GoodsRequestParams } from "@/types/GoodsRequestParams";
import { onBeforeRouteUpdate } from "vue-router";

const categoryStore = useCateGoryStore();
const route = useRoute();
const { categoryGoods } = storeToRefs(categoryStore);
const { getCategoryGoods } = categoryStore;

// 用于存储筛选条件
let filterParams = {};
// 用于存储排序条件
let sortParams = {};
// 用于存储分页数据
let pageParams = { page: 1, pageSize: 10 };

// 用于更新筛选条件
function updateFilterParams(params: Partial<GoodsRequestParams>) {
  filterParams = params;
}
// 用于更新排序条件
function updateSortParams(params: Partial<GoodsRequestParams>) {
  sortParams = params;
}

// 获取请求参数
function getReqParams() {
  return { ...filterParams, ...sortParams, ...pageParams };
}

// 用于发送请求获取商品列表
function sendRequest() {
  // 合并请求参数
  const reqParams = getReqParams();
  // 筛选条件、排序条件发生变化 重置页码
  pageParams.page = 1;
  // 重置请求状态
  categoryGoods.value.status = "loading";
  // 发送请求获取商品列表
  getCategoryGoods(route.params.sub as string, reqParams);
}
// 初始获取商品列表数据
sendRequest();

function loadMore() {
  // 累加页码
  pageParams.page = pageParams.page + 1;
  // 获取请求参数
  const reqParams = getReqParams();
  categoryGoods.value.status = "loading";
  // 发送请求获取商品列表
  getCategoryGoods(route.params.sub as string, reqParams);
}
onBeforeRouteUpdate((to) => {
  // 重置筛选条件
  filterParams = {};
  // 重置排序条件
  sortParams = {};
  // 重置页码
  pageParams.page = 1;
  // 重置请求加载状态
  categoryGoods.value.status = "loading";
  // 获取请求参数
  const reqParams = getReqParams();
  // 发送请求获取商品列表
  getCategoryGoods(to.params.sub as string, reqParams);
});
</script>

<template>
  <div class="container">
    <SubCategoryBread />
    <!-- 筛选条件 -->
    <SubCategoryFilter
      @onChanged="
        updateFilterParams($event);
        sendRequest();
      "
    />
    <div class="goods-list">
      <!-- 当排序条件发生变化时重新获取分类商品 -->
      <SubCategorySort
        @onChanged="
          updateSortParams($event);
          sendRequest();
        "
      />
      <!-- 将商品列表传递到下层组件中 -->
      <GoodsList :goodsList="categoryGoods.result.items" />
      <XtxInfiniteLoading
        @infinite="loadMore"
        :loading="categoryGoods.status === 'loading'"
        :finished="categoryGoods.status === 'finished'"
      />
    </div>
  </div>
</template>
<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
}
</style>
