<!-- src/views/login/components/MessageLogin.vue -->
<script setup lang="ts">
import { AuthAPI } from "@/api/autuAPI";
import message from "@/utils/message";
import { toFormValidator } from "@vee-validate/zod";
import { AxiosError } from "axios";
import { Field, ErrorMessage } from "vee-validate";
import * as zod from "zod";
import useCountDown from "@/logics/useCountdown";
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();
// 创建表单验证规则
const validationSchema = toFormValidator(
  zod.object({
    mobile: zod
      .string({ required_error: "请输入手机号" })
      .regex(/^1[3-9]\d{9}$/, "请输入正确的手机号"),
    code: zod
      .string({ required_error: "请输入验证码" })
      .regex(/^\d{6}$/, "验证码格式错误"),
    isAgree: zod.literal(true, {
      errorMap: () => ({ message: "请勾选同意用户协议" }),
    }),
  })
);
const router = useRouter();
// 创建表单验证对象
const { handleSubmit, values, validateField, setFieldValue } = useForm<{
  mobile: string;
  code: string;
  isAgree: boolean;
}>({
  validationSchema: validationSchema,
});

// 表单提交
const onSubmit = handleSubmit((formValue) => {
  userStore.login(() =>
    AuthAPI.loginByMobileMsgCode(formValue.mobile, formValue.code)
  );
});
//路由跳转

//发送手机验证码
const { count, isActive, start } = useCountDown();
async function senMsg() {
  //判断是否输入正确
  const { valid } = await validateField("mobile");
  if (isActive.value) return;
  if (!valid) return;
  //发送验证吗
  try {
    AuthAPI.sendMsgCodeOfMobileLogin(values.mobile);
    message({ type: "success", msg: "验证码发送成功" });
    start(60);
    //这个err似unknown
  } catch (err) {
    if (err instanceof AxiosError) {
      message({ type: "error", msg: err.response?.data.message });
    } else {
      message({ type: "error", msg: "验证码发送失败" });
    }
  }
}
</script>

<template>
  <form @submit="onSubmit">
    <Field name="mobile" as="div" class="form-item" v-slot="{ field }">
      <div class="input">
        <i class="iconfont icon-user"></i>
        <input v-bind="field" type="text" placeholder="请输入手机号" />
      </div>
      <ErrorMessage name="mobile" v-slot="{ message }">
        <div class="error">
          <i class="iconfont icon-warning"></i>{{ message }}
        </div>
      </ErrorMessage>
    </Field>
    <Field name="code" as="div" class="form-item" v-slot="{ field }">
      <div class="input">
        <i class="iconfont icon-code"></i>
        <input
          v-bind="field"
          autocomplete="on"
          type="password"
          placeholder="请输入验证码"
        />
        <span class="code" @click="senMsg">
          {{ isActive ? `剩余${count}秒` : "发送验证码" }}</span
        >
      </div>
      <ErrorMessage name="code" v-slot="{ message }">
        <div class="error">
          <i class="iconfont icon-warning"></i> {{ message }}
        </div>
      </ErrorMessage>
    </Field>
    <Field name="isAgree" as="div" class="form-item">
      <div class="agree">
        <XtxCheckbox
          :checked="values.isAgree"
          @onChange="
            setFieldValue('isAgree', $event);
            validateField('isAgree');
          "
        />
        <span>我已同意</span>
        <a href="javascript:">《隐私条款》</a>
        <span>和</span>
        <a href="javascript:">《服务条款》</a>
      </div>
      <ErrorMessage name="isAgree" v-slot="{ message }">
        <div class="error">
          <i class="iconfont icon-warning"></i> {{ message }}
        </div>
      </ErrorMessage>
    </Field>
    <button type="submit" class="btn">登录</button>
  </form>
</template>
