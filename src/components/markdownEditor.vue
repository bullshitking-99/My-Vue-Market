<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { marked } from "marked";
import { computed } from "@vue/reactivity";
import hljs from "highlight.js";
import "highlight.js/styles/a11y-dark.css"; // 导入代码高亮样式

const input = ref<string>(
  "# hello world\n```javascript\nconsole.log('hello')\nvar name = 'lee'\n```"
);
const output = computed<String>(() => marked(input.value));
</script>

<template>
  <!-- 两栏布局：左侧固定输入栏，右侧自适应显示栏 -->
  <div class="container">
    <textarea class="input" v-model="input"> </textarea>
    <div class="output" v-highlight v-html="output"></div>
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
  font-family: "Monaco", courier, monospace;
}
.container {
  width: 80vw;
  height: 60vh;
  margin: 20vh auto;
  background-color: burlywood;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  .input,
  .output {
    overflow: auto;
  }
  .input {
    width: 300px;
    height: 100%;
    margin-right: 5px;
    background-color: aliceblue;
    border-radius: inherit;
    border: none;
    resize: none;
    outline: none;
    padding: 20px;
    font-size: 16px;
  }
  .output {
    width: calc(100% - 305px);
    height: 100%;
    background-color: whitesmoke;
    border-radius: inherit;
    padding: 20px;
  }
  code {
    display: block;
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    background-color: rgba(128, 128, 128, 0.298);
  }
}
</style>
