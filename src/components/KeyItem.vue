<script setup>
import { onMounted, onUnmounted } from "vue";

const props = defineProps({
  id: Number,
});
onMounted(() => {
  console.log("create " + props.id);
});
onUnmounted(() => {
  console.log("destory " + props.id);
});
</script>

<template>
  <h2>{{ props.id }}</h2>
</template>

<style scoped lang="scss"></style>
