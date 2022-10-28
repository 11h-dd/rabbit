<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";
import LoginFooter from "./components/LoginFooter.vue";
import { AuthAPI } from "@/api/autuAPI";
import message from "@/utils/message";
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
// 监听登录状态 (绑定已有账号登录、绑定新注册账号登录)
watch(
  () => store.profile.status,
  (status) => {
    // 如果登录成功
    if (status === "success") {
      // 消息提示
      message({ type: "success", msg: "登录成功" });
      // 跳转到首页
      router.push("/");
    } else if (status === "error") {
      // 如果登录失败
      message({
        type: "error",
        msg: store.profile.error + ", 请绑定账号",
      });
    }
  }
);
const unionId = ref("");

logins.getMe((openid: string) => {
  // 存储 openid
  unionId.value = openid;
});
</script>

<template>
  <LoginHeader>联合登录</LoginHeader>
  <section class="container" v-if="store.profile.status == 'loading'">
    <div class="unbind">
      <div class="loading"></div>
    </div>
  </section>
  <section class="container" v-else>
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
      <QQLoginBindPhone :unionId="unionId" />
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
.container {
  padding: 25px 0;
  position: relative;
  height: 730px;
  .unbind {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 25px 0;
    z-index: 99;
    .loading {
      height: 100%;
      background: #fff url(@/assets/images/load.gif) no-repeat center / 100px
        100px;
    }
  }
}
</style>
