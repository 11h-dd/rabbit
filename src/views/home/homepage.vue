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
    <!-- <HomePanel title="主标题" subTitle="副标题">
      <template #default> 内容 </template>
      <template #right>
        <XtxMore />
      </template>
    </HomePanel> -->
    <FreshGoods />
    <HotRecommends />
    <div ref="target">测试元素进入离开可视区</div>
  </div>
</template>

<style scoped lang="less">
.box {
  color: @xtxColor;
  .hoverShadow;
}
</style>
