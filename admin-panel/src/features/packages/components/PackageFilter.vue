<template>
  <pink-card class="mb-6">
    <a-form layout="vertical">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-form-item label="Tìm kiếm">
            <a-input
              v-model:value="filters.keyword"
              placeholder="Tên gói dịch vụ..."
              @change="handleFilter"
              allow-clear
            />
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
              <a-select-option :value="true">Hoạt động</a-select-option>
              <a-select-option :value="false">Không hoạt động</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        
        <a-col :span="4">
          <a-form-item label="Phổ biến">
            <a-select
              v-model:value="filters.isPopular"
              placeholder="Tất cả"
              @change="handleFilter"
              allow-clear
            >
              <a-select-option :value="true">Phổ biến</a-select-option>
              <a-select-option :value="false">Thường</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        
        <a-col :span="4">
          <a-form-item label="Sắp xếp">
            <a-select
              v-model:value="filters.sortBy"
              placeholder="Mặc định"
              @change="handleFilter"
              allow-clear
            >
              <a-select-option value="name">Tên</a-select-option>
              <a-select-option value="price">Giá</a-select-option>
              <a-select-option value="createdAt">Ngày tạo</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        
        <a-col :span="4">
          <a-form-item label="Thứ tự">
            <a-select
              v-model:value="filters.sortOrder"
              placeholder="Tăng dần"
              @change="handleFilter"
            >
              <a-select-option value="asc">Tăng dần</a-select-option>
              <a-select-option value="desc">Giảm dần</a-select-option>
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
import type { PackageFilter } from '../types/package.types'

const emit = defineEmits<{
  filter: [filters: PackageFilter]
}>()

const filters = reactive<PackageFilter>({
  keyword: '',
  isActive: undefined,
  isPopular: undefined,
  sortBy: 'createdAt',
  sortOrder: 'desc'
})

const handleFilter = () => {
  emit('filter', { ...filters })
}
</script>
