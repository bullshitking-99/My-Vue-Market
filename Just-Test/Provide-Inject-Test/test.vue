<script lang="ts" setup>
import { inject } from "vue";
import InjectionKeys from "./SymbolKeys.js";

const injection = inject(InjectionKeys);
</script>

<template>{{ injection }}</template>

<style scoped lang="scss"></style>
