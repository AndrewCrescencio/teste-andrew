<script setup lang="ts">
import LoaderFullscreen from '@/components/LoaderFullscreen/index.vue'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useLoaderFullscreenStore } from '@/stores/loaderFullscreen'
import { storeToRefs } from 'pinia'
import { RouterView } from 'vue-router'

const loaderFullscreenStore = useLoaderFullscreenStore()
const { isLoading } = storeToRefs(loaderFullscreenStore)
</script>

<template>
  <RouterView />
  <Toaster />
  <LoaderFullscreen :visible="isLoading" />
</template>
