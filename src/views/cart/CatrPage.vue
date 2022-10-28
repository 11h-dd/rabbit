<script setup lang="ts">
import { useCartStore } from "@/stores/cartStore";

const store = useCartStore();
store.getCarts();
</script>
<template>
  <div class="cart-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem path="/">首页</XtxBreadItem>
        <XtxBreadItem>购物车</XtxBreadItem>
      </XtxBread>
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th>
                <XtxCheckbox
                  :checked="store.isAllSelected"
                  @onChange="store.selecteAndDeselect(!store.isAllSelected)"
                  >全选</XtxCheckbox
                >
              </th>
              <th>商品信息</th>
              <th>单价</th>
              <th>数量</th>
              <th>小计</th>
              <th>操作</th>
            </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody>
            <tr v-for="i in store.effectiveGoods" :key="i.id">
              <td>
                <XtxCheckbox
                  :checked="i.selected"
                  @onChange="
                    store.alterCartGoods({ id: i.skuId, selected: $event })
                  "
                />
              </td>
              <td>
                <div class="goods">
                  <RouterLink to="/"
                    ><img :src="i.picture" alt=""
                  /></RouterLink>
                  <div>
                    <p class="name ellipsis">{{ i.name }}</p>
                    <!-- 购物车选择规格组件 -->
                    <CartSku :skuId="i.skuId" :attrs-text="i.attrsText" />
                    <!-- <CartSku /> -->
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ i.price }}</p>
                <p>
                  比加入时降价
                  <span class="red">&yen;{{ +i.price - +i.nowPrice }}</span>
                </p>
              </td>
              <td class="tc">
                <XtxNumberBox
                  :max="i.stock"
                  :count="i.count"
                  @update:count="
                    store.alterCartGoods({ id: i.skuId, count: $event })
                  "
                />
              </td>
              <td class="tc">
                <p class="f16 red">&yen;{{ +i.nowPrice * i.count }}</p>
              </td>
              <td class="tc">
                <p><a href="javascript:">移入收藏夹</a></p>
                <p><a class="green" href="javascript:">删除</a></p>
                <p><a href="javascript:">找相似</a></p>
              </td>
            </tr>
          </tbody>
          <!-- 无效商品 -->
          <tbody>
            <tr>
              <td colspan="6"><h3 class="tit">失效商品</h3></td>
            </tr>
            <tr v-for="i in store.invalidGoods" :key="i.id">
              <td></td>
              <td>
                <div class="goods">
                  <RouterLink to="/"
                    ><img :src="i.picture" alt=""
                  /></RouterLink>
                  <div>
                    <p class="name ellipsis">{{ i.name }}</p>
                    <p class="attr">{{ i.attrsText }}</p>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ i.nowPrice }}</p>
              </td>
              <td class="tc">{{ i.count }}</td>
              <td class="tc">
                <p>&yen;{{ +i.nowPrice - +i.price }}</p>
              </td>
              <td class="tc">
                <p><a class="green" href="javascript:">删除</a></p>
                <p><a href="javascript:">找相似</a></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          <XtxCheckbox>全选</XtxCheckbox>
          <a href="javascript:">删除商品</a>
          <a href="javascript:">移入收藏夹</a>
          <a href="javascript:">清空失效商品</a>
        </div>
        <div class="total">
          共 {{ store.effectiveTotalQuantity }} 件商品，已选择
          {{ store.selectedQuantity }} 件，商品合计：
          <span class="red">¥{{ store.selectedPrice }}</span>
          <XtxButton type="primary">
            <XtxButton to="/checkout/order" type="primary">下单结算</XtxButton>
          </XtxButton>
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <GoodsRelevant />
    </div>
  </div>
</template>

<style scoped lang="less">
.tc {
  text-align: center;
  .xtx-number-box {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: @priceColor;
}
.green {
  color: @xtxColor;
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  .xtx-checkbox {
    color: #999;
  }
  .batch {
    a {
      margin-left: 20px;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      width: 100%;
      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>
