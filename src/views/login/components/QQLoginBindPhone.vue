<script setup lang="ts">
import { AuthAPI } from "@/api/autuAPI";
import UseCountDown from "@/logics/useCountdown";
import message from "@/utils/message";
import { toFormValidator } from "@vee-validate/zod";
import { Field, ErrorMessage } from "vee-validate";
import * as zod from "zod";
import { useUserStore } from "@/stores/userStore";
import { AxiosError } from "axios";
const QQUserInfo = reactive({
  nickname: "",
  figureurl: "",
});
const props = defineProps<{ unionId: string }>();
const { count, start, isActive } = UseCountDown();
const store = useUserStore();
// 获取QQ用户的头像和昵称
window.QC.api("get_user_info").success(function (response: any) {
  // 存储头像url
  QQUserInfo.figureurl = response.data.figureurl_1;
  // 存储昵称
  QQUserInfo.nickname = response.data.nickname;
});
const validationSchema = toFormValidator(
  zod.object({
    mobile: zod
      .string({ required_error: "请输入手机号" })
      .regex(/^1[3-9]\d{9}$/, "请输入正确的手机号"),
    code: zod
      .string({ required_error: "请输入验证码" })
      .regex(/^\d{6}$/, "验证码格式错误"),
  })
);
const { handleSubmit, validateField, values } = useForm({
  validationSchema: validationSchema,
  initialValues: {
    mobile: "",
    code: "",
  },
});
const OnSubmit = handleSubmit((values) => {
  store.login(() =>
    AuthAPI.loginByBindAccount(values.mobile, values.code, props.unionId)
  );
});
async function sendMsgCode() {
  // 验证用户是否填写了手机号
  let { valid } = await validateField("mobile");
  // 验证未通过
  if (!valid) return;
  if (isActive.value) return;
  try {
    console.log(values.mobile);
    await AuthAPI.sendMsgCodeOfBindQQ(values.mobile, props.unionId);
    message({ type: "success", msg: "发送成功" });
    start(60);
  } catch (err) {
    if (err instanceof AxiosError) {
      // 消息提示
      message({ type: "error", msg: err.response?.data.message });
    } else {
      // 消息提示
      message({ type: "error", msg: "手机验证码发送失败" });
    }
  }
}
</script>
<template>
  <form class="xtx-form" @submit.prevent="OnSubmit">
    <Field as="div" name="mobile" class="xtx-form-item" v-slot="{ field }">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input
          v-bind="field"
          class="input"
          type="text"
          placeholder="绑定的手机号"
        />
      </div>
      <ErrorMessage as="div" name="mobile" class="error"></ErrorMessage>
    </Field>
    <Field as="div" name="code" v-slot="{ field }" class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <input
          v-bind="field"
          class="input"
          type="text"
          placeholder="短信验证码"
        />
        <span class="code" @click="sendMsgCode">
          {{ isActive ? `剩余${count}秒` : "发送验证码" }}</span
        >
      </div>
      <ErrorMessage as="div" name="code" class="error"></ErrorMessage>
    </Field>
    <input type="submit" class="submit" value="立即绑定" />
  </form>
</template>

<style scoped lang="less">
.user-info {
  width: 320px;
  height: 70px;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin: 0 auto 20px;
  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }
  p {
    padding-left: 10px;
  }
}
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;
  &:hover {
    cursor: pointer;
  }
}
</style>
