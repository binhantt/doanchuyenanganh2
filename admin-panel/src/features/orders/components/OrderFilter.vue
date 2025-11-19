<template>
  <pink-card class="mb-6">
    <a-form layout="vertical">
      <a-row :gutter="16">
        <a-col :span="6">
          <a-form-item label="Tìm kiếm">
            <a-input
              v-model:value="filters.keyword"
              placeholder="Tên, email, SĐT, địa điểm..."
              @change="handleFilter"
              allow-clear
            >
              <template #prefix>
                <search-outlined />
              </template>
            </a-input>
          </a-form-item>
        </a-col>
        
        <a-col :span="4">
          <a-form-item label="Trạng thái">
            <a-select
              v-model:value="filters.status"
              placeholder="Tất cả"
              @change="handleFilter"
              allow-clear
            >
              <a-select-option v-for="status in ORDER_STATUS" :key="status.value" :value="status.value">
                {{ status.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        
        <a-col :span="4">
          <a-form-item label="Sắp xếp theo">
            <a-select
              v-model:value="filters.sortBy"
              placeholder="Mặc định"
              @change="handleFilter"
            >
              <a-select-option value="created_at">Ngày tạo</a-select-option>
              <a-select-option value="wedding_date">Ngày cưới</a-select-option>
              <a-select-option value="total_amount">Tổng tiền</a-select-option>
              <a-select-option value="client_name">Tên khách hàng</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        
        <a-col :span="3">
          <a-form-item label="Thứ tự">
            <a-select
              v-model:value="filters.sortOrder"
              @change="handleFilter"
            >
              <a-select-option value="asc">Tăng dần</a-select-option>
              <a-select-option value="desc">Giảm dần</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        
        <a-col :span="7">
          <a-form-item label="Khoảng thời gian">
            <a-range-picker
              v-model:value="dateRange"
              format="DD/MM/YYYY"
              @change="handleDateChange"
              class="w-full"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </pink-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import PinkCard from '@/components/common/card/PinkCard.vue'
import type { OrderFilter } from '../types/order.types'
import { ORDER_STATUS } from '../types/order.types'
import type { Dayjs } from 'dayjs'

const emit = defineEmits<{
  filter: [filters: OrderFilter]
}>()

const filters = ref<OrderFilter>({
  keyword: '',
  status: undefined,
  sortBy: 'created_at',
  sortOrder: 'desc'
})

const dateRange = ref<[Dayjs, Dayjs] | null>(null)

const handleFilter = () => {
  emit('filter', { ...filters.value })
}

const handleDateChange = (dates: [Dayjs, Dayjs] | null) => {
  if (dates) {
    filters.value.startDate = dates[0].format('YYYY-MM-DD')
    filters.value.endDate = dates[1].format('YYYY-MM-DD')
  } else {
    filters.value.startDate = undefined
    filters.value.endDate = undefined
  }
  handleFilter()
}
</script>
