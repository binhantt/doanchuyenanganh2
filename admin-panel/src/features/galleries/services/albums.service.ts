import http from '@/utils/http'
import type { Album, AlbumFormData, AlbumFilter } from '../types/gallery.types'

export const albumsService = {
  async getAlbums(filters?: AlbumFilter) {
    const params = new URLSearchParams()
    
    if (filters?.keyword) params.append('keyword', filters.keyword)
    if (filters?.isActive !== undefined) params.append('isActive', filters.isActive.toString())
    if (filters?.sortBy) params.append('sortBy', filters.sortBy)
    if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder)

    const queryString = params.toString()
    const url = `/admin/galleries/albums${queryString ? `?${queryString}` : ''}`
    
    return http.get<Album[]>(url)
  },

  async getAlbumById(id: string) {
    return http.get<Album>(`/admin/galleries/albums/${id}`)
  },

  async getImagesByAlbum(albumId: string) {
    return http.get<any[]>(`/admin/galleries/albums/${albumId}/images`)
  },

  async createAlbum(data: AlbumFormData) {
    return http.post<Album>('/admin/galleries/albums', data)
  },

  async updateAlbum(id: string, data: Partial<AlbumFormData>) {
    return http.put<Album>(`/admin/galleries/albums/${id}`, data)
  },

  async deleteAlbum(id: string) {
    return http.delete<void>(`/admin/galleries/albums/${id}`)
  }
}


