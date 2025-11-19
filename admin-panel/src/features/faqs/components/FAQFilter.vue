<template>
  <pink-card class="mb-6">
    <a-form layout="inline" class="flex flex-wrap gap-4">
      <a-form-item label="Tìm kiếm">
        <a-input
          v-model:value="filters.keyword"
          placeholder="Tìm câu hỏi..."
          style="width: 250px"
          @pressEnter="handleFilter"
        >
          <template #prefix>
            <search-outlined />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item label="Danh mục">
        <a-select
          v-model:value="filters.category"
          placeholder="Tất cả"
          style="width: 150px"
          @change="handleFilter"
          allowClear
        >
          <a-select-option v-for="cat in FAQ_CATEGORIES" :key="cat.value" :value="cat.value">
            {{ cat.label }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Trạng thái">
        <a-select
          v-model:value="filters.isActive"
          placeholder="Tất cả"
          style="width: 120px"
          @change="handleFilter"
          allowClear
        >
          <a-select-option :value="true">Hiển thị</a-select-option>
          <a-select-option :value="false">Ẩn</a-select-option>
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
import type { FAQFilter } from '../types/faq.types'
import { FAQ_CATEGORIES } from '../types/faq.types'

const emit = defineEmits<{
  filter: [filters: FAQFilter]
}>()

const filters = ref<FAQFilter>({
  keyword: '',
  category: undefined,
  isActive: undefined
})

const handleFilter = () => {
  emit('filter', filters.value)
}

const handleReset = () => {
  filters.value = {
    keyword: '',
    category: undefined,
    isActive: undefined
  }
  handleFilter()
}
</script>
