import { ref } from "vue";

// 展示一把组合式函数

// 全局状态，创建在模块作用域下
const globalCount = ref(1);

function globalIncrement() {
  this.globalCount++;
}

export function useStore() {
  let localCount = ref(1);

  function localIncrement() {
    this.localCount++;
  }

  return {
    globalCount,
    localCount,
    localIncrement,
    globalIncrement,
  };
}
