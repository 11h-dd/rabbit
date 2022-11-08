<script setup lang="ts">
import type { OrderResponse } from "@/types/Orders";
import XtxButton from "@/components/XtxButton.vue";
import useCountDown from "@/logics/useCountdown";
import { orderStatus } from "@/constants/orderStatus";
import dayjs from "dayjs";
import { useOrderStore } from "@/stores/orderStore";
import myConfirm from "@/utils/myConfirm";
const store = useOrderStore();

const props = defineProps<{ item: OrderResponse }>();
const emit = defineEmits<{
  (e: "onCancelButtonClicked", id: string): void;
  (e: "requestOrderList"): void;
  (e: "OnViewLogisticsButtonClicked", id: string): void;
}>();

const { start, count } = useCountDown();
// 如果订单状态为待付款
if (props.item.orderState === 1) {
  // 开启倒计时
  start(props.item.countdown);
}
async function removeOrders(ids: string) {
  try {
    await myConfirm({ content: "确定要删除吗" });
  } catch (err) {
    return;
  }

  await store.removeOrder([ids]);
  emit("requestOrderList");
}
async function confirmReceiptGoods(id: string) {
  try {
    await myConfirm({ content: "真的确认吗" });
  } catch (err) {
    return;
  }
  await store.confirmReceiptGoods(id!);
  emit("requestOrderList");
}
async function viewlog(id: string) {
  emit("OnViewLogisticsButtonClicked", id);
  //渲染查看物流弹框
}
</script>

<template>
  <div class="order-item">
    <div class="head">
      <span>下单时间: {{ item.createTime }}</span>
      <span>订单编号: {{ item.id }}</span>
      <span class="down-time" v-if="item.orderState === 1">
        <i class="iconfont icon-down-time"></i>
        <b>付款截止: {{ dayjs.unix(count).format("mm分ss秒") }}</b>
      </span>
      <a
        href="javascript:"
        class="del"
        v-if="[5, 6].includes(item.orderState)"
        @click="removeOrders(item.id)"
        >删除</a
      >
    </div>
    <div class="body">
      <div class="column goods">
        <ul>
          <li v-for="goods in item.skus" :key="goods.id">
            <a class="image" href="javascript:">
              <img :src="goods.image" alt="" />
            </a>
            <div class="info">
              <p class="name ellipsis-2">{{ goods.name }}</p>
              <p class="attr ellipsis">
                <span>{{ goods.attrsText }} </span>
              </p>
            </div>
            <div class="price">¥{{ goods.curPrice }}</div>
            <div class="count">x{{ goods.quantity }}</div>
          </li>
        </ul>
      </div>
      <div class="column state">
        <p>{{ orderStatus[item.orderState].label }}</p>
        <a
          v-if="item.orderState === 3"
          href="javascript:"
          class="green"
          @click="viewlog(item.id)"
          >查看物流</a
        >
        <a v-if="item.orderState === 4" href="javascript:" class="green"
          >评价商品</a
        >
        <a v-if="item.orderState === 5" href="javascript:" class="green"
          >查看评价</a
        >
      </div>
      <div class="column amount">
        <p class="red">¥{{ item.payMoney }}</p>
        <p>(含运费: ¥{{ item.postFee }})</p>
        <p>{{ item.payChannel === 1 ? "在线支付" : "货到付款" }}</p>
      </div>
      <div class="column action">
        <XtxButton v-if="item.orderState === 1" type="primary" size="small"
          >立即付款</XtxButton
        >
        <XtxButton
          v-if="item.orderState === 3"
          type="primary"
          size="small"
          @click="confirmReceiptGoods(item.id)"
          >确认收货</XtxButton
        >
        <p>
          <RouterLink :to="`/member/order/${item.id}`">查看详情</RouterLink>
        </p>
        <p v-if="item.orderState === 1">
          <a href="javascript:" @click="$emit('onCancelButtonClicked', item.id)"
            >取消订单</a
          >
        </p>
        <p v-if="[2, 3, 4, 5].includes(item.orderState)">
          <a href="javascript:">再次购买</a>
        </p>
        <p v-if="[4, 5].includes(item.orderState)">
          <a href="javascript:">申请售后</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
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
