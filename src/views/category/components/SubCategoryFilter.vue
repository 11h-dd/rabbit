<script setup lang="ts">
import { useCateGoryStore } from "@/stores/CateGory";
import { onBeforeRouteUpdate } from "vue-router";

const store = useCateGoryStore();
const route = useRoute();
// 获取筛选条件状态
const { subCategoryFilters } = storeToRefs(store);
// 获取请求筛选条件的方法
const { getSubCategoryFilters } = store;
getSubCategoryFilters(route.params.sub as string);
// 路由切换前
onBeforeRouteUpdate((to) => {
  // 获取目标页面的筛选条件
  getSubCategoryFilters(to.params.sub as string);
});
</script>
<template>
  <div class="sub-filter" v-if="subCategoryFilters.status === 'success'">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a class="active" href="javascript:">全部</a>
        <a
          href="javascript:"
          v-for="brand in subCategoryFilters.result[route.params.sub as string].brands"
          :key="brand.id"
          >{{ brand.name }}</a
        >
      </div>
    </div>
    <div
      class="item"
      v-for="saleProperties in subCategoryFilters.result[route.params.sub as string].saleProperties"
      :key="saleProperties.id"
    >
      <div class="head">{{ saleProperties.name }}:</div>
      <div class="body">
        <a class="active" href="javascript:">全部</a>
        <a
          href="javascript:"
          v-for="property in saleProperties.properties"
          :key="property.id"
        >
          {{ property.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
