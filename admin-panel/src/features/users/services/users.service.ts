import http from '@/utils/http'
import type { ApiResponse } from '@/types/ApiResponse'
import type { User, UserFormData, UserFilter } from '../types/user.types'

export const usersService = {
  async getUsers(filters?: UserFilter): Promise<ApiResponse<User[]>> {
    const params = new URLSearchParams()
    
    if (filters?.keyword) params.append('keyword', filters.keyword)
    if (filters?.role) params.append('role', filters.role)
    if (filters?.isActive !== undefined) params.append('isActive', String(filters.isActive))
    if (filters?.sortBy) params.append('sortBy', filters.sortBy)
    if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder)

    const queryString = params.toString()
    const url = `/admin/users${queryString ? `?${queryString}` : ''}`
    
    return http.get<User[]>(url)
  },

  async getUserById(id: string): Promise<ApiResponse<User>> {
    return http.get<User>(`/admin/users/${id}`)
  },

  async createUser(data: UserFormData): Promise<ApiResponse<User>> {
    return http.post<User>('/admin/users', data)
  },

  async updateUser(id: string, data: Partial<UserFormData>): Promise<ApiResponse<User>> {
    return http.put<User>(`/admin/users/${id}`, data)
  },

  async toggleUserStatus(id: string): Promise<ApiResponse<User>> {
    return http.put<User>(`/admin/users/${id}/toggle-status`, {})
  },

  async deleteUser(id: string): Promise<ApiResponse<void>> {
    return http.delete<void>(`/admin/users/${id}`)
  }
}
