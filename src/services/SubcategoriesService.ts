import type { Category } from '@/types/category.type'
import apiInstance from './api'
import { CategoriesService } from './categoriesService'

export function SubcategoriesService() {
  const categoriesService = CategoriesService()
  async function getSubcategories() {
    try {
      const categories = await categoriesService.fetchCategories()

      for (const category of categories) {
        if (category.hasChildren) {
          const subcategories = await getSubcategoriesFromParentCategory(category.id)
          category.children = subcategories
        }
      }

      return categories
    }
    catch (error) {
      console.error('Error fetching categories with subcategories:', error)
      throw error
    }
  }

  async function getSubcategoriesFromParentCategory(parentCategoryId: string): Promise<Category[]> {
    return apiInstance.get(`/categories?parentCategoryId=${parentCategoryId}`)
  }

  async function postSubcategory(subcategoryBody: { name: string, parentId: string }): Promise<Category | null> {
    const subcategory = {
      name: subcategoryBody.name,
      parent: {
        id: subcategoryBody.parentId,
      },
    }
    return apiInstance.post('/categories', subcategory)
  }

  async function updateSubcategory(newName: string, id: string): Promise<Category | null> {
    return apiInstance.patch(`/categories/${id}`, {
      name: newName,
    })
  }

  async function deleteSubcategory(id: string) {
    // TODO: checar if hasChildren
    return apiInstance.delete(`/categories/${id}?forceDeleteTree=true`)
  }

  return {
    getSubcategories,
    postSubcategory,
    updateSubcategory,
    deleteSubcategory,
  }
}
