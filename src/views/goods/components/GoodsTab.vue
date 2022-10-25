<script setup lang="ts">
import { useGoodsStore } from "@/stores/goodsStore";
import GoodsComment from "./GoodsComment.vue";
import GoodsDetail from "./GoodsDetail.vue";
const store = useGoodsStore();
const { evaluateInfo } = storeToRefs(store);
const activeComponentName = ref("GoodsDetail");
</script>
<template>
  <!-- 详情 -->
  <div class="goods-tabs">
    <nav>
      <a
        @click="activeComponentName = 'GoodsDetail'"
        :class="{ active: activeComponentName === 'GoodsDetail' }"
        href="javascript:"
        >商品详情</a
      >
      <a
        @click="activeComponentName = 'GoodsComment'"
        :class="{ active: activeComponentName === 'GoodsComment' }"
        href="javascript:"
        >商品评价<span>({{ evaluateInfo.result.evaluateCount }})</span></a
      >
    </nav>
    <!-- 切换内容的地方 -->
    <!-- <component
      :is="activeComponentName == 'GoodsDetail' ? GoodsDetail : GoodsComment"
    /> -->
    <GoodsDetail v-show="activeComponentName === 'GoodsDetail'" />
    <GoodsComment v-show="activeComponentName === 'GoodsComment'" />
  </div>
</template>

<style lang="less" scoped>
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @xtxColor;
        }
      }
    }
  }
}
</style>
