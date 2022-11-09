<!-- src/views/member/order/components/DetailLogistics.vue -->
<script setup lang="ts">
import { useOrderStore } from "@/stores/orderStore";

const store = useOrderStore();
const router = useRoute();
const orderLogisticsInstance = ref();
store.getViewLogistics(router.params.id as string);
function viewlogitis() {
  orderLogisticsInstance.value.visible = true;
}
</script>
<template>
  <div class="detail-logistics" v-if="store.logistic.status === 'success'">
    <p>
      <span>{{ store.logistic.result.list[0].time }}</span>
      <span>{{ store.logistic.result.list[0].text }}</span>
    </p>
    <a href="javascript:" @click="viewlogitis">查看物流</a>
  </div>
  <OrderLogistics ref="orderLogisticsInstance" />
</template>

<style scoped lang="less">
.detail-logistics {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background-color: #f5f5f5;
  margin: 30px 50px 0;
  > p {
    flex: 1;
    span {
      color: #999;
      &:first-child {
        margin-right: 30px;
      }
    }
  }
  > a {
    color: @xtxColor;
    text-align: center;
  }
}
</style>
