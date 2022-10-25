<script setup lang="ts">
import { useGoodsStore } from "@/stores/goodsStore";
const store = useGoodsStore();
const { mainPictures } = storeToRefs(store);
const current = ref(0);
const target = ref(null);
//isOutside鼠标是否移除了容器 是true  没有移除 就是false
const { elementX, elementY, isOutside } = useMouseInElement(target);
let layerPosition = reactive({ left: 0, top: 0 });
let bgPosition = reactive({ x: 0, y: 0 });
watchEffect(() => {
  //初始化`执行一次
  layerPosition.left = elementX.value - 100;
  layerPosition.top = elementY.value - 100;
  if (layerPosition.left < 0) {
    layerPosition.left = 0;
  } else if (layerPosition.left > 200) {
    layerPosition.left = 200;
  }
  if (layerPosition.top < 0) {
    layerPosition.top = 0;
  } else if (layerPosition.top > 200) {
    layerPosition.top = 200;
  }
  bgPosition.x = -layerPosition.left * 2;
  bgPosition.y = -layerPosition.top * 2;
});
</script>
<template>
  <div class="goods-image">
    <div
      v-show="!isOutside"
      class="large"
      :style="{
        backgroundImage: `url(${mainPictures[current]})`,
        backgroundPositionX: bgPosition.x + 'px',
        backgroundPositionY: bgPosition.y + 'px',
      }"
    ></div>
    <div class="middle" ref="target">
      <img :src="mainPictures[current]" alt="" />
      <div
        class="layer"
        v-show="!isOutside"
        :style="{
          left: layerPosition.left + 'px',
          top: layerPosition.top + 'px',
        }"
      ></div>
    </div>
    <ul class="small">
      <li
        :class="{ active: index === current }"
        v-for="(item, index) in mainPictures"
        :key="item"
        @mouseenter="current = index"
      >
        <img :src="item" alt="" />
      </li>
    </ul>
  </div>
</template>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
}
</style>
