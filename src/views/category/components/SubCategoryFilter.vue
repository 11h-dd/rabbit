<script setup lang="ts">
import { useCateGoryStore } from "@/stores/CateGory";
import { onBeforeRouteUpdate } from "vue-router";
import omitBy from "lodash/omitBy";
import type { GoodsRequestParams } from "@/types/GoodsRequestParams";
import transform from "lodash/transform";
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
const emit = defineEmits<{
  (e: "onChanged", params: FiltersParams): void;
}>();
//父组件需要的数据
type FiltersParams = Partial<Pick<GoodsRequestParams, "brandId" | "attrs">>;
interface SelectFilters {
  brandId: string;
  [groupName: string]: string;
}
const selectedFilters = ref<Partial<SelectFilters>>({}); //Partial 可选参数
function OnSelectedFiltersChanged(filter: Partial<SelectFilters>) {
  selectedFilters.value = { ...selectedFilters.value, ...filter };
  const params = transform(
    omitBy(selectedFilters.value, (value) => value === undefined),
    (result: FiltersParams, value, key) => {
      if (key === "brandId") {
        result[key] = value!;
      } else {
        if (typeof result.attrs === "undefined") result["attrs"] = [];
        result["attrs"].push({
          groupName: key,
          propertyName: value!,
        });
      }
    },
    {}
  );

  emit("onChanged", params);
}
onBeforeRouteUpdate((to) => {
  // 重置用户选择的筛选条件
  selectedFilters.value = {};
});
</script>
<template>
  <div class="sub-filter" v-if="subCategoryFilters.status === 'loading'">
    <XtxSkeleton class="item" width="800px" height="25px" />
    <XtxSkeleton class="item" width="800px" height="25px" />
    <XtxSkeleton class="item" width="600px" height="25px" />
    <XtxSkeleton class="item" width="600px" height="25px" />
    <XtxSkeleton class="item" width="600px" height="25px" />
  </div>
  <div class="sub-filter" v-else>
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          :class="{ active: selectedFilters.brandId == undefined }"
          href="javascript:"
          @click="OnSelectedFiltersChanged({ brandId: undefined })"
          >全部</a
        >
        <a
          href="javascript:"
          v-for="brand in subCategoryFilters.result[route.params.sub as string].brands"
          :key="brand.id"
          :class="{ active: selectedFilters.brandId == brand.id }"
          @click="OnSelectedFiltersChanged({ brandId: brand.id })"
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
        <a
          href="javascript:"
          :class="{
            active: selectedFilters[saleProperties.name] == undefined,
          }"
          @click="
            OnSelectedFiltersChanged({ [saleProperties.name]: undefined })
          "
          >全部</a
        >
        <a
          href="javascript:"
          v-for="property in saleProperties.properties"
          :key="property.id"
          :class="{
            active: selectedFilters[saleProperties.name] == property.name,
          }"
          @click="
            OnSelectedFiltersChanged({ [saleProperties.name]: property.name })
          "
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
.xtx-skeleton {
  margin: 10px 0;
}
</style>
