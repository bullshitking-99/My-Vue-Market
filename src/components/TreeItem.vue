<script setup>
import { computed } from "@vue/reactivity";
import { ref } from "vue";

const props = defineProps({
  model: Object,
});

const isOpen = ref("false");
const isFolder = computed(
  () => props.model.children && props.model.children.length
);

const trigger = () => {
  isOpen.value = !isOpen.value;
};
const addChild = () => {
  const child = { name: "new file" };
  props.model.children.push(child);
};
const changeType = () => {
  if (!isFolder.value) {
    props.model.children = [];
    addChild();
    isOpen.value = true;
  }
};
</script>

<template>
  <li>
    <div @click="trigger" @dblclick="changeType" :class="{ bold: isFolder }">
      {{ model.name }}
      <span v-if="isFolder"> [{{ isOpen ? ">" : "<" }}] </span>
    </div>
    <ul v-show="isOpen" v-if="isFolder">
      <TreeItem v-for="model in model.children" :model="model"></TreeItem>
      <li @click="addChild">+</li>
    </ul>
  </li>
</template>

<style scoped lang="scss"></style>
