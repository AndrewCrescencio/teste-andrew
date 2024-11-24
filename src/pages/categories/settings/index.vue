<script lang="ts" setup>
import CategoryManager from '@/components/CategoryManager/index.vue'
import Loader from '@/components/Loader/index.vue'
import { useHead } from '@unhead/vue'

definePage({
  meta: {
    title: 'Categorias',
  },
})

useHead({
  title: 'RediRedi | Categorias',
})
</script>

<template>
  <main>
    <Suspense>
      <template #default>
        <CategoryManager />
      </template>
      <template #fallback>
        <Loader class="mx-auto h-10 w-10 color-[#DA3468]" />
      </template>
    </Suspense>
  </main>
</template>
