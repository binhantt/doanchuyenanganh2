<template>
  <pink-card>
    <a-table
      :columns="columns"
      :data-source="testimonials"
      :loading="loading"
      :pagination="false"
      row-key="id"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'clientInfo'">
          <div>
            <div class="font-semibold">{{ record.clientName }}</div>
            <div class="text-sm text-gray-500">{{ record.clientRole }}</div>
          </div>
        </template>

        <template v-else-if="column.key === 'content'">
          <div class="max-w-md">
            <a-tooltip :title="record.content">
              <div class="line-clamp-2">{{ truncateText(record.content, 100) }}</div>
            </a-tooltip>
          </div>
        </template>

        <template v-else-if="column.key === 'rating'">
          <div class="flex items-center gap-1">
            <span v-for="i in 5" :key="i" class="text-lg">
              {{ i <= record.rating ? '⭐' : '☆' }}
            </span>
          </div>
        </template>

        <template v-else-if="column.key === 'eventInfo'">
          <div>
            <div class="text-sm">{{ formatDate(record.eventDate) }}</div>
            <div class="text-xs text-gray-500">{{ record.location }}</div>
          </div>
        </template>

        <template v-else-if="column.key === 'language'">
          <a-tag :color="record.language === 'vi' ? 'blue' : 'green'">
            {{ record.language === 'vi' ? 'Tiếng Việt' : 'English' }}
          </a-tag>
        </template>

        <template v-else-if="column.key === 'isActive'">
          <a-switch
            :checked="record.isActive"
            @change="() => emit('toggle-status', record.id)"
            checked-children="Hiện"
            un-checked-children="Ẩn"
          />
        </template>

        <template v-else-if="column.key === 'actions'">
          <div class="flex gap-2">
            <a-button
              type="link"
              size="small"
              @click="emit('edit', record)"
            >
              Sửa
            </a-button>
            <a-button
              type="link"
              danger
              size="small"
              @click="emit('delete', record.id)"
            >
              Xóa
            </a-button>
          </div>
        </template>
      </template>
    </a-table>
  </pink-card>
</template>

<script setup lang="ts">
import PinkCard from '@/components/common/card/PinkCard.vue'
import { formatDate } from '@/utils/formatDate'
import type { Testimonial } from '../types/testimonial.types'

defineProps<{
  testimonials: Testimonial[]
  loading: boolean
}>()

const emit = defineEmits<{
  edit: [testimonial: Testimonial]
  delete: [id: string]
  'toggle-status': [id: string]
}>()

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

const columns = [
  {
    title: 'Khách hàng',
    key: 'clientInfo',
    width: 180
  },
  {
    title: 'Nội dung',
    key: 'content',
    width: 300
  },
  {
    title: 'Đánh giá',
    key: 'rating',
    width: 150
  },
  {
    title: 'Sự kiện',
    key: 'eventInfo',
    width: 150
  },
  {
    title: 'Ngôn ngữ',
    key: 'language',
    width: 100
  },
  {
    title: 'Trạng thái',
    key: 'isActive',
    width: 100
  },
  {
    title: 'Thao tác',
    key: 'actions',
    width: 120,
    fixed: 'right'
  }
]
</script>
