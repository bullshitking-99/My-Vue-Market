<script lang="ts" setup>
import { ref } from "vue";

// 数据
const todo = ref("");

interface Itodo {
  id: string;
  content: string;
  isDone: boolean;
}
const todos = ref<Itodo[]>([{ id: "0", content: "hello", isDone: false }]);

// 方法
function addTodo() {
  const curTodo: Itodo = {
    id: String(todos.value.length),
    content: todo.value,
    isDone: false,
  };

  todos.value.push(curTodo);

  todo.value = "";
}
</script>

<template>
  <input
    type="text"
    v-model="todo"
    placeholder="add todo .."
    @keydown.enter="addTodo"
  />
  <ul>
    <li v-for="todo in todos">
      <input type="checkbox" v-model="todo.isDone" :id="todo.id" />
      <label :for="todo.id" :class="{ Done: todo.isDone }">{{
        todo.content
      }}</label>
    </li>
  </ul>
</template>

<style scoped lang="scss">
ul {
  padding: 0;
  li {
    list-style: none;

    .Done {
      text-decoration: line-through;
      color: gray;
      font-style: italic;
    }
  }
}
</style>
