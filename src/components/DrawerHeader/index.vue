<script lang="ts" setup>
import { useNavigate } from '@/composables/useNavigate';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const { goBack } = useNavigate()
const route = useRoute()

const headerText = computed(() => {
  if (route.meta?.title) {
    return route.meta?.title
  }
  return 'RediRedi'
})
</script>

<template>
  <header class="fixed left-0 top-0 z-10 w-screen bg-white">
    <div class="relative mx-auto h-16 flex items-center justify-center px-4 container">
      <button class="absolute left-4 top-1/2 transform -translate-y-1/2" @click="goBack">
        <span class="sr-only">back</span>
        <div class="i-tabler-chevron-left color-[#DA3468]" />
      </button>
      <h1 class="text-center">
        {{ headerText }}
      </h1>
    </div>
  </header>
</template>
