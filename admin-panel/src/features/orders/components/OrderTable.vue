<template>
  <a-table
    :columns="columns"
    :data-source="orders"
    :loading="loading"
    :pagination="paginationConfig"
    @change="handleTableChange"
    row-key="id"
    :scroll="{ x: 1400 }"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'clientInfo'">
        <div>
          <div class="font-semibold">{{ record.clientName }}</div>
          <div class="text-xs text-gray-500">{{ record.clientPhone }}</div>
        </div>
      </template>
      
      <template v-else-if="column.key === 'weddingDate'">
        {{ formatDate(record.weddingDate) }}
      </template>
      
      <template v-else-if="column.key === 'totalAmount'">
        <div>
          <div class="font-semibold">{{ formatCurrency(record.finalAmount) }}</div>
          <div v-if="record.discountAmount > 0" class="text-xs text-gray-500 line-through">
            {{ formatCurrency(record.totalAmount) }}
          </div>
        </div>
      </template>
      
      <template v-else-if="column.key === 'status'">
        <a-select
          :value="record.status"
          @change="(value) => $emit('update-status', record.id, value)"
          style="width: 140px"
        >
          <a-select-option v-for="status in ORDER_STATUS" :key="status.value" :value="status.value">
            <a-tag :color="status.color">{{ status.label }}</a-tag>
          </a-select-option>
        </a-select>
      </template>
      
      <template v-else-if="column.key === 'actions'">
        <a-space>
          <icon-button
            :icon="EyeOutlined"
            type="primary"
            @click="$emit('view', record)"
          />
          <icon-button
            :icon="PrinterOutlined"
            @click="$emit('print', record)"
            title="In hóa đơn"
          />
          <icon-button
            :icon="DeleteOutlined"
            danger
            @click="$emit('delete', record.id)"
          />
        </a-space>
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { EyeOutlined, DeleteOutlined, PrinterOutlined } from '@ant-design/icons-vue'
import IconButton from '@/components/common/button/IconButton.vue'
import { formatCurrency, formatDate } from '@/utils/formatDate'
import type { Order, ORDER_STATUS } from '../types/order.types'
import { ORDER_STATUS as STATUS_LIST } from '../types/order.types'
import type { Pagination } from '@/types/Pagination'

const ORDER_STATUS = STATUS_LIST

const props = defineProps<{
  orders: Order[]
  loading?: boolean
  pagination: Pagination
}>()

const emit = defineEmits<{
  view: [order: Order]
  print: [order: Order]
  delete: [id: string]
  'update-status': [id: string, status: string]
  'page-change': [page: number, pageSize: number]
}>()

const columns = [
  { title: 'Khách hàng', key: 'clientInfo', width: 180 },
  { title: 'Ngày cưới', key: 'weddingDate', width: 120 },
  { title: 'Địa điểm', dataIndex: 'venue', key: 'venue', width: 200 },
  { title: 'Số khách', dataIndex: 'guestCount', key: 'guestCount', width: 100 },
  { title: 'Tổng tiền', key: 'totalAmount', width: 150 },
  { title: 'Trạng thái', key: 'status', width: 160 },
  { title: 'Thao tác', key: 'actions', width: 150, fixed: 'right' }
]

const paginationConfig = computed(() => ({
  current: props.pagination.page,
  pageSize: props.pagination.limit,
  total: props.pagination.total,
  showSizeChanger: true,
  showTotal: (total: number) => `Tổng ${total} đơn hàng`
}))

const handleTableChange = (pagination: any) => {
  emit('page-change', pagination.current, pagination.pageSize)
}
</script>
