<script setup lang="ts">
import { RouterLink } from 'vue-router'
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
