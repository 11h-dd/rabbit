<script setup lang="ts">
import { AuthAPI } from "@/api/autuAPI";
import { useUserStore } from "@/stores/userStore";
import { toFormValidator } from "@vee-validate/zod";
import { ErrorMessage, Field } from "vee-validate";
import message from "@/utils/message";
import * as zod from "zod";
const store = useUserStore();
const { profile } = storeToRefs(store);
const { login } = store;

// 验证规则
const validationSchema = toFormValidator(
  zod.object({
    account: zod
      .string({ required_error: "请输入用户名" })
      .regex(/^[a-zA-Z]\w{5,19}$/, "字母开头且6-20个字符"),
    password: zod
      .string({ required_error: "请输入密码" })
      .regex(/^\w{6,24}$/, "密码是6-24个字符"),
    isAgree: zod.literal(true, {
      errorMap: () => ({ message: "请勾选同意用户协议" }),
    }),
  })
);
// 表单验证对象
const { handleSubmit, setFieldValue, validateField, values } = useForm<{
  account: string;
  password: string;
  isAgree: boolean;
}>({
  // 设置表单验证规则
  validationSchema,
  // 表单初始值
  initialValues: {
    account: "",
    password: "",
    isAgree: false,
  },
});

// 表单提交
const onSubmit = handleSubmit((formValue) => {
  console.log(formValue);
  login(() => AuthAPI.loginByAccount(formValue.account, formValue.password));
});
const router = useRouter();
</script>

<template>
  <form @submit="onSubmit">
    <Field name="account" v-slot="{ field }" as="div" class="form-item">
      <div class="input">
        <i class="iconfont icon-user"></i>
        <input
          v-bind="field"
          autocomplete="on"
          type="text"
          placeholder="请输入用户名"
        />
      </div>
      <ErrorMessage as="div" class="error" name="account" v-slot="{ message }">
        <i class="iconfont icon-warning"></i>{{ message }}
      </ErrorMessage>
    </Field>
    <Field name="password" v-slot="{ field }" as="div" class="form-item">
      <div class="input">
        <i class="iconfont icon-lock"></i>
        <input
          type="password"
          v-bind="field"
          autocomplete="on"
          placeholder="请输入密码"
        />
      </div>
      <ErrorMessage as="div" class="error" name="password" v-slot="{ message }">
        <i class="iconfont icon-warning"></i>
        {{ message }}
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
      <ErrorMessage name="isAgree" as="div" class="error" v-slot="{ message }">
        <i class="iconfont icon-warning"></i>
        {{ message }}
      </ErrorMessage>
    </Field>
    <button type="submit" class="btn">登录</button>
  </form>
</template>
