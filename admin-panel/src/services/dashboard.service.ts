import http from '@/utils/http'
import type { ApiResponse } from '@/types/ApiResponse'

export interface DashboardStats {
  totalOrders: number
  revenue: number
  totalProducts: number
  totalCustomers: number
}

export interface QuickStats {
  pendingOrders: number
  inactiveProducts: number
}

export interface RecentOrder {
  id: string
  code: string
  customer: string
  email: string
  total: number
  status: string
  createdAt: string
}

export interface DashboardData {
  stats: DashboardStats
  quickStats: QuickStats
  recentOrders: RecentOrder[]
}

export const dashboardService = {
  async getStats() {
    return http.get<DashboardData>('/admin/dashboard/stats')
  }
}
