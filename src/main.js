import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import hljs from "highlight.js";
import "highlight.js/styles/a11y-light.css"; // 导入代码高亮样式

const app = createApp(App);

// highlight.js
// 注册一个全局指令
// 这会在使用元素的 mounted 和 updated 时都调用
app.directive("highlight", function (el) {
  let blocks = el.querySelectorAll("pre code");
  blocks.forEach((block) => {
    hljs.highlightAll(block);
  });
});

app.use(router).mount("#app");
