<script setup>
import component from "./components/imgViewer.vue";
</script>

<template>
  <component>
    <div class="container">
      <img src="./assets/girl.png" />
      <img src="./assets/logo.png" />
      <h1 v-for="item in 10">up</h1>
    </div>
  </component>
</template>

<style lang="scss">
.container {
  img {
    display: block;
    width: 300px;
    height: 300px;
    margin: 0 auto;
    object-fit: contain;
  }
}
</style>
