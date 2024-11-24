<script lang="ts" setup>
import { useHead } from '@unhead/vue'
import { RouterLink } from 'vue-router'

definePage({
  meta: {
    title: '404 - Página não encontrada',
  },
})

useHead({
  title: 'RediRedi | Página não encontrada',
})
</script>

<template>
  <main>
    <section class="mx-auto container">
      <p>Página não encontrada</p>
      <RouterLink to="/categories">
        Voltar para home
      </RouterLink>
    </section>
  </main>
</template>
