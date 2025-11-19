import http from '@/utils/http'
import type { Consultation, ConsultationFilter } from '../types/consultation.types'

export const consultationsService = {
  async getConsultations(filters?: ConsultationFilter) {
    const params = new URLSearchParams()
    
    if (filters?.keyword) params.append('keyword', filters.keyword)
    if (filters?.status) params.append('status', filters.status)
    if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom)
    if (filters?.dateTo) params.append('dateTo', filters.dateTo)
    if (filters?.sortBy) params.append('sortBy', filters.sortBy)
    if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder)

    const queryString = params.toString()
    const url = `/admin/consultations${queryString ? `?${queryString}` : ''}`
    
    return http.get<Consultation[]>(url)
  },

  async getConsultationById(id: string) {
    return http.get<Consultation>(`/admin/consultations/${id}`)
  },

  async updateConsultationStatus(id: string, status: string) {
    return http.put<Consultation>(`/admin/consultations/${id}`, { status })
  },

  async deleteConsultation(id: string) {
    return http.delete<void>(`/admin/consultations/${id}`)
  }
}
