<script lang="ts" setup>
import { computed, ref } from "vue";

// 数据接口
const API_URL = `https://api.github.com/repos/vuejs/core/commits?per_page=3`;

// 获取数据 , 数据属于是有点复杂，不整了
// const data = await (await fetch(API_URL)).json();

// 示例数据
const data = {
  VueCore: {
    main: {
      "1d09540":
        "ci: add a ecosystem-ci-trigger workflow (#7618)by Haoqun Jiang at 2023-02-10 11:02:41",
      "1d09530":
        "ci: add a ecosystem-ci-trigger workflow (#7618)by Haoqun Jiang at 2023-02-10 11:02:41",
    },
    "v2-compat": {
      "1d09540":
        "ci: add a ecosystem-ci-trigger workflow (#7618)by Haoqun Jiang at 2023-02-10 11:02:41",
    },
  },
};

// 拆解数据，分为三级
const first = ref<string[]>(Object.keys(data));
const curFirst = ref<string>(first.value[0]);

const second = computed(() => Object.keys(data[curFirst.value]));
const curSecond = ref<string>(second.value[0]);
console.log(curSecond.value);

const third = computed(() => {
  const arr = data[curFirst.value][curSecond.value];
  let keys = Object.keys(arr);
  let res = keys.map((key) => `${key} - ${arr[key]}`);
  return res;
});
</script>

<template>
  <!-- 三栏布局，从左至右为菜单分级 -->
  <main class="container">
    <div class="first">
      <p v-for="item in first" @click="curFirst = item">{{ item }}</p>
    </div>
    <div class="second">
      <p v-for="item in second" @click="curSecond = item">{{ item }}</p>
    </div>
    <div class="third">
      <p v-for="item in third">{{ item }}</p>
    </div>
  </main>
</template>

<style scoped lang="scss">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.container {
  width: 80vw;
  min-width: 450px;
  height: 80vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  margin: 10vh auto;
  border: 3px solid gray;
  border-radius: 10px;

  div {
    display: flex;
    // 消除换行后子元素间的间隙
    align-content: center;
    flex-wrap: wrap;
    overflow: auto;

    p {
      width: 100%;
      height: 12%;
      //   行高与高度一致可实现字体垂直居中，行高的百分比取得是p元素的高度
      // 再减3px是因为边框也算在内容高度了，不减内容是溢出的
      line-height: calc(80vh * 0.12 - 3px);
      margin: 0;
      text-align: center;
      border-bottom: 1px solid gray;
      //   border-right: 1px solid gray;

      overflow: auto;
      position: relative;
    }
    p:first-child {
      border-top: 1px solid gray;
    }
    p::after {
      content: "";
      position: absolute;
      bottom: 0;
      transition: all 0.3s cubic-bezier(0.71, 0.15, 0.35, 0.89);
      //   after默认是行内元素，不能设置宽高
      display: block;
      width: 100%;
      height: 0%;
      z-index: 2;
      background-color: rgba(255, 99, 72, 0.5);
    }
    // hover 效果
    p:hover::after {
      height: 100%;
    }
  }

  .first {
    background-color: bisque;
    border-radius: 10px 0 0 10px;
    border-right: 1.5px solid gray;
    z-index: 100;
    box-shadow: 2px 0 10px gray;
  }
  .second {
    background-color: antiquewhite;
    border-right: 1.5px solid gray;
    z-index: 99;
    box-shadow: 2px 0 10px gray;
  }
  .third {
    background-color: aliceblue;
    border-radius: 0 10px 10px 0;
  }
}
</style>
