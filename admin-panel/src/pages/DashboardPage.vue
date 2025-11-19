<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold pink-gradient-text">Tổng quan</h1>
      <a-button type="primary" class="pink-pulse" @click="handleRefresh" :loading="loading">
        <reload-outlined /> Làm mới
      </a-button>
    </div>
    
    <a-row :gutter="16" class="mb-6">
      <a-col :xs="24" :sm="12" :lg="6">
        <a-card class="pink-shadow hover:scale-105 transition-transform">
          <a-statistic
            title="Tổng đơn hàng"
            :value="stats.totalOrders"
            :prefix="h(FileTextOutlined)"
            :value-style="{ color: '#FF4D8A', fontSize: '24px', fontWeight: 'bold' }"
          />
          <div class="mt-2 text-xs text-gray-500">
            <arrow-up-outlined class="text-green-500" /> +12% so với tháng trước
          </div>
        </a-card>
      </a-col>
      
      <a-col :xs="24" :sm="12" :lg="6">
        <a-card class="pink-shadow hover:scale-105 transition-transform">
          <a-statistic
            title="Doanh thu"
            :value="stats.revenue"
            :prefix="h(DollarOutlined)"
            suffix="đ"
            :value-style="{ color: '#D93672', fontSize: '24px', fontWeight: 'bold' }"
          />
          <div class="mt-2 text-xs text-gray-500">
            <arrow-up-outlined class="text-green-500" /> +8% so với tháng trước
          </div>
        </a-card>
      </a-col>
      
      <a-col :xs="24" :sm="12" :lg="6">
        <a-card class="pink-shadow hover:scale-105 transition-transform">
          <a-statistic
            title="Sản phẩm"
            :value="stats.totalProducts"
            :prefix="h(ShopOutlined)"
            :value-style="{ color: '#FF6B9D', fontSize: '24px', fontWeight: 'bold' }"
          />
          <div class="mt-2 text-xs text-gray-500">
            <arrow-up-outlined class="text-green-500" /> +5 sản phẩm mới
          </div>
        </a-card>
      </a-col>
      
      <a-col :xs="24" :sm="12" :lg="6">
        <a-card class="pink-shadow hover:scale-105 transition-transform">
          <a-statistic
            title="Khách hàng"
            :value="stats.totalCustomers"
            :prefix="h(UserOutlined)"
            :value-style="{ color: '#FFB3CF', fontSize: '24px', fontWeight: 'bold' }"
          />
          <div class="mt-2 text-xs text-gray-500">
            <arrow-up-outlined class="text-green-500" /> +23 khách hàng mới
          </div>
        </a-card>
      </a-col>
    </a-row>
    
    <a-row :gutter="16">
      <a-col :xs="24" :lg="16">
        <a-card title="Đơn hàng gần đây" class="mb-4">
          <a-table
            :columns="orderColumns"
            :data-source="recentOrders"
            :pagination="false"
            :loading="loading"
            :row-key="(record: any) => record.id"
          />
        </a-card>
      </a-col>
      
      <a-col :xs="24" :lg="8">
        <a-card title="Thống kê nhanh">
          <a-list :data-source="quickStats" size="small">
            <template #renderItem="{ item }">
              <a-list-item>
                <a-list-item-meta :title="item.title">
                  <template #description>{{ item.value }}</template>
                </a-list-item-meta>
              </a-list-item>
            </template>
          </a-list>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref, h, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import {
  FileTextOutlined,
  DollarOutlined,
  ShopOutlined,
  UserOutlined,
  ReloadOutlined,
  ArrowUpOutlined
} from '@ant-design/icons-vue'
import { dashboardService, type DashboardStats, type RecentOrder } from '@/services/dashboard.service'

const loading = ref(false)

const stats = ref<DashboardStats>({
  totalOrders: 0,
  revenue: 0,
  totalProducts: 0,
  totalCustomers: 0
})

const orderColumns = [
  { title: 'Mã đơn', dataIndex: 'code', key: 'code' },
  { title: 'Khách hàng', dataIndex: 'customer', key: 'customer' },
  { 
    title: 'Tổng tiền', 
    dataIndex: 'total', 
    key: 'total',
    customRender: ({ text }: any) => formatCurrency(text)
  },
  { 
    title: 'Trạng thái', 
    dataIndex: 'status', 
    key: 'status',
    customRender: ({ text }: any) => getStatusLabel(text)
  }
]

const recentOrders = ref<RecentOrder[]>([])

const quickStats = ref([
  { title: 'Đơn hàng chờ xử lý', value: '0' },
  { title: 'Sản phẩm sắp hết', value: '0' }
])

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(value)
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pending: 'Chờ xác nhận',
    confirmed: 'Đã xác nhận',
    paid: 'Đã thanh toán',
    completed: 'Hoàn thành',
    cancelled: 'Đã hủy'
  }
  return labels[status] || status
}

const fetchDashboardData = async () => {
  loading.value = true
  try {
    const response = await dashboardService.getStats()
    if (response.data) {
      stats.value = response.data.stats
      recentOrders.value = response.data.recentOrders
      quickStats.value = [
        { title: 'Đơn hàng chờ xử lý', value: response.data.quickStats.pendingOrders.toString() },
        { title: 'Sản phẩm không hoạt động', value: response.data.quickStats.inactiveProducts.toString() }
      ]
    }
  } catch (error: any) {
    message.error(error.message || 'Không thể tải dữ liệu dashboard')
  } finally {
    loading.value = false
  }
}

const handleRefresh = () => {
  fetchDashboardData()
}

onMounted(() => {
  fetchDashboardData()
})
</script>
