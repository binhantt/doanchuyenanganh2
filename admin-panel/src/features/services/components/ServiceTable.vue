<template>
  <a-table
    :columns="columns"
    :data-source="services"
    :loading="loading"
    :pagination="paginationConfig"
    @change="handleTableChange"
    row-key="id"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'icon'">
        <a-tag color="pink">{{ record.icon }}</a-tag>
      </template>
      
      <template v-else-if="column.key === 'basePrice'">
        <span class="text-pinkPrimary font-semibold">
          {{ formatCurrency(record.basePrice) }}
        </span>
      </template>
      
      <template v-else-if="column.key === 'features'">
        <a-tag v-for="(feature, index) in record.features.slice(0, 2)" :key="index" color="pink">
          {{ feature }}
        </a-tag>
        <a-tag v-if="record.features.length > 2" color="default">
          +{{ record.features.length - 2 }}
        </a-tag>
      </template>
      
      <template v-else-if="column.key === 'isActive'">
        <a-switch
          :checked="record.isActive"
          @change="$emit('toggle-status', record.id)"
        />
      </template>
      
      <template v-else-if="column.key === 'createdAt'">
        {{ formatDate(record.createdAt) }}
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
import type { Service } from '../types/service.types'
import type { Pagination } from '@/types/Pagination'

const props = defineProps<{
  services: Service[]
  loading?: boolean
  pagination: Pagination
}>()

const emit = defineEmits<{
  edit: [service: Service]
  delete: [id: string]
  'toggle-status': [id: string]
  'page-change': [page: number, pageSize: number]
}>()

const columns = [
  { title: 'Tên dịch vụ', dataIndex: 'name', key: 'name', width: 200 },
  { title: 'Slug', dataIndex: 'slug', key: 'slug', width: 150 },
  { title: 'Icon', key: 'icon', width: 100 },
  { title: 'Giá cơ bản', key: 'basePrice', width: 150 },
  { title: 'Tính năng', key: 'features', width: 200 },
  { title: 'Trạng thái', key: 'isActive', width: 120 },
  { title: 'Ngày tạo', key: 'createdAt', width: 150 },
  { title: 'Thao tác', key: 'actions', width: 120, fixed: 'right' }
]

const paginationConfig = computed(() => ({
  current: props.pagination.page,
  pageSize: props.pagination.limit,
  total: props.pagination.total,
  showSizeChanger: true,
  showTotal: (total: number) => `Tổng ${total} dịch vụ`
}))

const handleTableChange = (pagination: any) => {
  emit('page-change', pagination.current, pagination.pageSize)
}
</script>
