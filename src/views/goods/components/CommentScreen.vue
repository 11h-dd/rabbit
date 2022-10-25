<script setup lang="ts">
import { useGoodsStore } from "@/stores/goodsStore";
import type { EvaluateRequestParams } from "@/types/Goods";
import { onBeforeRouteUpdate } from "vue-router";

const props = defineProps<{ reqParams: EvaluateRequestParams }>();
const emit = defineEmits<{
  (e: "update:reqParams"): void;
}>();
const store = useGoodsStore();
const { evaluateInfo } = storeToRefs(store);
const { getEvaluateInfo } = store;
const route = useRoute();
getEvaluateInfo(route.params.id as string);
const reqParams = useVModel(props, "reqParams", emit);
function updateReqParams(params: Partial<EvaluateRequestParams>) {
  reqParams.value = {
    ...reqParams.value,
    ...params,
    tag: params.hasPicture ? "" : params.tag!,
    hasPicture: params.hasPicture !== undefined,
    page: 1,
  };
}
onBeforeRouteUpdate((to) => {
  getEvaluateInfo(to.params.id as string);
});
</script>
<template>
  <div class="head">
    <div class="data">
      <p>
        <span>{{ evaluateInfo.result.salesCount }}</span
        ><span>人购买</span>
      </p>
      <p>
        <span>{{ evaluateInfo.result.praisePercent }}</span
        ><span>好评率</span>
      </p>
    </div>
    <div class="tags">
      <div class="dt">大家都在说：</div>
      <div class="dd">
        <a
          href="javascript:"
          :class="{ active: reqParams.tag == '全部评价' }"
          @click="updateReqParams({ tag: '全部评价' })"
          >全部评价 ({{ evaluateInfo.result.evaluateCount }})</a
        >
        <a
          href="javascript:"
          :class="{ active: reqParams.hasPicture == true }"
          @click="updateReqParams({ hasPicture: true })"
          >有图 ({{ evaluateInfo.result.hasPictureCount }})</a
        >
        <a
          href="javascript:"
          :class="{ active: reqParams.tag == tag.title }"
          @click="updateReqParams({ tag: tag.title })"
          v-for="tag in evaluateInfo.result.tags"
          >{{ tag.title }} ({{ tag.tagCount }})</a
        >
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.head {
  display: flex;
  padding: 30px 0;
  .data {
    width: 340px;
    display: flex;
    padding: 20px;
    p {
      flex: 1;
      text-align: center;
      span {
        display: block;
        &:first-child {
          font-size: 32px;
          color: @priceColor;
        }
        &:last-child {
          color: #999;
        }
      }
    }
  }
  .tags {
    flex: 1;
    display: flex;
    border-left: 1px solid #f5f5f5;
    .dt {
      font-weight: bold;
      width: 100px;
      text-align: right;
      line-height: 42px;
    }
    .dd {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      > a {
        width: 132px;
        height: 42px;
        margin-left: 20px;
        margin-bottom: 20px;
        border-radius: 4px;
        border: 1px solid #e4e4e4;
        background: #f5f5f5;
        color: #999;
        text-align: center;
        line-height: 40px;
        &:hover {
          border-color: @xtxColor;
          background: lighten(@xtxColor, 50%);
          color: @xtxColor;
        }
        &.active {
          border-color: @xtxColor;
          background: @xtxColor;
          color: #fff;
        }
      }
    }
  }
}
</style>
