<template>
  <a-table
    :columns="columns"
    :data-source="consultations"
    :loading="loading"
    row-key="id"
    :pagination="{ pageSize: 10 }"
    :scroll="{ x: 1200 }"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'clientName'">
        <div class="font-semibold">{{ record.clientName }}</div>
        <div class="text-xs text-gray-500">{{ record.clientEmail }}</div>
        <div class="text-xs text-gray-500">{{ record.clientPhone }}</div>
      </template>
      
      <template v-else-if="column.key === 'weddingDate'">
        <div>{{ formatDate(record.weddingDate) }}</div>
        <div class="text-xs text-gray-500">{{ record.guestCount }} khách</div>
      </template>
      
      <template v-else-if="column.key === 'venue'">
        <div class="text-sm">{{ record.venue }}</div>
      </template>
      
      <template v-else-if="column.key === 'serviceType'">
        <a-tag color="purple">{{ record.serviceType }}</a-tag>
      </template>
      
      <template v-else-if="column.key === 'budget'">
        <div class="font-semibold text-pink-600">{{ record.budget }}</div>
      </template>
      
      <template v-else-if="column.key === 'status'">
        <a-select
          :value="record.status"
          style="width: 140px"
          size="small"
          @change="(value) => $emit('update-status', record.id, value)"
        >
          <a-select-option v-for="status in CONSULTATION_STATUS" :key="status.value" :value="status.value">
            <a-tag :color="status.color" style="margin: 0">{{ status.label }}</a-tag>
          </a-select-option>
        </a-select>
      </template>
      
      <template v-else-if="column.key === 'notes'">
        <div class="text-sm text-gray-600 line-clamp-2">{{ record.notes || '-' }}</div>
      </template>
      
      <template v-else-if="column.key === 'actions'">
        <a-space>
          <a-button type="link" size="small" @click="$emit('view', record)">
            <eye-outlined />
          </a-button>
          <a-button type="link" danger size="small" @click="$emit('delete', record.id)">
            <delete-outlined />
          </a-button>
        </a-space>
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import type { Consultation } from '../types/consultation.types'
import { CONSULTATION_STATUS } from '../types/consultation.types'
import { formatDate } from '@/utils/formatDate'

defineProps<{
  consultations: Consultation[]
  loading?: boolean
}>()

defineEmits<{
  view: [consultation: Consultation]
  delete: [id: string]
  'update-status': [id: string, status: string]
}>()

const columns = [
  { title: 'Khách hàng', key: 'clientName', width: 200, fixed: 'left' },
  { title: 'Ngày cưới', key: 'weddingDate', width: 150 },
  { title: 'Địa điểm', key: 'venue', width: 200 },
  { title: 'Dịch vụ', key: 'serviceType', width: 150 },
  { title: 'Ngân sách', key: 'budget', width: 150 },
  { title: 'Trạng thái', key: 'status', width: 150 },
  { title: 'Ghi chú', key: 'notes', width: 200 },
  { title: 'Thao tác', key: 'actions', width: 120, fixed: 'right' }
]
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
