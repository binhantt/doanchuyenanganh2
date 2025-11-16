<template>
  <a-card class="mb-4">
    <a-row :gutter="16">
      <a-col :xs="24" :sm="12" :md="8">
        <a-input
          v-model:value="filters.keyword"
          placeholder="Tìm kiếm theo tên hoặc slug..."
          allow-clear
          @change="handleFilterChange"
        >
          <template #prefix>
            <search-outlined />
          </template>
        </a-input>
      </a-col>
      
      <a-col :xs="24" :sm="12" :md="6">
        <a-select
          v-model:value="filters.isActive"
          placeholder="Trạng thái"
          allow-clear
          @change="handleFilterChange"
          class="w-full"
        >
          <a-select-option :value="true">Hoạt động</a-select-option>
          <a-select-option :value="false">Không hoạt động</a-select-option>
        </a-select>
      </a-col>
      
      <a-col :xs="24" :sm="12" :md="6">
        <a-select
          v-model:value="filters.sortBy"
          placeholder="Sắp xếp theo"
          @change="handleFilterChange"
          class="w-full"
        >
          <a-select-option value="name">Tên</a-select-option>
          <a-select-option value="basePrice">Giá</a-select-option>
          <a-select-option value="createdAt">Ngày tạo</a-select-option>
        </a-select>
      </a-col>
      
      <a-col :xs="24" :sm="12" :md="4">
        <a-button type="primary" @click="handleReset" block>
          <reload-outlined /> Reset
        </a-button>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons-vue'
import type { ServiceFilter } from '../types/service.types'

const emit = defineEmits<{
  filter: [filters: ServiceFilter]
}>()

const filters = ref<ServiceFilter>({
  keyword: '',
  isActive: undefined,
  sortBy: 'createdAt',
  sortOrder: 'desc'
})

const handleFilterChange = () => {
  emit('filter', filters.value)
}

const handleReset = () => {
  filters.value = {
    keyword: '',
    isActive: undefined,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  }
  emit('filter', filters.value)
}
</script>
