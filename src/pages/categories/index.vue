<script lang="ts" setup>
import CategoryIntro from '@/components/CategoryIntro/index.vue'
import Loader from '@/components/Loader/index.vue'
import { useHead } from '@unhead/vue'

useHead({
  title: 'RediRedi | Categorias',
})
</script>

<template>
  <main>
    <section class="mx-auto px-4 container">
      <p class="text-xl text-[#31436F] font-600">
        Organize seu catálogo com categorias e subcategorias
      </p>
      <p class="mb-6 text-[#586893]">
        Ao usar as categorias e subcategorias do catálogo, você ajuda seus clientes a
        encontrarem os produtos
        desejados.
      </p>
      <Suspense>
        <template #default>
          <CategoryIntro />
        </template>
        <template #fallback>
          <Loader class="h-10 w-10 color-[#DA3468]" />
        </template>
      </Suspense>
    </section>
  </main>
</template>
