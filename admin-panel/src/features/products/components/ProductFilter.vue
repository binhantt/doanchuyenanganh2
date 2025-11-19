<template>
  <a-card class="mb-4">
    <a-row :gutter="16">
      <a-col :xs="24" :sm="12" :md="6">
        <a-input
          v-model:value="filters.keyword"
          placeholder="Tìm kiếm sản phẩm..."
          allow-clear
          @change="handleFilterChange"
        >
          <template #prefix>
            <search-outlined />
          </template>
        </a-input>
      </a-col>
      
      <a-col :xs="24" :sm="12" :md="5">
        <a-select
          v-model:value="filters.category"
          placeholder="Danh mục"
          allow-clear
          @change="handleFilterChange"
          class="w-full"
        >
          <a-select-option v-for="cat in PRODUCT_CATEGORIES" :key="cat.value" :value="cat.value">
            {{ cat.label }}
          </a-select-option>
        </a-select>
      </a-col>
      
      <a-col :xs="24" :sm="12" :md="4">
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
      
      <a-col :xs="24" :sm="12" :md="4">
        <a-select
          v-model:value="filters.inStock"
          placeholder="Tồn kho"
          allow-clear
          @change="handleFilterChange"
          class="w-full"
        >
          <a-select-option :value="true">Còn hàng</a-select-option>
          <a-select-option :value="false">Hết hàng</a-select-option>
        </a-select>
      </a-col>
      
      <a-col :xs="24" :sm="12" :md="5">
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
import type { ProductFilter } from '../types/product.types'
import { PRODUCT_CATEGORIES } from '../types/product.types'

const emit = defineEmits<{
  filter: [filters: ProductFilter]
}>()

const filters = ref<ProductFilter>({
  keyword: '',
  category: undefined,
  isActive: undefined,
  isFeatured: undefined,
  inStock: undefined,
  sortBy: 'createdAt',
  sortOrder: 'desc'
})

const handleFilterChange = () => {
  emit('filter', filters.value)
}

const handleReset = () => {
  filters.value = {
    keyword: '',
    category: undefined,
    isActive: undefined,
    isFeatured: undefined,
    inStock: undefined,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  }
  emit('filter', filters.value)
}
</script>
