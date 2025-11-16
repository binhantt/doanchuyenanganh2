import http from '@/utils/http'
import type { Service, ServiceFormData, ServiceFilter } from '../types/service.types'
import type { ApiResponse } from '@/types/ApiResponse'

export const servicesService = {
  async getServices(params?: ServiceFilter): Promise<ApiResponse<Service[]>> {
    return http.get('/admin/services', { params })
  },

  async getServiceById(id: string): Promise<ApiResponse<Service>> {
    return http.get(`/admin/services/${id}`)
  },

  async getServiceBySlug(slug: string): Promise<ApiResponse<Service>> {
    return http.get(`/admin/services/slug/${slug}`)
  },

  async createService(data: ServiceFormData): Promise<ApiResponse<Service>> {
    return http.post('/admin/services', data)
  },

  async updateService(id: string, data: Partial<ServiceFormData>): Promise<ApiResponse<Service>> {
    return http.put(`/admin/services/${id}`, data)
  },

  async deleteService(id: string): Promise<ApiResponse<void>> {
    return http.delete(`/admin/services/${id}`)
  }
}
