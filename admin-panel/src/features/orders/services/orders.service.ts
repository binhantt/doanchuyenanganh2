import http from '@/utils/http'
import type { ApiResponse } from '@/types/ApiResponse'
import type { Order, OrderFilter } from '../types/order.types'

export const ordersService = {
  async getOrders(filters?: OrderFilter): Promise<ApiResponse<Order[]>> {
    const params = new URLSearchParams()
    
    if (filters?.keyword) params.append('keyword', filters.keyword)
    if (filters?.status) params.append('status', filters.status)
    if (filters?.paymentMethod) params.append('paymentMethod', filters.paymentMethod)
    if (filters?.startDate) params.append('startDate', filters.startDate)
    if (filters?.endDate) params.append('endDate', filters.endDate)
    if (filters?.sortBy) params.append('sortBy', filters.sortBy)
    if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder)

    const queryString = params.toString()
    const url = `/admin/orders${queryString ? `?${queryString}` : ''}`
    
    return http.get<Order[]>(url)
  },

  async getOrderById(id: string): Promise<ApiResponse<Order>> {
    return http.get<Order>(`/admin/orders/${id}`)
  },

  async updateOrderStatus(id: string, status: string): Promise<ApiResponse<Order>> {
    return http.put<Order>(`/admin/orders/${id}/status`, { status })
  },

  async deleteOrder(id: string): Promise<ApiResponse<void>> {
    return http.delete<void>(`/admin/orders/${id}`)
  }
}
