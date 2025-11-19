import http from '@/utils/http'
import type { Product, ProductFormData, ProductFilter } from '../types/product.types'
import type { ApiResponse } from '@/types/ApiResponse'

export const productsService = {
  async getProducts(params?: ProductFilter): Promise<ApiResponse<Product[]>> {
    return http.get('/admin/products', { params })
  },

  async getProductById(id: string): Promise<ApiResponse<Product>> {
    return http.get(`/admin/products/${id}`)
  },

  async getProductBySlug(slug: string): Promise<ApiResponse<Product>> {
    return http.get(`/admin/products/slug/${slug}`)
  },

  async createProduct(data: ProductFormData): Promise<ApiResponse<Product>> {
    return http.post('/admin/products', data)
  },

  async updateProduct(id: string, data: Partial<ProductFormData>): Promise<ApiResponse<Product>> {
    return http.put(`/admin/products/${id}`, data)
  },

  async updateStock(id: string, quantity: number): Promise<ApiResponse<Product>> {
    return http.put(`/admin/products/${id}/stock`, { stockQuantity: quantity })
  },

  async deleteProduct(id: string): Promise<ApiResponse<void>> {
    return http.delete(`/admin/products/${id}`)
  }
}
