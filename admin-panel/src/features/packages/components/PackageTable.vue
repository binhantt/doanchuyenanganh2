<template>
  <a-table
    :columns="columns"
    :data-source="packages"
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
      
      <template v-else-if="column.key === 'isPopular'">
        <a-tag :color="record.isPopular ? 'gold' : 'default'">
          {{ record.isPopular ? 'Phổ biến' : 'Thường' }}
        </a-tag>
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
import type { Package } from '../types/package.types'
import type { Pagination } from '@/types/Pagination'

const props = defineProps<{
  packages: Package[]
  loading?: boolean
  pagination: Pagination
}>()

const emit = defineEmits<{
  edit: [pkg: Package]
  delete: [id: string]
  'toggle-status': [id: string]
  'page-change': [page: number, pageSize: number]
}>()

const columns = [
  { title: 'Ảnh', key: 'images', width: 100 },
  { title: 'Tên gói', dataIndex: 'name', key: 'name', width: 250 },
  { title: 'Giá', key: 'price', width: 150 },
  { title: 'Phổ biến', key: 'isPopular', width: 120 },
  { title: 'Trạng thái', key: 'isActive', width: 150 },
  { title: 'Thao tác', key: 'actions', width: 120, fixed: 'right' }
]

const paginationConfig = computed(() => ({
  current: props.pagination.page,
  pageSize: props.pagination.limit,
  total: props.pagination.total,
  showSizeChanger: true,
  showTotal: (total: number) => `Tổng ${total} gói dịch vụ`
}))

const handleTableChange = (pagination: any) => {
  emit('page-change', pagination.current, pagination.pageSize)
}
</script>
