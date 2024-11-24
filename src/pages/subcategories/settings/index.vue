<script setup lang="ts">
import SubcategoriesManager from '@/components/SubcategoriesManager/index.vue'
import { useHead } from '@unhead/vue'

definePage({
  meta: {
    title: 'Subcategorias',
  },
})

useHead({
  title: 'RediRedi | Subcategorias',
})
</script>

<template>
  <SubcategoriesManager />
</template>
