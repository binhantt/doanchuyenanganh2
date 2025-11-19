import http from '@/utils/http'
import type { Gallery, GalleryFormData, GalleryFilter } from '../types/gallery.types'

export const galleriesService = {
  async getGalleries(filters?: GalleryFilter) {
    const params = new URLSearchParams()
    
    if (filters?.keyword) params.append('keyword', filters.keyword)
    if (filters?.relatedType) params.append('relatedType', filters.relatedType)
    if (filters?.isActive !== undefined) params.append('isActive', filters.isActive.toString())
    if (filters?.sortBy) params.append('sortBy', filters.sortBy)
    if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder)

    const queryString = params.toString()
    const url = `/admin/galleries${queryString ? `?${queryString}` : ''}`
    
    return http.get<Gallery[]>(url)
  },

  async getGalleryById(id: string) {
    return http.get<Gallery>(`/admin/galleries/${id}`)
  },

  async createGallery(data: GalleryFormData) {
    return http.post<Gallery>('/admin/galleries', data)
  },

  async updateGallery(id: string, data: Partial<GalleryFormData>) {
    return http.put<Gallery>(`/admin/galleries/${id}`, data)
  },

  async deleteGallery(id: string) {
    return http.delete<void>(`/admin/galleries/${id}`)
  },

  async setPrimary(id: string) {
    return http.put<Gallery>(`/admin/galleries/${id}/primary`, {})
  }
}
