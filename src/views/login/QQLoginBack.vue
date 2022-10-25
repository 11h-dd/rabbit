<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";
import LoginFooter from "./components/LoginFooter.vue";
import { AuthAPI } from "@/api/autuAPI";
const store = useUserStore();
const router = useRouter();
const { login } = store;
const hasAccount = ref(true);
const logins = window.QC.Login;

if (logins.check()) {
  logins.getMe((openid: string) => {
    console.log(openid, "openId");
    login(() => AuthAPI.loginByQQOpenid(openid));
  });
} else {
  router.push("/login");
}
</script>

<template>
  <LoginHeader>联合登录</LoginHeader>
  <section class="container">
    <nav class="tab">
      <a
        @click="hasAccount = true"
        :class="{ active: hasAccount }"
        href="javascript:"
      >
        <i class="iconfont icon-bind"></i>
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a
        @click="hasAccount = false"
        :class="{ active: !hasAccount }"
        href="javascript:"
      >
        <i class="iconfont icon-edit"></i>
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <QQLoginBindPhone />
    </div>
    <div class="tab-content" v-else>
      <QQLoginRegisterNew />
    </div>
  </section>
  <LoginFooter />
</template>

<style scoped lang="less">
.container {
  padding: 25px 0;
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
