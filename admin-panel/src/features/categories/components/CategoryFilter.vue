<template>
  <pink-card class="mb-6">
    <a-form layout="inline" class="flex flex-wrap gap-4">
      <a-form-item label="Tìm kiếm">
        <a-input
          v-model:value="filters.keyword"
          placeholder="Tìm theo tên, slug, mô tả..."
          style="width: 300px"
          @pressEnter="handleFilter"
        >
          <template #prefix>
            <search-outlined />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item label="Trạng thái">
        <a-select
          v-model:value="filters.isActive"
          placeholder="Tất cả"
          style="width: 150px"
          @change="handleFilter"
          allowClear
        >
          <a-select-option :value="true">Hoạt động</a-select-option>
          <a-select-option :value="false">Không hoạt động</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" @click="handleFilter">
          <search-outlined /> Tìm kiếm
        </a-button>
      </a-form-item>

      <a-form-item>
        <a-button @click="handleReset">
          <reload-outlined /> Đặt lại
        </a-button>
      </a-form-item>
    </a-form>
  </pink-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons-vue'
import PinkCard from '@/components/common/card/PinkCard.vue'
import type { CategoryFilter } from '../types/category.types'

const emit = defineEmits<{
  filter: [filters: CategoryFilter]
}>()

const filters = ref<CategoryFilter>({
  keyword: '',
  isActive: undefined
})

const handleFilter = () => {
  emit('filter', { ...filters.value })
}

const handleReset = () => {
  filters.value = {
    keyword: '',
    isActive: undefined
  }
  handleFilter()
}
</script>
