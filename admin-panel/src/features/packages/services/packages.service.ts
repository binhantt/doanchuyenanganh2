import http from '@/utils/http'
import type { ApiResponse } from '@/types/ApiResponse'
import type { Package, PackageFormData, PackageFilter } from '../types/package.types'

export const packagesService = {
  async getPackages(filters?: PackageFilter): Promise<ApiResponse<Package[]>> {
    const params = new URLSearchParams()
    
    if (filters?.keyword) params.append('keyword', filters.keyword)
    if (filters?.isActive !== undefined) params.append('isActive', String(filters.isActive))
    if (filters?.isPopular !== undefined) params.append('isPopular', String(filters.isPopular))
    if (filters?.minPrice) params.append('minPrice', String(filters.minPrice))
    if (filters?.maxPrice) params.append('maxPrice', String(filters.maxPrice))
    if (filters?.sortBy) params.append('sortBy', filters.sortBy)
    if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder)

    const queryString = params.toString()
    const url = `/user/packages${queryString ? `?${queryString}` : ''}`
    
    return http.get<Package[]>(url)
  },

  async getPackageById(id: string): Promise<ApiResponse<Package>> {
    return http.get<Package>(`/user/packages/${id}`)
  },

  async createPackage(data: PackageFormData): Promise<ApiResponse<Package>> {
    return http.post<Package>('/admin/packages', data)
  },

  async updatePackage(id: string, data: Partial<PackageFormData>): Promise<ApiResponse<Package>> {
    return http.put<Package>(`/admin/packages/${id}`, data)
  },

  async deletePackage(id: string): Promise<ApiResponse<void>> {
    return http.delete<void>(`/admin/packages/${id}`)
  }
}
