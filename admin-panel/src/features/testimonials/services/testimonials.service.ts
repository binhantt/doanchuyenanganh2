import http from '@/utils/http'
import type { Testimonial, TestimonialFormData, TestimonialFilter } from '../types/testimonial.types'

export const testimonialsService = {
  async getTestimonials(filters?: TestimonialFilter) {
    const params = new URLSearchParams()
    
    if (filters?.keyword) params.append('keyword', filters.keyword)
    if (filters?.rating) params.append('rating', filters.rating.toString())
    if (filters?.isActive !== undefined) params.append('isActive', filters.isActive.toString())
    if (filters?.language) params.append('language', filters.language)
    if (filters?.sortBy) params.append('sortBy', filters.sortBy)
    if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder)

    const queryString = params.toString()
    const url = `/admin/testimonials${queryString ? `?${queryString}` : ''}`
    
    return http.get<Testimonial[]>(url)
  },

  async getTestimonialById(id: string) {
    return http.get<Testimonial>(`/admin/testimonials/${id}`)
  },

  async createTestimonial(data: TestimonialFormData) {
    return http.post<Testimonial>('/admin/testimonials', data)
  },

  async updateTestimonial(id: string, data: Partial<TestimonialFormData>) {
    return http.put<Testimonial>(`/admin/testimonials/${id}`, data)
  },

  async deleteTestimonial(id: string) {
    return http.delete<void>(`/admin/testimonials/${id}`)
  }
}
