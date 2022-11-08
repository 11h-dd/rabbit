<script setup lang="ts">
import { useMemberStore } from "@/stores/memberStore";

// 获取 member store 对象
const memberStore = useMemberStore();
// 发送请求 获取我的收藏(商品)
memberStore.getCollections({ page: 1, pageSize: 10, collectType: 1 });
</script>
<template>
  <div class="home-overview">
    <!-- 用户信息 -->
    <div class="user-meta">
      <div class="avatar">
        <img
          src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/avatar_1.png"
          alt=""
        />
      </div>
      <h4>徐菲菲</h4>
    </div>
    <div class="item">
      <a href="javascript:">
        <span class="iconfont icon-hy"></span>
        <p>会员中心</p>
      </a>
      <a href="javascript:">
        <span class="iconfont icon-aq"></span>
        <p>安全设置</p>
      </a>
      <a href="javascript:">
        <span class="iconfont icon-dw"></span>
        <p>地址管理</p>
      </a>
    </div>
  </div>
  <div class="member-home">
    <MemberHomePanel title="我的收藏">
      <GoodsItem
        v-for="item in memberStore.collections[1].result.items.slice(0, 4)"
        :key="item.id"
        :goods="item"
      />
    </MemberHomePanel>
  </div>
</template>

<style scoped lang="less">
.home-overview {
  height: 132px;
  background: url(@/assets/images/center-bg.png) no-repeat center / cover;
  display: flex;
  .user-meta {
    flex: 1;
    display: flex;
    align-items: center;
    .avatar {
      width: 85px;
      height: 85px;
      border-radius: 50%;
      overflow: hidden;
      margin-left: 60px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    h4 {
      padding-left: 26px;
      font-size: 18px;
      font-weight: normal;
      color: white;
    }
  }
  .item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-around;
    &:first-child {
      border-right: 1px solid #f4f4f4;
    }
    a {
      color: white;
      font-size: 16px;
      text-align: center;
      .iconfont {
        font-size: 32px;
      }
      p {
        line-height: 32px;
      }
    }
  }
}
.member-home {
  :deep(.xtx-carousel) .carousel-btn.prev {
    left: 5px;
  }
  :deep(.xtx-carousel) .carousel-btn.next {
    right: 5px;
  }
}
</style>
