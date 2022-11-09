<script setup lang="ts">
import { XtxStepItem } from "@/components/XtxStepItem";
import { XtxSteps } from "@/components/XtxSteps";
import { useOrderStore } from "@/stores/orderStore";
const router = useRoute();
const store = useOrderStore();

store.getORderInforbyId(router.params.id as string);
</script>
<template>
  <div class="order-detail-page">
    <!-- 订单状态 -->
    <OrderStatus />
    <!-- 步骤条-->
    <XtxSteps
      :active="
        store.orderInfo.result.orderState === 6
          ? 1
          : store.orderInfo.result.orderState
      "
    >
      <XtxStepItem
        title="提交订单"
        :desc="store.orderInfo.result.createTime"
      ></XtxStepItem>
      <XtxStepItem
        title="付款成功"
        :desc="store.orderInfo.result.payTime"
      ></XtxStepItem>
      <XtxStepItem
        title="商品发货"
        :desc="store.orderInfo.result.consignTime"
      ></XtxStepItem>
      <XtxStepItem
        title="确认收货"
        :desc="store.orderInfo.result.endTime"
      ></XtxStepItem>
      <XtxStepItem
        title="订单完成"
        :desc="store.orderInfo.result.evaluationTime"
      ></XtxStepItem>
    </XtxSteps>
    <!-- 物流栏 -->
    <DetailLogistics
      v-if="[3, 4, 5].includes(store.orderInfo.result.orderState)"
    />
    <!-- 订单商品信息 -->
    <DetailOrderGooods />
  </div>
</template>

<style scoped lang="less">
.order-detail-page {
  background: #fff;
  height: 100%;
}
</style>
