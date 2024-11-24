<script lang="ts" setup>
import type { Category } from '@/types/category.type'
import Loader from '@/components/Loader/index.vue'

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
import { useSubcategoriesStore } from '@/stores/subcategories'

import { storeToRefs } from 'pinia'
import { defineAsyncComponent, onMounted, ref } from 'vue'

const isMounted = ref(false)
const isLoading = ref(false)
const isDeleting = ref(false)
const isDialogOpen = ref(false)
const subcategoryToDelete = ref()

const subcategoriesStore = useSubcategoriesStore()
const { getSubcategories, deleteSubcategory } = subcategoriesStore
const { subcategories } = storeToRefs(subcategoriesStore)

const SubcategoriesList = defineAsyncComponent(() =>
  import('@/components/SubcategoriesList/index.vue'),
)

async function onDelete(payload: { category: Category, isSubCategory: boolean }) {
  subcategoryToDelete.value = { ...payload.category }
  isDialogOpen.value = true
}

async function handleDeleteSubcategory() {
  try {
    isDeleting.value = true
    const successDelete = await deleteSubcategory(subcategoryToDelete.value)
    if (successDelete) {
      subcategoryToDelete.value = null
      isDialogOpen.value = false
    }
  }
  catch (err) {
    console.error(err)
  }
  finally {
    isDeleting.value = false
  }
}

function onCancelDeleteCategory() {
  subcategoryToDelete.value = null
  isDialogOpen.value = false
}

onMounted(async () => {
  try {
    isLoading.value = true
    await getSubcategories()
  }
  catch (e) {
    console.error(e)
  }
  finally {
    isLoading.value = false
    isMounted.value = true
  }
})
</script>

<template>
  <div>
    <main class="relative mx-auto px-4 py-10 container">
      <Loader v-if="isLoading" class="mx-auto h-10 w-10 color-[#DA3468]" />
      <SubcategoriesList v-if="isMounted && !isLoading" :categories="subcategories" @delete="onDelete" />
    </main>

    <AlertDialog v-if="isDialogOpen" :open="isDialogOpen" @close="onCancelDeleteCategory">
      <AlertDialogContent class="bg-white text-left">
        <AlertDialogHeader>
          <div class="i-tabler-alert-triangle mx-auto h-20 w-20" />
          <AlertDialogTitle class="text-left text-xl color-[#31436F] font-600 -mb-2">
            Deseja excluir a categoria?
          </AlertDialogTitle>
          <AlertDialogDescription>
            <p class="text-left color-[#586893] font-500">
              Essa ação é irreversível e implica na exclusão das subcategorias vinculadas. <br> Os produtos ligados a essa
              categoria não serão excluidos.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter class="flex-row items-center justify-between gap-x-2">
          <AlertDialogCancel
            :disabled="isDeleting"
            as="button"
            class="mt-0 w-full rounded-3xl color-[#DA3468] !bg-[#FFE2EB]"
            @click="onCancelDeleteCategory"
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            :disabled="isDeleting"
            as="button" class="w-full rounded-3xl text-white !bg-[#DA3468]"
            @click="handleDeleteSubcategory"
          >
            Excluir
            <div v-if="isDeleting" class="i-tabler-loader-2 animate-spin color-inherit" />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
