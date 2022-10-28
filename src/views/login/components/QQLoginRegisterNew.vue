<script setup lang="ts">
import { AuthAPI } from "@/api/autuAPI";
import { toFormValidator } from "@vee-validate/zod";
import { Field, ErrorMessage } from "vee-validate";
import * as zod from "zod";
const validationSchema = toFormValidator(
  zod
    .object({
      account: zod
        .string({ required_error: "请输入用户名" })
        .regex(/^[a-zA-Z]\w{5,19}$/, "字母开头且6-20个字符"),
      mobile: zod
        .string({ required_error: "请输入手机号" })
        .regex(/^1[3-9]\d{9}$/, "请输入正确的手机号"),
      code: zod
        .string({ required_error: "请输入验证码" })
        .regex(/^\d{6}$/, "验证码格式错误"),
      password: zod
        .string({ required_error: "请输入密码" })
        .regex(/^\w{6,24}$/, "密码是6-24个字符"),
      confirm: zod.string({ required_error: "请再次输入密码" }),
    })
    .refine((data) => data.password === data.confirm, {
      message: "两次密码输入不一致",
      path: ["confirm"],
    })
);
const { handleSubmit, values } = useForm({
  validationSchema,
  initialValues: {
    account: "",
    mobile: "",
    code: "",
    password: "",
    confirm: "",
  },
});
const OnSubmit = handleSubmit(async (values) => {
  console.log(values);
  try {
    await checkAccountUniqe.parseAsync(values.account);
  } catch (err) {
    console.log(err);
  }
});
function sendMsgCode() {}
const checkAccountUniqe = zod.string().refine(async (account) => {
  let response = await AuthAPI.checkAccountUnique(account);
  return !response.result.valid;
});
</script>
<template>
  <form @submit.prevent="OnSubmit" class="xtx-form">
    <div class="xtx-form-item">
      <Field as="div" name="account" class="field" v-slot="{ field }">
        <i class="icon iconfont icon-user"></i>
        <input
          v-bind="field"
          class="input"
          type="text"
          placeholder="请输入用户名"
        />
      </Field>
      <ErrorMessage as="div" name="account" class="error"></ErrorMessage>
    </div>
    <div class="xtx-form-item">
      <Field as="div" name="mobile" class="field" v-slot="{ field }">
        <i class="icon iconfont icon-phone"></i>
        <input
          v-bind="field"
          class="input"
          type="text"
          placeholder="请输入手机号"
        />
      </Field>
      <ErrorMessage as="div" name="mobile" class="error"></ErrorMessage>
    </div>
    <div class="xtx-form-item">
      <Field name="code" as="div" class="field" v-slot="{ field }">
        <i class="icon iconfont icon-code"></i>
        <input
          v-bind="field"
          class="input"
          type="text"
          placeholder="请输入验证码"
        />
        <span class="code" @click="sendMsgCode">发送验证码</span>
      </Field>
      <ErrorMessage as="div" name="code" class="error"></ErrorMessage>
    </div>
    <div class="xtx-form-item">
      <Field as="div" name="password" class="field" v-slot="{ field }">
        <i class="icon iconfont icon-lock"></i>
        <input
          v-bind="field"
          class="input"
          type="password"
          placeholder="请输入密码"
          autocomplete="on"
        />
      </Field>
      <ErrorMessage as="div" name="password" class="error"></ErrorMessage>
    </div>
    <div class="xtx-form-item">
      <Field as="div" name="confirm" class="field" v-slot="{ field }">
        <i class="icon iconfont icon-lock"></i>
        <input
          v-bind="field"
          class="input"
          type="password"
          placeholder="请确认密码"
          autocomplete="on"
        />
      </Field>
      <ErrorMessage as="div" name="confirm" class="error"></ErrorMessage>
    </div>
    <input type="submit" class="submit" value="立即绑定" />
  </form>
</template>

<style scoped lang="less">
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
