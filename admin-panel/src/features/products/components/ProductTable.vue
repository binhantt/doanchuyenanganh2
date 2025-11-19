<template>
  <a-table
    :columns="columns"
    :data-source="products"
    :loading="loading"
    :pagination="paginationConfig"
    @change="handleTableChange"
    row-key="id"
    :scroll="{ x: 1200 }"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'images'">
        <a-image
          v-if="record.images && record.images.length > 0"
          :src="record.images[0]"
          :width="60"
          :height="60"
          class="rounded object-cover"
        />
        <span v-else class="text-gray-400">Không có ảnh</span>
      </template>
      
      <template v-else-if="column.key === 'price'">
        <span class="text-pinkPrimary font-semibold">
          {{ formatCurrency(record.price) }}
        </span>
      </template>
      
      <template v-else-if="column.key === 'category'">
        <a-tag color="purple">{{ getCategoryLabel(record.category) }}</a-tag>
      </template>
      
      <template v-else-if="column.key === 'isActive'">
        <a-tag 
          :color="record.isActive ? 'success' : 'error'"
          class="cursor-pointer"
          @click="$emit('toggle-status', record.id)"
        >
          {{ record.isActive ? 'Hoạt động' : 'Không hoạt động' }}
        </a-tag>
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
import { formatCurrency } from '@/utils/formatDate'
import type { Product } from '../types/product.types'
import type { Pagination } from '@/types/Pagination'
import { PRODUCT_CATEGORIES as categories } from '../types/product.types'

const props = defineProps<{
  products: Product[]
  loading?: boolean
  pagination: Pagination
}>()

const emit = defineEmits<{
  edit: [product: Product]
  delete: [id: string]
  'toggle-status': [id: string]
  'page-change': [page: number, pageSize: number]
}>()

const columns = [
  { title: 'Ảnh', key: 'images', width: 100 },
  { title: 'Tên sản phẩm', dataIndex: 'name', key: 'name', width: 250 },
  { title: 'Danh mục', key: 'category', width: 150 },
  { title: 'Giá', key: 'price', width: 150 },
  { title: 'Trạng thái', key: 'isActive', width: 150 },
  { title: 'Thao tác', key: 'actions', width: 120, fixed: 'right' }
]

const getCategoryLabel = (value: string) => {
  const category = categories.find(c => c.value === value)
  return category?.label || value
}

const paginationConfig = computed(() => ({
  current: props.pagination.page,
  pageSize: props.pagination.limit,
  total: props.pagination.total,
  showSizeChanger: true,
  showTotal: (total: number) => `Tổng ${total} sản phẩm`
}))

const handleTableChange = (pagination: any) => {
  emit('page-change', pagination.current, pagination.pageSize)
}
</script>
