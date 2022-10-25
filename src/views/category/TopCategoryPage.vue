<script setup lang="ts">
import { useHomeStores } from "@/stores/brandStore";
import AllSubCategories from "./components/AllSubCategories.vue";

const store = useHomeStores();
const { banners } = storeToRefs(store);
const { getBanners } = store;
getBanners();
</script>
<template>
  <div class="container">
    <TopCategoryBread />
    <XtxCarousel
      v-if="banners.status === 'success'"
      :count="banners.result.length"
      style="height: 500px"
    >
      <template
        v-for="(item, index) in banners.result"
        :key="item.id"
        v-slot:[`default-${index}`]
      >
        <RouterLink :to="item.hrefUrl">
          <img :src="item.imgUrl" :alt="item.imgUrl" />
        </RouterLink>
      </template>
    </XtxCarousel>
    <AllSubCategories />
    <RecommendsGoods />
  </div>
</template>
