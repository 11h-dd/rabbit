<script setup lang="ts">
import { useForm } from "vee-validate";
const validationSchema = {
  username: (value: unknown) => {
    if (!value) return "请输入用户名";
    if (typeof value != "string") return "类型错误";
    if (value.length < 2) return "账号长度小于2";
    return true;
  },
  password: (value: unknown) => {
    if (!value) return "请输入密码";
    if (typeof value != "string") return "类型错误";
    if (value.length < 6) return "密码长度小于6";
    return true;
  },
};
//useFieldModel 获取到表单项绑定
//errors 错误信息对象
const { useFieldModel, errors, handleSubmit, setFieldValue, handleReset } =
  useForm({
    validationSchema,
    validateOnMount: false, //组件表单项主动验证

    initialValues: {
      //默认值
      username: "藏三",
      password: "123456",
    },
  });

const [username, password] = useFieldModel(["username", "password"]);
const onSubmit = handleSubmit((value) => {
  console.log(value);
});
const onSet = function () {
  setFieldValue("username", "李四");
  setFieldValue("password", "123456");
};
</script>
<template>
  <form class="container mt-6" @submit="onSubmit">
    <div class="field">
      <label class="label">用户名</label>
      <div class="control has-icons-left">
        <input
          v-model="username"
          class="input"
          type="text"
          placeholder="请输入用户名"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
      </div>
      <p class="help is-danger" v-if="errors.username">{{ errors.username }}</p>
    </div>
    <div class="field">
      <label class="label">密码</label>
      <div class="control has-icons-left">
        <input
          v-model="password"
          class="input"
          type="password"
          placeholder="请输入密码"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-key"></i>
        </span>
      </div>
      <p class="help is-danger" v-if="errors.password">{{ errors.password }}</p>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button type="submit" class="button is-link">提交</button>
      </div>
      <div class="control">
        <button
          @click="handleReset"
          type="button"
          class="button is-link is-light"
        >
          重置
        </button>
      </div>
      <div class="control">
        <button @click="onSet" type="button" class="button is-link is-light">
          设置表单值
        </button>
      </div>
    </div>
  </form>
</template>
