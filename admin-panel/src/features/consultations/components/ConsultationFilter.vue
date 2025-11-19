<template>
  <pink-card class="mb-6">
    <a-form layout="inline" class="flex flex-wrap gap-4">
      <a-form-item label="Tìm kiếm">
        <a-input
          v-model:value="filters.keyword"
          placeholder="Tên, email, số điện thoại..."
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
          v-model:value="filters.status"
          placeholder="Tất cả"
          style="width: 150px"
          @change="handleFilter"
          allowClear
        >
          <a-select-option v-for="status in CONSULTATION_STATUS" :key="status.value" :value="status.value">
            {{ status.label }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Từ ngày">
        <a-date-picker
          v-model:value="filters.dateFrom"
          placeholder="Chọn ngày"
          format="DD/MM/YYYY"
          @change="handleFilter"
        />
      </a-form-item>

      <a-form-item label="Đến ngày">
        <a-date-picker
          v-model:value="filters.dateTo"
          placeholder="Chọn ngày"
          format="DD/MM/YYYY"
          @change="handleFilter"
        />
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
import type { ConsultationFilter } from '../types/consultation.types'
import { CONSULTATION_STATUS } from '../types/consultation.types'

const emit = defineEmits<{
  filter: [filters: ConsultationFilter]
}>()

const filters = ref<ConsultationFilter>({
  keyword: '',
  status: undefined,
  dateFrom: undefined,
  dateTo: undefined
})

const handleFilter = () => {
  emit('filter', filters.value)
}

const handleReset = () => {
  filters.value = {
    keyword: '',
    status: undefined,
    dateFrom: undefined,
    dateTo: undefined
  }
  handleFilter()
}
</script>
