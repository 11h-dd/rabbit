<script setup lang="ts">
import { useCateGoryStore } from "@/stores/CateGory";
import { CATEGORIES } from "@/constants/categories";
import type { CateGory } from "@/types/cateGory";
const cateGory = useCateGoryStore();
//获取数据 : storeToRefs 是双向绑定获取数据
const { categories } = storeToRefs(cateGory);
//分类方法
const { getCategories, toggle } = cateGory;
getCategories();
</script>
<template>
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
      <li
        v-for="category in categories.headerNav"
        :key="category.id"
        @mouseenter="toggle(category.id, true)"
        @mouseleave="toggle(category.id, false)"
        @click="toggle(category.id, false)"
      >
        <RouterLink :to="`/category/${category.id}`">{{
          category.name
        }}</RouterLink>
        <div class="layer" :class="{ open: category.isOpen }">
          <ul>
            <li v-for="i in category.children" :key="i.id">
              <RouterLink :to="`/category/sub/${category.id}/${i.id}`">
                <img :src="i.picture" alt="" />
                <p>{{ i.name }}</p>
              </RouterLink>
            </li>
          </ul>
        </div>
      </li>
    </template>
  </ul>
</template>
<style scoped lang="less">
.app-header-nav {
  .layer {
    &.open {
      height: 132px;
      opacity: 1;
    }
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
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  position: relative;
  z-index: 998;

  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;

    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }

    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }

      // > .layer {
      //   height: 132px;
      //   opacity: 1;
      // }
    }
  }
}
</style>
