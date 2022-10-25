<script setup lang="ts">
// useField<string>: 该泛型设置的是要绑定的值的类型, 即 value 的类型
import { useField } from "vee-validate";

// 用户名字段
//字段表单验证
const {
  value: usernameValue,
  errorMessage,
  meta,
} = useField("username", username);
function username(value: unknown) {}
function onSubmit() {}
</script>

<template>
  <form @submit.prevent="onSubmit" class="container mt-6">
    <div class="field">
      <label class="label">用户名</label>
      <div class="control has-icons-left">
        <input
          class="input"
          type="text"
          placeholder="请输入用户名"
          v-model="usernameField"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
      </div>
      <p class="help is-danger" v-if="usernameError">{{ usernameError }}</p>
    </div>
    <div class="field">
      <label class="label">密码</label>
      <div class="control has-icons-left">
        <input
          class="input"
          type="password"
          placeholder="请输入密码"
          v-model="passwordField"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-key"></i>
        </span>
      </div>
      <p class="help is-danger" v-if="passwordError">{{ passwordError }}</p>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button type="submit" class="button is-link">提交</button>
      </div>
      <div class="control">
        <button @click="onReset" type="button" class="button is-link is-light">
          重置
        </button>
      </div>
      <div class="control">
        <button type="button" class="button is-link is-light" @click="onSet">
          设置表单值
        </button>
      </div>
    </div>
  </form>
</template>

<style lang="less" scoped>
@import "https://bulma.io/vendor/fontawesome-free-5.15.2-web/css/all.min.css";
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
</style>
