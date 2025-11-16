import http from '@/utils/http'
import type { Category, CategoryFormData, CategoryFilter } from '../types/category.types'
import type { PaginatedResponse } from '@/types/ApiResponse'
import type { PaginationParams } from '@/types/Pagination'

export const categoriesService = {
  async getCategories(params?: PaginationParams & CategoryFilter): Promise<PaginatedResponse<Category>> {
    return http.get('/admin/categories', { params })
  },

  async getCategoryById(id: number): Promise<Category> {
    const response = await http.get(`/admin/categories/${id}`)
    return response.data
  },

  async createCategory(data: CategoryFormData): Promise<Category> {
    const response = await http.post('/admin/categories', data)
    return response.data
  },

  async updateCategory(id: number, data: CategoryFormData): Promise<Category> {
    const response = await http.put(`/admin/categories/${id}`, data)
    return response.data
  },

  async deleteCategory(id: number): Promise<void> {
    await http.delete(`/admin/categories/${id}`)
  },

  async toggleStatus(id: number): Promise<Category> {
    const response = await http.patch(`/admin/categories/${id}/toggle-status`)
    return response.data
  }
}
