<template>
  <a-table
    :columns="columns"
    :data-source="promotions"
    :loading="loading"
    :pagination="paginationConfig"
    @change="handleTableChange"
    row-key="id"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'code'">
        <a-tag color="pink" class="font-mono font-bold">{{ record.code }}</a-tag>
      </template>

      <template v-else-if="column.key === 'discount'">
        <div class="text-pinkPrimary font-semibold">
          <span v-if="record.discountType === 'percentage'">
            {{ record.discountValue }}%
            <span v-if="record.maxDiscount" class="text-xs text-gray-500">
              (max {{ formatCurrency(record.maxDiscount) }})
            </span>
          </span>
          <span v-else>
            {{ formatCurrency(record.discountValue) }}
          </span>
        </div>
      </template>

      <template v-else-if="column.key === 'minOrder'">
        <span v-if="record.minOrderAmount" class="text-sm">
          {{ formatCurrency(record.minOrderAmount) }}
        </span>
        <span v-else class="text-gray-400">Không giới hạn</span>
      </template>

      <template v-else-if="column.key === 'period'">
        <div class="text-sm">
          <div>{{ formatDate(record.startDate, 'DD/MM/YYYY') }}</div>
          <div class="text-gray-500">đến {{ formatDate(record.endDate, 'DD/MM/YYYY') }}</div>
        </div>
      </template>

      <template v-else-if="column.key === 'status'">
        <a-tag :color="getStatusColor(record)">
          {{ getStatusText(record) }}
        </a-tag>
      </template>

      <template v-else-if="column.key === 'isActive'">
        <a-switch
          :checked="record.isActive"
          @change="$emit('toggle-status', record.id)"
        />
      </template>

      <template v-else-if="column.key === 'actions'">
        <a-space>
          <icon-button
            :icon="EditOutlined"
            type="primary"
            @click="$emit('edit', record)"
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
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import IconButton from '@/components/common/button/IconButton.vue'
import { formatDate, formatCurrency } from '@/utils/formatDate'
import type { Promotion } from '../types/promotion.types'
import type { Pagination } from '@/types/Pagination'
import dayjs from 'dayjs'

const props = defineProps<{
  promotions: Promotion[]
  loading?: boolean
  pagination: Pagination
}>()

const emit = defineEmits<{
  edit: [promotion: Promotion]
  delete: [id: string]
  'toggle-status': [id: string]
  'page-change': [page: number, pageSize: number]
}>()

const columns = [
  { title: 'Mã', key: 'code', width: 150 },
  { title: 'Tiêu đề', dataIndex: 'title', key: 'title', width: 200 },
  { title: 'Giảm giá', key: 'discount', width: 150 },
  { title: 'Đơn tối thiểu', key: 'minOrder', width: 150 },
  { title: 'Thời gian', key: 'period', width: 180 },
  { title: 'Trạng thái', key: 'status', width: 120 },
  { title: 'Kích hoạt', key: 'isActive', width: 100 },
  { title: 'Thao tác', key: 'actions', width: 120, fixed: 'right' }
]

const paginationConfig = computed(() => ({
  current: props.pagination.page,
  pageSize: props.pagination.limit,
  total: props.pagination.total,
  showSizeChanger: true,
  showTotal: (total: number) => `Tổng ${total} mã giảm giá`
}))

const getStatusColor = (promotion: Promotion) => {
  const now = dayjs()
  const start = dayjs(promotion.startDate)
  const end = dayjs(promotion.endDate)

  if (!promotion.isActive) return 'default'
  if (now.isBefore(start)) return 'blue'
  if (now.isAfter(end)) return 'red'
  return 'green'
}

const getStatusText = (promotion: Promotion) => {
  const now = dayjs()
  const start = dayjs(promotion.startDate)
  const end = dayjs(promotion.endDate)

  if (!promotion.isActive) return 'Tắt'
  if (now.isBefore(start)) return 'Sắp diễn ra'
  if (now.isAfter(end)) return 'Đã hết hạn'
  return 'Đang diễn ra'
}

const handleTableChange = (pagination: any) => {
  emit('page-change', pagination.current, pagination.pageSize)
}
</script>
