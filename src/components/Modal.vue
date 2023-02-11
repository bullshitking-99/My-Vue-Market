<script setup>
const props = defineProps({
  show: Boolean,
});
const emit = defineEmits(["close"]);
</script>

<template>
  <Transition name="modal">
    <div class="mask" v-if="show">
      <div class="container">
        <div class="header">
          <slot name="header">default header</slot>
        </div>
        <div class="body">
          <slot name="body">default body</slot>
        </div>
        <div class="footer">
          <slot name="footer">default footer</slot>
          <button @click="emit('close')">Confirm</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}
.container {
  width: 300px;
  height: 100px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.body {
  margin: 20px 0;
}
button {
  float: right;
}

// Transition 组件

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .container,
.modal-leave-to .container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
