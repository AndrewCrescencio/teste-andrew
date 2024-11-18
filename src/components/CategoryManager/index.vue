<script lang="ts" setup>
import type { Category } from '@/types/category.type'
import CategoryWidget from '@/components/CategoryWidget/index.vue'
import FeedbackEmpty from '@/components/FeedbackEmpty/index.vue'
import RegisterCategory from '@/components/RegisterCategory/index.vue'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import { useCategoriesStore } from '@/stores/categories'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const isLoading = ref(false)
const isDialogOpen = ref(false)
const categoryToDelete = ref<Category>()

const categoriesStore = useCategoriesStore()
const { getCategories, deleteCategory } = categoriesStore
const { categories } = storeToRefs(categoriesStore)

async function confirmDeleteCategory(payload: { category: Category, isSubCategory: boolean }) {
  categoryToDelete.value = payload.category
  isDialogOpen.value = true
}

async function handleDeleteCategory() {
  try {
    isLoading.value = true
    // NOTE: deleteCategory - poderia perguntar se quer apagar subcategorias checando se category hasChildren para enviar query param ?forceDeleteTree=true
    if (categoryToDelete.value) {
      const successDelete = await deleteCategory(categoryToDelete.value)
      return successDelete
    }
  }
  catch (err) {
    console.error(err)
  }
  finally {
    isLoading.value = false
    categoryToDelete.value = undefined
    isDialogOpen.value = false
  }
}

function onCancelDeleteCategory() {
  categoryToDelete.value = undefined
  isDialogOpen.value = false
}

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
  <div>
    <RegisterCategory class="mx-auto px-4 container" />

    <section class="relative mx-auto px-4 container">
      <div v-if="categories.length" class="flex flex-col gap-y-5">
        <CategoryWidget
          v-for="category in categories" :key="category.id"
          :is-sub-category="false" :category="category"
          @delete="confirmDeleteCategory"
        />
      </div>
      <FeedbackEmpty v-else />
    </section>

    <AlertDialog v-if="isDialogOpen" :open="isDialogOpen" @close="onCancelDeleteCategory">
      <AlertDialogContent class="rounded-3xl border-none bg-white max-sm:(max-w-xs px-4)">
        <AlertDialogHeader class="text-left">
          <i class="i-tabler-alert-triangle mx-auto h-20 w-20" />
          <AlertDialogTitle class="text-xl color-[#31436F] font-600 -mb-1">
            Deseja excluir a categoria?
          </AlertDialogTitle>
          <!-- {{ categoryToDelete?.name }} -->
          <AlertDialogDescription class="text-base color-[#586893] font-500 tracking-[-.070rem]">
            Essa ação é irreversível e implica na exclusão das subcategorias vinculadas. <br> Os produtos ligados a essa categoria não serão excluidos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter class="flex-row items-center justify-between gap-x-2">
          <AlertDialogCancel
            :disabled="isLoading" as="button"
            class="mt-0 h-11 w-full rounded-3xl color-[#DA3468] !bg-[#FFE2EB]" @click="onCancelDeleteCategory"
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            :disabled="isLoading" as="button"
            class="h-11 w-full rounded-3xl text-white !bg-[#DA3468]" @click="handleDeleteCategory"
          >
            Excluir
            <div v-if="isLoading" class="i-tabler-loader-2 animate-spin color-inherit" />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
