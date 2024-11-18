<script setup lang="ts">
defineProps<{
  visible: boolean
}>()
</script>

<template>
  <div v-if="visible" class="centered-loader">
    <div class="i-tabler-loader-2 animate-spin color-inherit" />
  </div>
</template>

<style scoped>
.centered-loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
