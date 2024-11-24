<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { RouterLink } from 'vue-router'

definePage({
  meta: {
    title: 'Home',
  },
})

useHead({
  title: 'RediRedi',
})
</script>

<template>
  <main>
    <section class="mx-auto container">
      <p>Home</p>

      <RouterLink to="/categories" class="rounded-3xl bg-[#FFE2EB] color-[#DA3468] font-500">
        Categorias
      </RouterLink>
    </section>
  </main>
</template>
