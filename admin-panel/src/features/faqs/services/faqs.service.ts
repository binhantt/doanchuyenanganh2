import http from '@/utils/http'
import type { FAQ, FAQFormData, FAQFilter } from '../types/faq.types'

export const faqsService = {
  async getFAQs(filters?: FAQFilter) {
    const params = new URLSearchParams()
    
    if (filters?.keyword) params.append('keyword', filters.keyword)
    if (filters?.category) params.append('category', filters.category)
    if (filters?.isActive !== undefined) params.append('isActive', filters.isActive.toString())
    if (filters?.sortBy) params.append('sortBy', filters.sortBy)
    if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder)

    const queryString = params.toString()
    const url = `/admin/faqs${queryString ? `?${queryString}` : ''}`
    
    return http.get<FAQ[]>(url)
  },

  async getFAQById(id: string) {
    return http.get<FAQ>(`/admin/faqs/${id}`)
  },

  async createFAQ(data: FAQFormData) {
    return http.post<FAQ>('/admin/faqs', data)
  },

  async updateFAQ(id: string, data: Partial<FAQFormData>) {
    return http.put<FAQ>(`/admin/faqs/${id}`, data)
  },

  async deleteFAQ(id: string) {
    return http.delete<void>(`/admin/faqs/${id}`)
  }
}
