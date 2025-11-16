<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold pink-gradient-text">Tổng quan</h1>
      <a-button type="primary" class="pink-pulse">
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
import { ref, h } from 'vue'
import {
  FileTextOutlined,
  DollarOutlined,
  ShopOutlined,
  UserOutlined,
  ReloadOutlined,
  ArrowUpOutlined
} from '@ant-design/icons-vue'

const stats = ref({
  totalOrders: 1234,
  revenue: 125000000,
  totalProducts: 89,
  totalCustomers: 456
})

const orderColumns = [
  { title: 'Mã đơn', dataIndex: 'code', key: 'code' },
  { title: 'Khách hàng', dataIndex: 'customer', key: 'customer' },
  { title: 'Tổng tiền', dataIndex: 'total', key: 'total' },
  { title: 'Trạng thái', dataIndex: 'status', key: 'status' }
]

const recentOrders = ref([
  { key: '1', code: 'DH001', customer: 'Nguyễn Văn A', total: '5,000,000đ', status: 'Đã xác nhận' },
  { key: '2', code: 'DH002', customer: 'Trần Thị B', total: '8,500,000đ', status: 'Đang xử lý' },
  { key: '3', code: 'DH003', customer: 'Lê Văn C', total: '12,000,000đ', status: 'Hoàn thành' }
])

const quickStats = ref([
  { title: 'Đơn hàng chờ xử lý', value: '12' },
  { title: 'Sản phẩm sắp hết', value: '5' },
  { title: 'Đánh giá mới', value: '23' },
  { title: 'Tin nhắn chưa đọc', value: '8' }
])
</script>
