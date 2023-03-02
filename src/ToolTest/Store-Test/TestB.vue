<script setup>
import { useStore } from "../store/index.js";

const { localCount, globalCount, globalIncrement, localIncrement } = useStore();
</script>

<template>
  <button @click="localIncrement">localCount:{{ localCount }}</button>
  <button @click="globalIncrement">globalCount:{{ globalCount }}</button>
</template>

<style scoped lang="scss"></style>
