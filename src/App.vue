<script lang="ts" setup>
// import ImgViewer from "./components/imgViewer.vue";
import { ImgViewer } from "vue3-img-viewer";
</script>

<template>
  <ImgViewer>
    <div class="container">
      <img src="./assets/girl.png" />
      <img src="./assets/logo.png" />
      <h1 v-for="item in 10">up</h1>
    </div>
  </ImgViewer>
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
