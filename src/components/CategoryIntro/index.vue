<script lang="ts" setup>
import { useCategoriesStore } from '@/stores/categories'

import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'

const categoriesStore = useCategoriesStore()
const { getCategories } = categoriesStore
const { categories } = storeToRefs(categoriesStore)

async function init() {
  try {
    await getCategories()
  }
  // NOTE: Sei que poderia usar errorCaptured ou onErrorCaptured()
  // https://vuejs.org/guide/built-ins/suspense#error-handling
  catch (err) {
    console.error(err)
  }
}

await init()
</script>

<template>
  <template v-if="categories.length">
    <RouterLink
      to="/categories/settings"
      class="relative mb-3 block h-14 w-full border border-[#DDE2EF] rounded-2xl bg-white px-5 py-[14px] color-[#29354F]"
    >
      Categorias
      <span class="ml-4 rounded-2xl bg-[#DDE2EF] px-[15px] py-[2px] text-lg color-[#586893] font-500">{{ categories.length
      }}</span>
      <i class="i-tabler-chevron-right absolute right-3 top-1/2 transform -translate-y-1/2" />
    </RouterLink>
    <RouterLink
      class="relative mb-3 block w-full border border-[#DDE2EF] rounded-2xl bg-white px-5 py-[14px] color-[#29354F] font-500"
      to="/subcategories/settings"
    >
      Subcategorias
      <i class="i-tabler-chevron-right absolute right-3 top-1/2 transform -translate-y-1/2" />
    </RouterLink>
  </template>
  <template v-else>
    <RouterLink to="/categories/settings" class="max-w-max flex items-center gap-2 rounded-3xl bg-[#FFE2EB] py-3 pl-6 pr-4 color-[#DA3468] font-500 font-500">
      Criar categorias
      <span class="grid h-6 w-6 place-content-center">
        <i class="i-tabler-plus" />
      </span>
    </RouterLink>
  </template>
</template>
