<script lang="ts" setup>
import { reactive, ref } from "vue";

// 数据
interface Icard {
  src: string;
  link: string;
  state: "left" | "mid" | "right" | "back";
}

const cards = ref<Icard[]>([
  {
    src: "src/assets/girl.png",
    state: "mid",
    link: "https://www.kuaishou.com",
  },
  {
    src: "src/assets/girl.png",
    state: "left",
    link: "https://www.kuaishou.com",
  },
  {
    src: "src/assets/girl.png",
    state: "right",
    link: "https://www.kuaishou.com",
  },
  {
    src: "src/assets/girl.png",
    state: "back",
    link: "https://www.kuaishou.com",
  },
]);
// 方法
// 点击卡片
function clickHandler(index: number): void {
  // 点击的卡片
  const card = cards.value[index];
  const len = cards.value.length;

  //   判断点击

  if (card.state === "left") {
    leftClick();
  } else if (card.state === "mid") {
    midClick();
  } else {
    rightClick();
  }

  //  点击mid
  function midClick() {
    window.open(card.link, "_blank");
  }
  // 点击left
  function leftClick() {
    card.state = "mid";

    //   接下来的卡片
    const card2 = cards.value[index + 1] || cards.value[(index + 1) % len];
    const card3 = cards.value[index + 2] || cards.value[(index + 2) % len];
    const card4 = cards.value[index - 1] || cards.value[len + (index - 1)];

    // 下一张变成right
    card2.state = "right";
    // 下下张变成back
    card3.state = "back";
    // 上张变成left
    card4.state = "left";
  }

  // 点击right
  function rightClick() {
    card.state = "mid";

    //   前面的卡片
    const card2 = cards.value[index - 1] || cards.value[len + (index - 1)];
    const card3 = cards.value[index - 2] || cards.value[len + (index - 2)];
    const card4 = cards.value[index + 1] || cards.value[(index + 1) % len];

    // 上一张变成left
    card2.state = "left";
    // 上上张变成back
    card3.state = "back";
    // 下张变成right
    card4.state = "right";
  }
}

// 单次播放
function play() {
  // 当前的right
  let rightIndex: number = 1;
  cards.value.forEach((card, index) => {
    if (card.state === "right") rightIndex = index;
  });
  clickHandler(rightIndex);
}
// 自动轮播
setInterval(play, 3000);
</script>

<template>
  <div class="container">
    <img
      class="card"
      v-for="(card, index) in cards"
      :src="card.src"
      @click="clickHandler(index)"
      :class="[
        { mid: card.state === 'mid' },
        { left: card.state === 'left' },
        { right: card.state === 'right' },
        { back: card.state === 'back' },
      ]"
    />
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 90vw;
  height: 30vh;
  margin: 20vh auto;
  position: relative;
  border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: center;

  .card {
    position: absolute;
    width: 60%;
    height: 80%;
    border-radius: 10px;
    object-fit: cover;
    overflow: hidden;

    transition: all cubic-bezier(0.1, 0.49, 0.74, 0.96) 0.3s;

    &.left {
      transform: translateX(-35%) scale(80%);
    }
    &.mid {
      z-index: 4;
    }
    &.right {
      transform: translateX(35%) scale(80%);
    }
    &.back {
      transform: scale(80%);
      z-index: -1;
    }
  }
}
</style>
