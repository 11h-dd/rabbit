<script lang="ts" setup>
const props = defineProps<{ level: 1 | 2 | 3 | 4 | 5 | 6 }>();
const slots = useSlots();

const render = () => h(`h${props.level}`, slots.default?.());
</script>

<template>
  <render />
</template>
