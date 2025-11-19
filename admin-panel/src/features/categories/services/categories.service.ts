import http from '@/utils/http'
import type { Category, CategoryFormData, CategoryFilter } from '../types/category.types'
import type { ApiResponse } from '@/types/ApiResponse'

export const categoriesService = {
  async getCategories(params?: CategoryFilter): Promise<ApiResponse<Category[]>> {
    return http.get('/admin/categories', { params })
  },

  async getCategoryById(id: number): Promise<ApiResponse<Category>> {
    return http.get(`/admin/categories/${id}`)
  },

  async getCategoryBySlug(slug: string): Promise<ApiResponse<Category>> {
    return http.get(`/admin/categories/slug/${slug}`)
  },

  async createCategory(data: CategoryFormData): Promise<ApiResponse<Category>> {
    return http.post('/admin/categories', data)
  },

  async updateCategory(id: number, data: Partial<CategoryFormData>): Promise<ApiResponse<Category>> {
    return http.put(`/admin/categories/${id}`, data)
  },

  async deleteCategory(id: number): Promise<ApiResponse<void>> {
    return http.delete(`/admin/categories/${id}`)
  }
}
