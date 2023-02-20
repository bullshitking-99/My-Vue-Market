<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from "vue";

// 控制 modal
const isShow = ref(false);

//  原图片实例
let curImg: HTMLImageElement;

// 现图片实例
let modalImg: HTMLImageElement;

// modal实例
let modal: HTMLElement;

// modal-img所需src
const imgSrc = ref("");

// FLIP
//  First Last 中获取 - invert所需数据
interface IRects {
  left: number;
  top: number;
  width: number;
}
let curRects: IRects;
let prevRects: IRects;
let scaleVal: number;

// First & Last 获取图片大小和位置
function getRects(img: HTMLImageElement) {
  // 该方法会强制更新dom信息
  const rect = img.getBoundingClientRect();
  const { left, top, width } = rect;
  return { left, top, width };
}

// invert & play
function invertPlay(imgDom: HTMLImageElement, control: "show" | "close") {
  // 倒置的距离和尺寸
  const invert = {
    left: curRects.left - prevRects.left,
    top: curRects.top - prevRects.top,
    scaleVal,
  };

  let keyframes = [
    // cur-img在的位置
    {
      transform: `translate3d(${invert.left}px, ${invert.top}px,0) scale(${scaleVal})`,
      transformOrigin: "0 0",
    },
    // modal-img的位置
    { transform: "translate(0)" },
  ];
  if (control === "close") {
    keyframes = [keyframes[1], keyframes[0]];
  }

  const options = {
    duration: 300,
    easing: "cubic-bezier(0,0,0.32,1)",
  };

  // gogogo
  const animation = imgDom.animate(keyframes, options);

  // 动画结束时关闭modal
  if (control === "close") {
    animation.addEventListener("finish", () => {
      //  close modal
      isShow.value = false;
      imgSrc.value = "";

      // put origin-img back
      curImg.style.opacity = "1";

      // 取消副作用
      curImg.style.transition = "";
      modal.style.backgroundColor = "";
    });
  }
}

// modal click handler
function modalClose() {
  // modal background-transparent
  modal.style.backgroundColor = "transparent";
  // invert play again
  invertPlay(modalImg, "close");
}

onMounted(() => {
  // 原图片
  const imgs = Array.from(document.getElementsByTagName("img"));
  imgs.forEach((img: HTMLImageElement) => {
    // 预设样式
    img.style.cursor = "zoom-in";

    // 添加事件监听
    img.addEventListener("click", async ({ target }) => {
      // 传递数据
      curImg = target as HTMLImageElement;
      imgSrc.value = curImg.src;
      curRects = getRects(curImg);
      // 打开modal
      isShow.value = true;
    });
  });

  // 获取modal实例
  modal = document.getElementById("imgViewer-modal")!;

  // 预览图片
  modalImg = document.getElementById("imgViewer-modalImg") as HTMLImageElement;
  // img 在获得src后才会加载，加载需要时间
  modalImg.onload = () => {
    prevRects = getRects(modalImg);
    scaleVal = curRects.width / prevRects.width;
    // 执行flip
    invertPlay(modalImg, "show");
    // 原图片消失 - 带来问题：modal-img 出现时空白闪烁 - 给原图片消失加transition
    curImg.style.transition = "all ease .1s";
    curImg.style.opacity = "0";
  };
});
</script>

<template>
  <div id="imgViewer">
    <div
      @click="modalClose"
      id="imgViewer-modal"
      class="modal"
      :class="isShow ? 'modalShow' : 'modalClose'"
    >
      <img id="imgViewer-modalImg" :src="imgSrc" />
    </div>
    <div class="container">
      <img src="../assets/girl.png" />
      <h1 v-for="item in 10">up</h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
#imgViewer {
  .modal {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    cursor: zoom-out;
    transition: all ease 0.25s;
    z-index: 999;

    display: flex;
    justify-content: center;
    align-items: center;

    img {
      pointer-events: none;
      user-select: none;
    }

    &.modalShow {
      background-color: rgba(3, 4, 4, 0.25);
    }

    &.modalClose {
      visibility: hidden;
    }
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
