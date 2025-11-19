<template>
  <pink-card>
    <a-table
      :columns="columns"
      :data-source="users"
      :loading="loading"
      :pagination="pagination"
      @change="handleTableChange"
      :row-key="(record) => record.id"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'role'">
          <a-tag :color="getRoleColor(record.role)">
            {{ getRoleLabel(record.role) }}
          </a-tag>
        </template>
        
        <template v-else-if="column.key === 'isActive'">
          <a-tag :color="record.isActive ? 'green' : 'red'">
            {{ record.isActive ? 'Hoạt động' : 'Không hoạt động' }}
          </a-tag>
        </template>
        
        <template v-else-if="column.key === 'createdAt'">
          {{ formatDate(record.createdAt) }}
        </template>
        
        <template v-else-if="column.key === 'actions'">
          <a-space>
            <a-button type="link" size="small" @click="$emit('edit', record)">
              <edit-outlined /> Sửa
            </a-button>
            <a-button 
              type="link" 
              size="small" 
              @click="$emit('toggle-status', record.id)"
              :style="{ color: record.isActive ? '#ff4d4f' : '#52c41a' }"
            >
              <stop-outlined v-if="record.isActive" />
              <check-circle-outlined v-else />
              {{ record.isActive ? 'Vô hiệu' : 'Kích hoạt' }}
            </a-button>
            <a-button type="link" danger size="small" @click="$emit('delete', record.id)">
              <delete-outlined /> Xóa
            </a-button>
          </a-space>
        </template>
      </template>
    </a-table>
  </pink-card>
</template>

<script setup lang="ts">
import { EditOutlined, DeleteOutlined, StopOutlined, CheckCircleOutlined } from '@ant-design/icons-vue'
import PinkCard from '@/components/common/card/PinkCard.vue'
import { formatDate } from '@/utils/formatDate'
import type { User } from '../types/user.types'
import { USER_ROLES } from '../types/user.types'
import type { TableProps } from 'ant-design-vue'

defineProps<{
  users: User[]
  loading: boolean
  pagination: TableProps['pagination']
}>()

const emit = defineEmits<{
  edit: [user: User]
  delete: [id: string]
  'toggle-status': [id: string]
  'page-change': [page: number, pageSize: number]
}>()

const columns = [
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Họ tên', dataIndex: 'fullName', key: 'fullName' },
  { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
  { title: 'Vai trò', key: 'role' },
  { title: 'Trạng thái', key: 'isActive' },
  { title: 'Ngày tạo', key: 'createdAt' },
  { title: 'Thao tác', key: 'actions', width: 280 }
]

const getRoleLabel = (role: string) => {
  return USER_ROLES.find(r => r.value === role)?.label || role
}

const getRoleColor = (role: string) => {
  return USER_ROLES.find(r => r.value === role)?.color || 'default'
}

const handleTableChange = (pag: any) => {
  emit('page-change', pag.current, pag.pageSize)
}
</script>
