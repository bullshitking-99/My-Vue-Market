<script lang="ts" setup>
import { last } from "lodash";
import { ref } from "vue";

// 数据
interface Icard {
  id: number;
  content: number;
  control: "open" | "close" | "shake" | "disappear";
}
const cards = ref<Icard[]>([]);

// 生成数据
for (let i = 0; i < 16; i++) {
  cards.value.push({ id: i + 1, content: i + 1, control: "close" });
}
for (let i = 8; i < 16; i++) {
  cards.value[i].content = i - 7;
}

// 控制数据
// 第一次点击的卡牌
let lastCard: Icard | null;
let restCard: number = cards.value.length;

// 方法
function shuffle(arr: Icard[]): Icard[] {
  return [];
}

function cardClickHandler(index: number): void {
  const card = cards.value[index];

  if (card === lastCard) return;

  const control = card.control;
  card.control = control === "close" ? "open" : "close";

  // 开始判断
  if (!lastCard) {
    lastCard = card;
  } else {
    if (lastCard.content === card.content) {
      lastCard.control = card.control = "disappear";
      lastCard = null;
      restCard = restCard - 2;

      if (restCard === 0) {
        setTimeout(() => alert("congratulation"), 500);
      }
    } else {
      lastCard.control = card.control = "shake";
      const _lastCard = lastCard;
      lastCard = null;
      setTimeout(() => {
        (_lastCard as Icard).control = card.control = "close";
      }, 500);
    }
    // 清空
  }
}
</script>

<template>
  <main>
    <div
      v-for="(card, index) in cards"
      :class="[
        { close: card.control === 'close' },
        { shake: card.control === 'shake' },
        { disappear: card.control === 'disappear' },
      ]"
      @click="cardClickHandler(index)"
    >
      {{ card.content }}
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  width: 60vw;
  height: 60vw;
  margin: 10vh auto;
  padding: 10px;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-gap: 10px;

  background-color: bisque;
  border-radius: 10px;

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: burlywood;
    border-radius: inherit;

    transition: all ease 0.2s;

    user-select: none;
    font-size: calc((60vw - 50px) / 10);

    &.close {
      color: transparent;
    }
    &.disappear {
      visibility: hidden;
    }
    &.shake {
      animation: shaking;
      animation-duration: 0.5s;

      @keyframes shaking {
        10% {
          transform: translateX(2px);
        }
        20% {
          transform: translateX(-2px);
        }
        30% {
          transform: translateX(2px);
        }
        40% {
          transform: translateX(-2px);
        }
        50% {
          transform: translateX(2px);
        }
        60% {
          transform: translateX(-2px);
        }
        70% {
          transform: translateX(2px);
        }
        80% {
          transform: translateX(-2px);
        }
        90% {
          transform: translateX(2px);
        }
        100% {
          transform: translateX(0);
        }
      }
    }
  }
}
</style>
