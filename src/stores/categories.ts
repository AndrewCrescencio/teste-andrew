import type { Category } from '@/types/category.type'
import { useMyToast } from '@/composables/useMyToast'
import { CategoriesService } from '@/services/categoriesService'
import { acceptHMRUpdate, defineStore } from 'pinia'

import { computed, ref } from 'vue'

export const useCategoriesStore = defineStore('categories', () => {
  const categoriesService = CategoriesService()
  const { showToast } = useMyToast()

  const categories = ref<Category[]>([])
  const hasChildren = (category: Category) => category.hasChildren
  const categoriesWithSubcategories = computed(() => categories.value.filter(hasChildren))
  const isLoading = ref(false)
  const error = ref()

  async function getCategories() {
    isLoading.value = true
    error.value = null
    try {
      const response = await categoriesService.fetchCategories()
      categories.value = response
    }
    catch (err: any) {
      console.error('Error fetching categories:', err)
      error.value = err?.message || err || 'Erro ao carregar categorias'
      showToast({ title: error.value })
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  async function postCategory(categoryBody: { name: string }) {
    isLoading.value = true
    try {
      const response = await categoriesService.postCategory(categoryBody)
      if (response) {
        showToast({ title: 'Categoria criada com sucesso!' })
        categories.value.push(response)
        return response
      }
    }
    catch (err: any) {
      console.error('Error posting category:', err)
      error.value = err?.message || err || 'Erro ao criar categoria'
      showToast({ title: error.value })
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  async function updateCategory(newName: string, id: string) {
    try {
      isLoading.value = true
      const success = await categoriesService.updateCategory(newName, id)
      if (success) {
        showToast({ title: 'Categoria editada com sucesso!' })
        const category = categories.value.find(category => category.id === id)
        if (category) {
          category.name = newName
        }
        return success
      }
    }
    catch (err: any) {
      error.value = err?.message || err || 'Erro ao atualizar categoria'
      if (err?.message === 'Category already exists') {
        showToast({ title: 'Uma categoria com esse nome já existe!' })
      }
      else {
        showToast({ title: error.value })
      }
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  async function deleteCategory(category: Category) {
    try {
      isLoading.value = true
      const success = await categoriesService.deleteCategory(category.id)
      if (success) {
        showToast({ title: 'Categoria excluída com sucesso!' })
        categories.value = categories.value.filter(item => item.id !== category.id)
        return success
      }
    }
    catch (err: any) {
      console.error('Error deleting category:', err)
      error.value = err?.message || err || 'Erro ao excluir categoria'
      showToast({ title: error.value })
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    categories,
    isLoading,
    error,
    getCategories,
    postCategory,
    updateCategory,
    deleteCategory,
    categoriesWithSubcategories,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCategoriesStore, import.meta.hot))
}
