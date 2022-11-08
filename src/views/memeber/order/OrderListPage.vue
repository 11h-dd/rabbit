<script setup lang="ts">
import { XtxTabs } from "@/components/XtxTabs";
import { XtxTabPane } from "@/components/XtxTabPane";
import { orderStatus } from "@/constants/orderStatus";
import { useOrderStore } from "@/stores/orderStore";
import type { OrderState } from "@/types/Orders";

const name = ref("all");

// 获取 orderStore
const orderStore = useOrderStore();
const orderLogisticsInstance = ref();
const reqParams = ref<{ orderState: OrderState }>({
  orderState: 0,
});
watchEffect(() => {
  orderStore.getMyOrderList(1, 10, reqParams.value.orderState);
});
const cancelOrder = ref();
function onCancelButtonClicked(id: string) {
  cancelOrder.value.visible = true;
  cancelOrder.value.id = id;
}
//查看物流信息
async function OnViewLogisticsButtonClicked(id: string) {
  //发送请求
  await orderStore.getViewLogistics(id);
  orderLogisticsInstance.value.visible = true;
}
</script>

<template>
  <div class="member-order">
    <XtxTabs v-model:name="name" @onTabClicked="reqParams.orderState = $event">
      <XtxTabPane
        v-for="item in orderStatus"
        :name="item.name"
        :label="item.label"
      >
        <div class="order-list">
          <div
            class="loading"
            v-if="
              orderStore.myOrderList[reqParams.orderState].status === 'loading'
            "
          ></div>
          <div
            class="none"
            v-if="
              orderStore.myOrderList[reqParams.orderState].result.items
                ?.length === 0
            "
          >
            暂无数据
          </div>
          <OrderItem
            :item="order"
            v-for="order in orderStore.myOrderList[reqParams.orderState].result
              .items"
            :key="order.id"
            @onCancelButtonClicked="onCancelButtonClicked"
            @requestOrderList="
              orderStore.getMyOrderList(1, 10, reqParams.orderState)
            "
            @OnViewLogisticsButtonClicked="OnViewLogisticsButtonClicked"
          />
        </div>
      </XtxTabPane>
    </XtxTabs>
  </div>
  <CancelOrder
    ref="cancelOrder"
    @RequestOrderList="orderStore.getMyOrderList(1, 10, reqParams.orderState)"
  />
  <OrderLogistics ref="orderLogisticsInstance" />
</template>

<style lang="less" scoped>
.member-order {
  height: 100%;
  background: #fff;
  position: relative;
}
.order-list {
  background: #fff;
  padding: 20px;
  position: relative;
  .loading {
    height: calc(100% - 60px);
    width: 100%;
    min-height: 400px;
    position: absolute;
    left: 0;
    top: 60px;
    background: rgba(255, 255, 255, 0.9) url(@/assets/images/loading.gif)
      no-repeat center 18%;
  }
  .none {
    height: 400px;
    text-align: center;
    line-height: 400px;
    color: #999;
    background: rgba(255, 255, 255, 0.9);
  }
}
.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;
  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    overflow: hidden;
    span {
      margin-right: 20px;
      &.down-time {
        margin-right: 0;
        float: right;
        i {
          vertical-align: middle;
          margin-right: 3px;
        }
        b {
          vertical-align: middle;
          font-weight: normal;
        }
      }
    }
    .del {
      margin-right: 0;
      float: right;
      color: #999;
    }
  }
  .body {
    display: flex;
    align-items: stretch;
    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;
      > p {
        padding-top: 10px;
      }
      &:first-child {
        border-left: none;
      }
      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;
        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;
            &:last-child {
              border-bottom: none;
            }
            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
            }
            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;
              p {
                margin-bottom: 5px;
                &.name {
                  height: 38px;
                }
                &.attr {
                  color: #999;
                  font-size: 12px;
                  span {
                    margin-right: 5px;
                  }
                }
              }
            }
            .price {
              width: 100px;
            }
            .count {
              width: 80px;
            }
          }
        }
      }
      &.state {
        width: 120px;
        .green {
          color: @xtxColor;
        }
      }
      &.amount {
        width: 200px;
        .red {
          color: @priceColor;
        }
      }
      &.action {
        width: 140px;
        a {
          display: block;
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
</style>
