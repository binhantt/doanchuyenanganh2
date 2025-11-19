<template>
  <pink-card class="mb-6">
    <a-form layout="vertical">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-form-item label="Tìm kiếm">
            <a-input
              v-model:value="filters.keyword"
              placeholder="Email, tên, số điện thoại..."
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
          <a-form-item label="Vai trò">
            <a-select
              v-model:value="filters.role"
              placeholder="Tất cả"
              @change="handleFilter"
              allow-clear
            >
              <a-select-option v-for="role in USER_ROLES" :key="role.value" :value="role.value">
                {{ role.label }}
              </a-select-option>
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
              <a-select-option :value="true">Hoạt động</a-select-option>
              <a-select-option :value="false">Không hoạt động</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        
        <a-col :span="4">
          <a-form-item label="Sắp xếp">
            <a-select
              v-model:value="filters.sortBy"
              @change="handleFilter"
            >
              <a-select-option value="createdAt">Ngày tạo</a-select-option>
              <a-select-option value="fullName">Tên</a-select-option>
              <a-select-option value="email">Email</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        
        <a-col :span="4">
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
      </a-row>
    </a-form>
  </pink-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import PinkCard from '@/components/common/card/PinkCard.vue'
import type { UserFilter } from '../types/user.types'
import { USER_ROLES } from '../types/user.types'

const emit = defineEmits<{
  filter: [filters: UserFilter]
}>()

const filters = ref<UserFilter>({
  keyword: '',
  role: undefined,
  isActive: undefined,
  sortBy: 'createdAt',
  sortOrder: 'desc'
})

const handleFilter = () => {
  emit('filter', { ...filters.value })
}
</script>
