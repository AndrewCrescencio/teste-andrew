import type { Category } from '@/types/category.type'
import { useMyToast } from '@/composables/useMyToast'
import { SubcategoriesService } from '@/services/SubcategoriesService'

import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'

export const useSubcategoriesStore = defineStore('subcategories', () => {
  const Service = SubcategoriesService()
  const { showToast } = useMyToast()

  const subcategories = ref<Category[]>([])
  const isLoading = ref(false)
  const error = ref<any>()

  async function getSubcategories() {
    error.value = null
    try {
      isLoading.value = true
      const response = await Service.getSubcategories()
      subcategories.value = response
      return response
    }
    catch (err: any) {
      console.error('Error fetching subcategories:', err)
      error.value = err?.message || err || 'Erro ao carregar subcategorias'
      showToast({ title: error.value ?? 'Erro ao carregar subcategorias' })
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  async function postSubcategory(categoryBody: { name: string, parentId: string }) {
    try {
      isLoading.value = true
      const newSubcategory = await Service.postSubcategory(categoryBody)
      if (newSubcategory) {
        const category = subcategories.value.find(category => category.id === categoryBody.parentId)
        if (!category?.hasChildren) {
          category!.hasChildren = true
          category!.children = []
        }
        category?.children?.push(newSubcategory)
        showToast({ title: 'Subcategoria criada com sucesso!' })
        return newSubcategory
      }
    }
    catch (err: any) {
      console.error('Error posting category:', err)
      error.value = err?.message || err || 'Erro ao tentar criar nova subcategoria'
      showToast({ title: error.value ?? 'Erro ao tentar criar nova subcategoria' })
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  async function updateSubcategory(newName: string, id: string) {
    try {
      isLoading.value = true
      const success = await Service.updateSubcategory(newName, id)
      if (success) {
        // NOTE: não sei se é possível ter uma subcategoria sem "parent"
        const category = subcategories.value.find(category => category.id === success.parent!.id)
        const subcategoryUpdated = category!.children!.find(subcategory => subcategory.id === success.id)
        if (subcategoryUpdated) {
          subcategoryUpdated.name = success.name
        }
        showToast({ title: 'Subcategoria atualizada com sucesso!' })
        return success
      }
    }
    catch (err: any) {
      console.error('Error updating category:', err)
      error.value = err?.message || err || 'Erro ao atualizar subcategoria'
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  async function deleteSubcategory(subcategory: Category) {
    try {
      isLoading.value = true
      const success = await Service.deleteSubcategory(subcategory.id)
      if (success) {
        const parentCategoryIndex = subcategories.value.findIndex(category => category.id === subcategory.parent!.id)
        const subcategoryToDelete = subcategories.value[parentCategoryIndex].children!.findIndex(category => category.id === subcategory.id)
        subcategories.value[parentCategoryIndex].children!.splice(subcategoryToDelete, 1)
        showToast({ title: 'Subcategoria excluída com sucesso!' })
        return success
      }
    }
    catch (err: any) {
      console.error('Error deleting category:', err)
      error.value = err?.message || err || 'Erro ao deletar subcategoria'
      showToast({ title: error.value })
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    subcategories,
    isLoading,
    error,
    getSubcategories,
    postSubcategory,
    updateSubcategory,
    deleteSubcategory,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSubcategoriesStore, import.meta.hot))
}
