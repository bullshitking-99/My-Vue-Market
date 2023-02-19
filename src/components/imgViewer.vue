<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";

const isShow = ref(false);

const curImg = ref<HTMLImageElement>();
const imgSrc = ref("");

function modalShown() {
  isShow.value = false;
  (curImg.value as HTMLImageElement).style.visibility = "visible";
}

watch(isShow, () => console.log(isShow.value));

onMounted(() => {
  const imgs = Array.from(document.getElementsByTagName("img"));
  imgs.forEach((img: HTMLImageElement) => {
    // 预设样式
    img.style.cursor = "zoom-in";
    // 添加事件监听，点击时传递数据
    img.addEventListener("click", ({ target }) => {
      //   console.log((event.target as HTMLImageElement).src);
      const img = target as HTMLImageElement;
      imgSrc.value = img.src;
      isShow.value = true;
      img.style.visibility = "hidden";

      curImg.value = img;
    });
  });
});
</script>

<template>
  <div id="imgViewer">
    <div @click="modalShown" :class="isShow ? 'modalShow' : 'modalClose'">
      <img :src="imgSrc" />
    </div>
    <div class="container">
      <img src="../assets/girl.png" />
    </div>
  </div>
</template>

<style scoped lang="scss">
#imgViewer {
  .modalShow {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(3, 4, 4, 0.65);
    cursor: zoom-out;

    display: flex;
    justify-content: center;
    align-items: center;

    will-change: opacity;
    transition: all ease 0.25s;

    img {
      transition: all ease 0.25s;
      transform: scale(1.1);
      pointer-events: none;
      user-select: none;
    }
  }

  .modalClose {
    display: none;
  }
}

.container {
  width: 100%;
  height: 50vh;
  margin: 25vh 0;

  img {
    display: block;
    height: 100%;
    margin: 0 auto;
    object-fit: contain;
  }
}
</style>
