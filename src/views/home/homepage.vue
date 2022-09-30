<script setup lang="ts">
// const target = ref<HTMLDivElement>();
// const { stop } = useIntersectionObserver(
//   target,
//   function ([{ isIntersecting }]) {
//     // isIntersecting: 布尔类型, 元素进入可视区为true, 元素离开可视区为false
//     if (isIntersecting) stop();
//     console.log(isIntersecting);
//   }
// );
</script>

<!-- src/views/home/HomePage.vue -->
<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
    <FreshGoods />
    <HotRecommends />
    <HotBrands />
    <HomeGoods />
    <HomeSpecial />
  </div>
</template>

<style scoped lang="less">
.box {
  color: @xtxColor;
  .hoverShadow;
}
</style>
