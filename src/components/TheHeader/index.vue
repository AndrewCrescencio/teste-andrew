<script lang="ts" setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="fixed left-0 top-0 w-screen">
    <nav class="mx-auto p-4 container">
      <ul class="flex gap-x-4">
        <li>
          <RouterLink to="/">
            Home
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/categories">
            Categorias
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
