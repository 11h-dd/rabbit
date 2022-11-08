<script setup lang="ts">
import { useOrderStore } from "@/stores/orderStore";
import type { Address } from "@/types/Orders";
import ReceivingAddressSwitch from "./ReceivingAddressSwitch.vue";

const store = useOrderStore();
store.getAddressList();
const addressRef = ref();
function addAddress() {
  addressRef.value.visible = true;
  addressRef.value.flag.isModity = false;
}
const highestPriority = ref<Address | undefined>();
function onAddressEditSuccess(id: string) {
  //根据id查找用户添加的收货地址
  const address = store.address.result.find((item) => item.id == id);
  if (typeof address !== "undefined") {
    highestPriority.value = address;
  }
}
const finalAddress = computed(() => {
  // 1.返回用户新增的收货地址或者选择的收货地址
  if (typeof highestPriority.value !== "undefined")
    return highestPriority.value;
  // 2. 返回用户收货地址列表中的默认收货地址
  const defaultAddress = store.address.result.find(
    (item) => item.isDefault === 0
  );
  if (typeof defaultAddress !== "undefined") return defaultAddress;
  // 3. 返回用户列表中的第一个收货地址
  const firstInList = store.address.result[0];
  if (typeof firstInList !== "undefined") return firstInList;
});

const addSwitch = ref();
//切换收货地址
function switchAddress() {
  addSwitch.value.visible = true;
}
function alterAddress() {
  addressRef.value.formValues = {
    ...finalAddress.value,
    isDefault: finalAddress.value?.isDefault === 0 ? true : false,
  };
  addressRef.value.visible = true;
  addressRef.value.fullLocation = finalAddress.value?.fullLocation;
  addressRef.value.flag.isModity = true;
}
defineExpose({ getFinalAddress: () => finalAddress.value?.id });
</script>
<template>
  <div class="address">
    <div class="text">
      <div class="none" v-if="!finalAddress">
        您需要先添加收货地址才可提交订单。
      </div>
      <ul v-else>
        <li><span>收货人：</span>{{ finalAddress?.receiver }}</li>
        <li><span>联系方式：</span>{{ finalAddress?.contact }}</li>
        <li>
          <span>收货地址：</span>{{ finalAddress?.fullLocation }}
          {{ finalAddress?.address }}
        </li>
      </ul>
      <a href="javascript:" @click="alterAddress">修改地址</a>
    </div>
    <div class="action">
      <XtxButton class="btn" @click="switchAddress">切换地址</XtxButton>
      <XtxButton class="btn" @click="addAddress">添加地址</XtxButton>
    </div>
  </div>
  <!-- <ReceivingAddressEdit ref="addressRef" /> -->
  <ReceivingAddressEdit
    ref="addressRef"
    @onAddressEditSuccess="onAddressEditSuccess"
  ></ReceivingAddressEdit>
  <ReceivingAddressSwitch
    ref="addSwitch"
    @addressSwitched="highestPriority = $event"
    :finalAddressId="finalAddress?.id"
  />
</template>

<style scoped lang="less">
.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
