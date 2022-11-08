<!-- src/views/pay/components/ReceivingAddressEdit.vue -->
<script setup lang="ts">
import OrderAPI from "@/api/OrderAPI";
import { useOrderStore, type EditAdressObject } from "@/stores/orderStore";
import message from "@/utils/message";
const store = useOrderStore();
const flag = reactive({
  isModity: false,
});
const initalValues: EditAdressObject = {
  // 收货人姓名
  receiver: "",
  // 联系方式
  contact: "",
  // 所在省份编码
  provinceCode: "",
  // 所在城市编码
  cityCode: "",
  // 所在区/县编码
  countyCode: "",
  // 详细地址
  address: "",
  // 邮政编码
  postalCode: "",
  // 地址标签,以英文逗号分割
  addressTags: "",
  // 是否为默认，0为是，1为否
  isDefault: false,
};
// 用于控制弹框的显示和隐藏
const visible = ref(false);
// 向外暴露用于控制弹框显示和隐藏的响应式状态

// 表单值
const emit = defineEmits<{
  (e: "onAddressEditSuccess", id: string): void;
}>();
const fullLocation = ref<string | undefined>("");

const formValues = ref<EditAdressObject>({ ...initalValues });
async function queren() {
  //值转换
  const reqPrams = {
    ...formValues.value,
    isDefault: formValues.value.isDefault ? 0 : 1,
  };
  let id = "";
  try {
    if (!flag.isModity) {
      const response = await store.addAddress(reqPrams);
      id = response.id;
    } else {
      const response = await store.updateAddress(reqPrams);
      id = response.id;
    }
    emit("onAddressEditSuccess", id);
    message({ type: "success", msg: `${flag.isModity ? "修改" : "增加"}成功` });
    visible.value = false;
    await OrderAPI.getAddressList();

    // fullLocation.value = formValues.value.fullLocation;
  } catch (error) {
    message({ type: "error", msg: "添加失败" });
  }
}
defineExpose({ visible, formValues, fullLocation, flag });

watch(
  () => visible.value,
  (value) => {
    if (!value) {
      formValues.value = { ...initalValues };
      fullLocation.value = "";
    }
  }
);
</script>

<template>
  <XtxDialog v-model:visible="visible" title="`收货地址`">
    <template #body>
      <div class="address-edit">
        <div class="xtx-form">
          <div class="xtx-form-item">
            <div class="label">收货人：</div>
            <div class="field">
              <input
                class="input"
                v-model="formValues.receiver"
                placeholder="请输入收货人"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">手机号：</div>
            <div class="field">
              <input
                class="input"
                v-model="formValues.contact"
                placeholder="请输入手机号"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">地区：</div>
            <div class="field">
              <XtxCity
                placeholder="请选择所在地区"
                v-model:fullLocation="fullLocation"
                @Onchange="
                  (formValues.provinceCode = $event.provinceCode!),
                    (formValues.cityCode = $event.cityCode!),
                    (formValues.countyCode = $event.countyCode!)
                "
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">详细地址：</div>
            <div class="field">
              <input
                class="input"
                v-model="formValues.address"
                placeholder="请输入详细地址"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">邮政编码：</div>
            <div class="field">
              <input
                class="input"
                v-model="formValues.postalCode"
                placeholder="请输入邮政编码"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">地址标签：</div>
            <div class="field">
              <input
                class="input"
                v-model="formValues.addressTags"
                placeholder="请输入地址标签，逗号分隔"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">是否设置为默认地址：</div>
            <div class="field">
              <input
                type="checkbox"
                class="checkbox"
                v-model="(formValues.isDefault as boolean)"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <XtxButton
        @click="visible = false"
        type="gray"
        style="margin-right: 20px"
      >
        取消
      </XtxButton>
      <XtxButton type="primary" @click="queren">确认</XtxButton>
    </template>
  </XtxDialog>
</template>

<style scoped lang="less">
.xtx-dialog {
  :deep(.wrapper) {
    width: 780px;
    .body {
      font-size: 14px;
    }
  }
  .xtx-city {
    width: 320px;
    :deep(.select) {
      height: 50px;
      line-height: 48px;
      display: flex;
      padding: 0 10px;
      justify-content: space-between;
      .placeholder {
        color: #ccc;
      }
      i {
        color: #ccc;
        font-size: 18px;
      }
      .value {
        font-size: 14px;
      }
    }
    :deep(.option) {
      top: 49px;
    }
  }
}
.xtx-form {
  padding: 0;
  .xtx-form-item {
    width: auto;
    &:last-child {
      padding-bottom: 0;
    }
  }
  input {
    outline: none;
    &::placeholder {
      color: #ccc;
    }
  }
}
</style>
