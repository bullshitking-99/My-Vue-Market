<script setup>
import { ref } from "vue";
// 输入框todo
const input_todo = ref("");

// 存储容器
const todoList = ref([{ id: 0, text: "nihao", isDone: false }]);

// 提交方法
function addTodo() {
  // 检验
  if (!input_todo.value) return;

  const _todoList = todoList.value;
  // 创建todo对象
  const todo = { id: null, text: "", isDone: false };
  todo.id = _todoList[_todoList.length - 1].id + 1;
  todo.text = input_todo.value;

  // push
  _todoList.push(todo);
  // clear
  input_todo.value = "";
}
</script>

<template>
  <div class="todolist">
    <input type="text" v-model="input_todo" @keydown.enter="addTodo" />
    <div v-for="todo in todoList">
      <input type="checkbox" :id="todo.id" v-model="todo.isDone" />
      <label :for="todo.id" :class="{ isDone: todo.isDone }">{{
        todo.text
      }}</label>
    </div>
  </div>
</template>

<style scoped lang="scss">
label {
  user-select: none;
}
.isDone {
  color: gray;
  font-style: italic;
  text-decoration: line-through;
}
</style>
