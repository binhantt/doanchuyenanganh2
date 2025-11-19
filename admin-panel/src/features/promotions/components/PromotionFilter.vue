<template>
  <pink-card class="mb-6">
    <a-form layout="inline" class="flex flex-wrap gap-4">
      <a-form-item label="Tìm kiếm">
        <a-input
          v-model:value="filters.keyword"
          placeholder="Tìm theo mã hoặc tiêu đề..."
          style="width: 250px"
          @change="handleFilter"
        />
      </a-form-item>

      <a-form-item label="Loại giảm giá">
        <a-select
          v-model:value="filters.discountType"
          placeholder="Tất cả"
          style="width: 150px"
          @change="handleFilter"
        >
          <a-select-option value="">Tất cả</a-select-option>
          <a-select-option value="percentage">Phần trăm</a-select-option>
          <a-select-option value="fixed">Cố định</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Trạng thái">
        <a-select
          v-model:value="filters.isActive"
          placeholder="Tất cả"
          style="width: 150px"
          @change="handleFilter"
        >
          <a-select-option :value="undefined">Tất cả</a-select-option>
          <a-select-option :value="true">Hoạt động</a-select-option>
          <a-select-option :value="false">Không hoạt động</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item>
        <a-button @click="handleReset">Đặt lại</a-button>
      </a-form-item>
    </a-form>
  </pink-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PinkCard from '@/components/common/card/PinkCard.vue'
import type { PromotionFilter } from '../types/promotion.types'

const emit = defineEmits<{
  filter: [filters: PromotionFilter]
}>()

const filters = ref<PromotionFilter>({
  keyword: '',
  discountType: undefined,
  isActive: undefined
})

const handleFilter = () => {
  emit('filter', { ...filters.value })
}

const handleReset = () => {
  filters.value = {
    keyword: '',
    discountType: undefined,
    isActive: undefined
  }
  handleFilter()
}
</script>
