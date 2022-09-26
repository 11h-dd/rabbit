<script setup lang="ts">
import { useCateGoryStore } from "@/stores/CateGory";
import { CATEGORIES } from '@/constants/categories'
const cateGory = useCateGoryStore();
//获取数据 : storeToRefs 是双向绑定获取数据
const { categories } = storeToRefs(cateGory);
//分类方法
cateGory.getCategories();
</script>
<template>
  <h1 class="logo">
    <RouterLink to="/"></RouterLink>
  </h1>

  <ul class="app-header-nav">
    <template v-if="categories.status !== 'success'">
      <li class="home">
        <RouterLink to="/">首页</RouterLink>
      </li>
      <li v-for="category in CATEGORIES" :key="category.id">
        <RouterLink :to="`/category/${category.id}`">
          {{ category.name }}
        </RouterLink>
      </li>
    </template>
    <template v-else>
      <li class="home">
        <RouterLink to="/">首页</RouterLink>
      </li>
      <li v-for="category in categories.headerNav" :key="category.id">
        <RouterLink :to="`/category/${category.id}`">{{
        category.name
        }}</RouterLink>
        <div class="layer">
          <ul>
            <li v-for="i in category.children" :key="i.id">
              <RouterLink :to="`/category/sub${cateGory.id}/${i.id}`">
                <img :src="i.picture" alt="" />
                <p>{{ i.name }}</p>
              </RouterLink>
            </li>
          </ul>
        </div>
      </li>
    </template>
  </ul>
  <div class="search">
    <i class="iconfont icon-search"></i>
    <input type="text" placeholder="搜一搜" />
  </div>
  <div class="cart">
    <a class="curr" href="#"> <i class="iconfont icon-cart"></i><em>2</em> </a>
  </div>
</template>
<style scoped lang="less">
.logo {
  width: 200px;

  a {
    display: block;
    height: 132px;
    width: 100%;
    text-indent: -9999px;
    background: url(@/assets/images/logo.png) no-repeat center 18px / contain;
  }
}

.app-header-nav {
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  position: relative;
  z-index: 998;

  >li {
    margin-right: 40px;
    width: 38px;
    text-align: center;

    >a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }

    &:hover {
      >a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }

      >.layer {
        height: 132px;
        opacity: 1;
      }
    }
  }
}

.search {
  width: 170px;
  height: 32px;
  position: relative;
  border-bottom: 1px solid #e7e7e7;
  line-height: 32px;

  .icon-search {
    font-size: 18px;
    margin-left: 5px;
  }

  input {
    width: 140px;
    padding-left: 5px;
    color: #666;
  }
}

.cart {
  width: 50px;

  .curr {
    height: 32px;
    line-height: 32px;
    text-align: center;
    position: relative;
    display: block;

    .icon-cart {
      font-size: 22px;
    }

    em {
      font-style: normal;
      position: absolute;
      right: 0;
      top: 0;
      padding: 1px 6px;
      line-height: 1;
      background: @helpColor;
      color: #fff;
      font-size: 12px;
      border-radius: 10px;
      font-family: Arail, serif;
    }
  }
}

.layer {
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all 0.2s 0.1s;

  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;

    li {
      width: 110px;
      text-align: center;

      img {
        width: 60px;
        height: 60px;
      }

      p {
        padding-top: 10px;
      }

      &:hover {
        p {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
