<script setup lang="ts">
function onChanged(filter: any) {
  console.log(filter, "paramsFather");
}
</script>
<template>
  <div class="container">
    <SubCategoryBread />
    <SubCategoryFilter @onChanged="onChanged" />
    <SubCategorySort />
  </div>
</template>
<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
}
</style>
