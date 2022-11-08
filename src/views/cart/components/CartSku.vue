<script setup lang="ts">
import { CartAPI } from "@/api/CartAPI";
import type { Sku, Spec } from "@/types/Goods";
import type { Status } from "@/types/Status";
import message from "@/utils/message";
import { useCartStore } from "@/stores/cartStore";
const cartStore = useCartStore();
const props = defineProps<{ skuId: string; attrsText: string }>();

const visible = ref(false);
const target = ref(null);
onClickOutside(target, hide);
const status = ref<Status>("idle");
const skuInfo = ref<{ specs: Spec[]; skus: Sku[] }>({ specs: [], skus: [] });
const newSkuId = ref<string | undefined>(undefined);
function show() {
  getGoodsSku(props.skuId);
  visible.value = true;
}
function hide() {
  visible.value = false;
}
function toggle() {
  visible.value ? hide() : show();
}

async function getGoodsSku(id: string) {
  status.value = "loading";
  try {
    // 发送请求获取规格信息
    const response = await CartAPI.getSkuInfo(id);
    // 存储规格信息
    skuInfo.value = response.result;
    // 更新加载状态
    status.value = "success";
  } catch (error) {
    // 更新加载状态
    status.value = "error";
  }
}
async function alterSku() {
  if (typeof newSkuId.value !== "undefined") {
    try {
      await cartStore.alterSku(props.skuId, newSkuId.value);
      message({ type: "success", msg: "修改成功" });
      hide();
    } catch (err) {
      message({ type: "error", msg: "修改失败" });
    }
  } else {
    message({ type: "warn", msg: "请选择规格" });
  }
}
</script>

<template>
  <div class="cart-sku" ref="target">
    <div class="attrs" @click="toggle">
      <span class="ellipsis">{{ attrsText }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="visible">
      <div class="loading"></div>
      <GoodsSku
        v-if="status === 'success'"
        :skuId="skuId"
        :specs="skuInfo.specs"
        :skus="skuInfo.skus"
        @complete="newSkuId = $event.skuId"
        @incomplete="newSkuId = undefined"
      ></GoodsSku>
      <XtxButton
        @click="alterSku"
        type="primary"
        size="mini"
        style="margin-left: 60px"
        >确定</XtxButton
      >
    </div>
  </div>
</template>

<style scoped lang="less">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display: inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }
    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid @xtxColor;
    box-shadow: 2px 2px 4px lighten(@xtxColor, 50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;
    &::before {
      content: "";
      width: 12px;
      height: 12px;
      border-left: 1px solid @xtxColor;
      border-top: 1px solid @xtxColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(0.8, 1) rotate(45deg);
    }
    .loading {
      height: 224px;
      background: url(@/assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
