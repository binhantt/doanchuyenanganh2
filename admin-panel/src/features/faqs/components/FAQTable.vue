<template>
  <a-table
    :columns="columns"
    :data-source="faqs"
    :loading="loading"
    row-key="id"
    :pagination="{ pageSize: 10 }"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'question'">
        <div class="font-semibold">{{ record.question }}</div>
      </template>
      
      <template v-else-if="column.key === 'answer'">
        <div class="text-sm text-gray-600 line-clamp-2">{{ record.answer }}</div>
      </template>
      
      <template v-else-if="column.key === 'category'">
        <a-tag color="blue">{{ record.category }}</a-tag>
      </template>
      
      <template v-else-if="column.key === 'isActive'">
        <a-switch
          :checked="record.isActive"
          @change="$emit('toggle-status', record.id)"
        />
      </template>
      
      <template v-else-if="column.key === 'actions'">
        <a-space>
          <a-button type="link" size="small" @click="$emit('edit', record)">
            <edit-outlined />
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
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import type { FAQ } from '../types/faq.types'

defineProps<{
  faqs: FAQ[]
  loading?: boolean
}>()

defineEmits<{
  edit: [faq: FAQ]
  delete: [id: string]
  'toggle-status': [id: string]
}>()

const columns = [
  { title: 'Câu hỏi', key: 'question', dataIndex: 'question', width: 250 },
  { title: 'Câu trả lời', key: 'answer', dataIndex: 'answer', width: 300 },
  { title: 'Danh mục', key: 'category', dataIndex: 'category', width: 120 },
  { title: 'Thứ tự', key: 'displayOrder', dataIndex: 'displayOrder', width: 100 },
  { title: 'Hiển thị', key: 'isActive', dataIndex: 'isActive', width: 100 },
  { title: 'Thao tác', key: 'actions', width: 150 }
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
