<script setup lang="ts">
import { useGoodsStore } from "@/stores/goodsStore";
import { onBeforeRouteUpdate } from "vue-router";
import GoodsBread from "./components/GoodsBread.vue";
const store = useGoodsStore();
const { goodsInfo } = storeToRefs(store);
const { getGoodsInfo, updateGoods } = store;
const route = useRoute();
//route字符换数组 为什么是字符串数组呢 如何变成数组呢
//在router.js 文件后又后面加上*
// path: "goods/:id*",多个参数
getGoodsInfo(<string>route.params.id);
const { result, status } = toRefs(goodsInfo.value);
onBeforeRouteUpdate((to) => getGoodsInfo(to.params.id as string));
const skuId = ref<string | undefined>();
const count = ref(1);
</script>
<template>
  <div class="xtx-goods-page">
    <div class="container" v-if="status === 'success'">
      <!-- 面包屑 -->
      <GoodsBread></GoodsBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <!-- 左侧 -->
        <div class="media"><GoodsImages /><GoodsSales /></div>
        <!-- 右侧 -->
        <div class="spec">
          <GoodsInfo /><GoodsSku
            :specs="goodsInfo.result.specs"
            :skus="goodsInfo.result.skus"
            sku-id="1369155864430120962"
            @complete="
              updateGoods($event);
              skuId = $event.skuId;
            "
            @incomplete="skuId = undefined"
          />
          <XtxNumberBox
            :max="goodsInfo.result.inventory"
            v-model:count="count"
          />
          <XtxButton type="primary" :style="{ 'margin-top': '20px' }"
            >加入购物车</XtxButton
          >
        </div>
      </div>
      <!-- 同类商品 -->
      <GoodsRelevant :goods-id="goodsInfo.result.id"></GoodsRelevant>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs">
            <GoodsTab />
          </div>
        </div>
        <!-- 24热榜 -->
        <div class="goods-aside">
          <GoodsHot :id="goodsInfo.result.id" :type="1" />
          <GoodsHot :id="goodsInfo.result.id" :type="2" />
          <GoodsHot :id="goodsInfo.result.id" :type="3" />
        </div>
      </div>
    </div>
    <div class="container loading-container" v-if="status === 'loading'">
      <img src="@/assets/images/loading.gif" />
    </div>
  </div>
</template>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  background: #fff;
}
</style>
