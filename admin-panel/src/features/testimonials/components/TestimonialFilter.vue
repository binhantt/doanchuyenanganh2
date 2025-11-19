<template>
  <pink-card class="mb-6">
    <a-form layout="vertical">
      <a-row :gutter="16">
        <a-col :span="6">
          <a-form-item label="Tìm kiếm">
            <a-input
              v-model:value="filters.keyword"
              placeholder="Tên khách hàng, nội dung..."
              @change="handleFilter"
              allow-clear
            />
          </a-form-item>
        </a-col>

        <a-col :span="4">
          <a-form-item label="Đánh giá">
            <a-select
              v-model:value="filters.rating"
              placeholder="Tất cả"
              @change="handleFilter"
              allow-clear
            >
              <a-select-option :value="5">⭐⭐⭐⭐⭐</a-select-option>
              <a-select-option :value="4">⭐⭐⭐⭐</a-select-option>
              <a-select-option :value="3">⭐⭐⭐</a-select-option>
              <a-select-option :value="2">⭐⭐</a-select-option>
              <a-select-option :value="1">⭐</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :span="4">
          <a-form-item label="Ngôn ngữ">
            <a-select
              v-model:value="filters.language"
              placeholder="Tất cả"
              @change="handleFilter"
              allow-clear
            >
              <a-select-option value="vi">Tiếng Việt</a-select-option>
              <a-select-option value="en">English</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :span="4">
          <a-form-item label="Trạng thái">
            <a-select
              v-model:value="filters.isActive"
              placeholder="Tất cả"
              @change="handleFilter"
              allow-clear
            >
              <a-select-option :value="true">Đã duyệt</a-select-option>
              <a-select-option :value="false">Chờ duyệt</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :span="3">
          <a-form-item label="Sắp xếp">
            <a-select
              v-model:value="filters.sortBy"
              @change="handleFilter"
            >
              <a-select-option value="createdAt">Ngày tạo</a-select-option>
              <a-select-option value="rating">Đánh giá</a-select-option>
              <a-select-option value="clientName">Tên</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :span="3">
          <a-form-item label="Thứ tự">
            <a-select
              v-model:value="filters.sortOrder"
              @change="handleFilter"
            >
              <a-select-option value="desc">Giảm dần</a-select-option>
              <a-select-option value="asc">Tăng dần</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </pink-card>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import PinkCard from '@/components/common/card/PinkCard.vue'
import type { TestimonialFilter } from '../types/testimonial.types'

const emit = defineEmits<{
  filter: [filters: TestimonialFilter]
}>()

const filters = reactive<TestimonialFilter>({
  keyword: '',
  rating: undefined,
  language: undefined,
  isActive: undefined,
  sortBy: 'createdAt',
  sortOrder: 'desc'
})

const handleFilter = () => {
  emit('filter', { ...filters })
}
</script>
