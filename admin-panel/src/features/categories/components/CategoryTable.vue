<template>
  <a-table
    :columns="columns"
    :data-source="categories"
    :loading="loading"
    :pagination="paginationConfig"
    @change="handleTableChange"
    row-key="id"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'image'">
        <a-image
          v-if="record.image"
          :src="record.image"
          :width="60"
          :height="60"
          class="rounded object-cover"
        />
        <span v-else class="text-gray-400">Không có ảnh</span>
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
import { formatDate } from '@/utils/formatDate'
import type { Category } from '../types/category.types'
import type { Pagination } from '@/types/Pagination'

const props = defineProps<{
  categories: Category[]
  loading?: boolean
  pagination: Pagination
}>()

const emit = defineEmits<{
  edit: [category: Category]
  delete: [id: number]
  'toggle-status': [id: number]
  'page-change': [page: number, pageSize: number]
}>()

const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
  { title: 'Ảnh', key: 'image', width: 100 },
  { title: 'Tên danh mục', dataIndex: 'name', key: 'name' },
  { title: 'Mô tả', dataIndex: 'description', key: 'description', ellipsis: true },
  { title: 'Trạng thái', key: 'isActive', width: 120 },
  { title: 'Ngày tạo', key: 'createdAt', width: 150 },
  { title: 'Thao tác', key: 'actions', width: 120, fixed: 'right' }
]

const paginationConfig = computed(() => ({
  current: props.pagination.page,
  pageSize: props.pagination.limit,
  total: props.pagination.total,
  showSizeChanger: true,
  showTotal: (total: number) => `Tổng ${total} bản ghi`
}))

const handleTableChange = (pagination: any) => {
  emit('page-change', pagination.current, pagination.pageSize)
}
</script>
