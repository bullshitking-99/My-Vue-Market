<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";

// 数据
interface Icard {
  src: string;
  link: string;
  state: "left" | "mid" | "right" | "back";
}
interface Ipoint {
  id: number;
  state: boolean;
}

// 卡片
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
const len = cards.value.length;

// 点击卡片
function clickHandler(index: number): void {
  // 点击的卡片
  const card = cards.value[index];

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

// 自动轮播
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
let timeId = setInterval(play, 3000);
// 鼠标hover时取消轮播
// 声明一个 ref 来存放该元素的引用
// 必须和模板里的 ref 同名
const container = ref<HTMLDivElement | null>(null);
onMounted(() => {
  (container.value as HTMLDivElement).onmouseenter = () => {
    clearInterval(timeId);
  };
  (container.value as HTMLDivElement).onmouseleave = () => {
    timeId = setInterval(play, 3000);
  };
});

// 导航的小点
const points = ref<Ipoint[]>(
  new Array(cards.value.length).fill(null).map(() => {
    return { id: 0, state: false };
  })
);

points.value.forEach((point, index) => {
  point.id = index;
  point.state = false;
});

// 鼠标移入 导航激活
const pointRefs = ref<HTMLSpanElement[]>([]);

onMounted(() => {
  pointRefs.value.forEach((point) => {
    point.onmouseenter = () => {
      points.value[point.id].state = true;
      const pointIndex = Number(point.id);

      // 滚动卡片 - 重新设置所有卡片状态
      cards.value.forEach((card, index) => {
        switch (index) {
          case pointIndex:
            card.state = "mid";
            break;

          case pointIndex + 1:
          case (pointIndex + 1) % len:
            card.state = "right";
            break;

          case pointIndex - 1:
          case len + (pointIndex - 1):
            card.state = "left";
            break;

          default:
            card.state = "back";
            break;
        }
      });
    };
    point.onmouseleave = () => {
      points.value[point.id].state = false;
    };
  });
});
</script>

<template>
  <div ref="container" class="container">
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
    <div class="pointBar">
      <span
        ref="pointRefs"
        :id="String(point.id)"
        v-for="point in points"
        class="point"
        :class="{ pointChoosen: point.state }"
      ></span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  max-width: 800px;
  width: 90vw;
  min-height: 300px;
  height: 30vh;
  margin: 20vh auto;
  position: relative;
  border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    &::before {
      box-sizing: border-box;
      content: "<";
      width: 1.4rem;
      height: 1.4rem;
      background-color: rgba(0, 0, 0, 0.154);
      color: rgba(255, 255, 255, 0.575);
      border-radius: 50%;
      font-size: 1.2rem;
      line-height: 1.3rem;
      padding-left: 0.2rem;
      z-index: 999;
      display: inline-block;
      position: absolute;
      left: 7%;
      transition: all ease 0.2s;
      pointer-events: none;
    }
    &::after {
      box-sizing: border-box;
      content: ">";
      width: 1.4rem;
      height: 1.4rem;
      background-color: rgba(0, 0, 0, 0.154);
      color: rgba(255, 255, 255, 0.575);
      border-radius: 50%;
      font-size: 1.2rem;
      line-height: 1.3rem;
      padding-left: 0.3rem;
      z-index: 999;
      display: inline-block;
      position: absolute;
      right: 7%;
      transition: all ease 0.2s;
      pointer-events: none;
    }
  }

  .card {
    position: absolute;
    width: 60%;
    height: 80%;
    border-radius: 10px;
    object-fit: cover;
    overflow: hidden;
    user-select: none;

    transition: all cubic-bezier(0.1, 0.49, 0.74, 0.96) 0.5s;

    &.left {
      transform: translateX(-35%) scale(80%);
    }
    &.mid {
      z-index: 4;
      cursor: pointer;
    }
    &.right {
      transform: translateX(35%) scale(80%);
    }
    &.back {
      transform: scale(80%);
      z-index: -1;
      opacity: 0;
    }
  }

  .pointBar {
    position: absolute;
    bottom: 2%;
    .point {
      display: inline-block;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.49);
      margin-right: 10px;

      &.pointChoosen {
        background-color: rgba(255, 0, 0, 0.716);
      }
    }
  }
}
</style>
