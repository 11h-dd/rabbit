<script setup lang="ts">
import type { Banner } from "@/types/Banner";
interface Props {
  carousels: Banner[];
  autoPlay?: boolean;
  // 自动轮播间隔时间
  duration?: number;
}
const props = withDefaults(defineProps<Props>(), {
  autoPlay: true,
  // 自动轮播间隔时间
  duration: 3000,
});
//索引
const current = ref(0);
//定时器
let timer: number | undefined;
//控制显示
function toggle(step = 1) {
  let nextIndex = current.value + step;
  // 左边溢出
  if (nextIndex < 0) {
    current.value = props.carousels.length - 1;
    // 右边溢出
  } else if (nextIndex > props.carousels.length - 1) {
    current.value = 0;
  } else {
    // 正常范围
    current.value = nextIndex;
  }
}
//自动轮播
function StartAutoplay() {
  clearInterval(timer);
  if (props.autoPlay && props.carousels.length > 1) {
    timer = setInterval(toggle, props.duration);
  }
}
//停止
function StopPlay() {
  clearInterval(timer);
}
// 组件挂载完成后 开始自动轮图
onMounted(StartAutoplay);
// 组件卸载后 清除轮播图定时器
onUnmounted(StopPlay);
</script>
<template>
  <div class="xtx-carousel" @mouseenter="StopPlay" @mouseleave="StartAutoplay">
    <ul class="carousel-body">
      <li
        v-for="(item, index) in carousels"
        :key="item.id"
        class="carousel-item"
        :class="{ fade: current === index }"
      >
        <slot :name="`default-${index}`" :current="current"></slot>
      </li>
    </ul>
    <a href="javascript:" @click="toggle(-1)" class="carousel-btn prev"
      ><i class="iconfont icon-angle-left"></i
    ></a>
    <a href="javascript:" @click="toggle(1)" class="carousel-btn next"
      ><i class="iconfont icon-angle-right"></i
    ></a>
    <div class="carousel-indicator">
      <span
        v-for="(item, index) in carousels"
        :key="item.id"
        :class="{ active: index === current }"
        @click="current = index"
      ></span>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
