<script lang="ts" setup>
import DrawerHeader from '@/components/DrawerHeader/index.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <DrawerHeader />
  <RouterView class="min-h-screen scroll-pt-16 pt-16" />
</template>
