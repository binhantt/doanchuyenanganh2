import http from '@/utils/http'
import type { Promotion, PromotionFormData, PromotionFilter } from '../types/promotion.types'
import type { ApiResponse } from '@/types/ApiResponse'

export const promotionsService = {
  async getPromotions(params?: PromotionFilter): Promise<ApiResponse<Promotion[]>> {
    return http.get('/admin/vouchers', { params })
  },

  async getPromotionById(id: string): Promise<ApiResponse<Promotion>> {
    return http.get(`/admin/vouchers/${id}`)
  },

  async getPromotionByCode(code: string): Promise<ApiResponse<Promotion>> {
    return http.get(`/admin/vouchers/${code}`)
  },

  async createPromotion(data: PromotionFormData): Promise<ApiResponse<Promotion>> {
    return http.post('/admin/vouchers', data)
  },

  async updatePromotion(id: string, data: Partial<PromotionFormData>): Promise<ApiResponse<Promotion>> {
    return http.put(`/admin/vouchers/${id}`, data)
  },

  async deletePromotion(id: string): Promise<ApiResponse<void>> {
    return http.delete(`/admin/vouchers/${id}`)
  }
}
