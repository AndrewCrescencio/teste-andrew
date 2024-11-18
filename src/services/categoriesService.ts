import type { Category } from '@/types/category.type'
import apiInstance from './api'

export function CategoriesService() {
  async function fetchCategories(): Promise<Category[]> {
    return apiInstance.get('/categories')
  }

  async function postCategory(categoryBody: { name: string }): Promise<Category | null> {
    const category: Category = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      name: categoryBody.name,
      // TODO: verifica parent - talvez seja possível usar postCategory para também criar subcategorias
      // parent: undefined,
      hasChildren: false,
      children: [],
    }
    return apiInstance.post('/categories', category)
  }

  async function updateCategory(newName: string, id: string): Promise<boolean> {
    return apiInstance.patch(`/categories/${id}`, {
      name: newName,
    })
  }

  async function deleteCategory(id: string) {
    return apiInstance.delete(`/categories/${id}?forceDeleteTree=true`)
  }

  return {
    fetchCategories,
    postCategory,
    updateCategory,
    deleteCategory,
  }
}
