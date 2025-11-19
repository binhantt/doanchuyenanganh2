<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold pink-gradient-text mb-2">Quản lý người dùng</h1>
        <p class="text-gray-500">Quản lý tài khoản quản trị viên và nhân viên</p>
      </div>
      <base-button type="primary" :icon="PlusOutlined" @click="handleCreate" class="pink-pulse">
        Thêm người dùng
      </base-button>
    </div>
    
    <user-filter @filter="handleFilter" />
    
    <user-table
      :users="users"
      :loading="loading"
      :pagination="pagination"
      @edit="handleEdit"
      @delete="handleDelete"
      @toggle-status="handleToggleStatus"
      @page-change="handlePageChange"
    />
    
    <a-modal
      :open="modalVisible"
      :title="isEdit ? 'Cập nhật người dùng' : 'Thêm người dùng mới'"
      :footer="null"
      :width="800"
      @cancel="handleModalClose"
    >
      <user-form
        :initial-data="formData"
        :loading="modalLoading"
        :is-edit="isEdit"
        @submit="handleSubmit"
        @cancel="handleModalClose"
      />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { message, Modal } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import BaseButton from '@/components/common/button/BaseButton.vue'
import UserTable from '../components/UserTable.vue'
import UserFilter from '../components/UserFilter.vue'
import UserForm from '../components/UserForm.vue'
import { usersService } from '../services/users.service'
import { usePagination } from '@/hooks/usePagination'
import type { User, UserFormData, UserFilter as UserFilterType } from '../types/user.types'

const users = ref<User[]>([])
const loading = ref(false)
const modalVisible = ref(false)
const modalLoading = ref(false)
const isEdit = ref(false)
const currentId = ref<string>()
const filters = ref<UserFilterType>({})

const { pagination, setPage, setLimit, setTotal } = usePagination()

const formData = ref<User | undefined>()

const fetchUsers = async () => {
  loading.value = true
  try {
    const response = await usersService.getUsers({
      ...filters.value
    })
    
    if (response.success && response.data) {
      users.value = response.data
      setTotal(response.data.length)
    }
  } catch (error: any) {
    message.error(error.message || 'Không thể tải danh sách người dùng')
  } finally {
    loading.value = false
  }
}

const handleCreate = () => {
  isEdit.value = false
  formData.value = undefined
  modalVisible.value = true
}

const handleEdit = (user: User) => {
  isEdit.value = true
  currentId.value = user.id
  formData.value = user
  modalVisible.value = true
}

const handleSubmit = async (data: UserFormData) => {
  modalLoading.value = true
  try {
    if (isEdit.value && currentId.value) {
      const response = await usersService.updateUser(currentId.value, data)
      if (response.success) {
        message.success('Cập nhật người dùng thành công')
        handleModalClose()
        fetchUsers()
      } else {
        message.error(response.message || 'Cập nhật thất bại')
      }
    } else {
      const response = await usersService.createUser(data)
      if (response.success) {
        message.success('Thêm người dùng thành công')
        handleModalClose()
        fetchUsers()
      } else {
        message.error(response.message || 'Thêm người dùng thất bại')
      }
    }
  } catch (error: any) {
    console.error('User submit error:', error)
    const errorMsg = error.response?.data?.message || error.message || 'Có lỗi xảy ra'
    message.error(errorMsg)
  } finally {
    modalLoading.value = false
  }
}

const handleDelete = (id: string) => {
  Modal.confirm({
    title: 'Xác nhận xóa',
    content: 'Bạn có chắc chắn muốn xóa người dùng này?',
    okText: 'Xóa',
    okType: 'danger',
    cancelText: 'Hủy',
    async onOk() {
      try {
        await usersService.deleteUser(id)
        message.success('Xóa người dùng thành công')
        fetchUsers()
      } catch (error: any) {
        message.error(error.message || 'Không thể xóa người dùng')
      }
    }
  })
}

const handleToggleStatus = async (id: string) => {
  try {
    await usersService.toggleUserStatus(id)
    message.success('Cập nhật trạng thái thành công')
    fetchUsers()
  } catch (error: any) {
    message.error(error.message || 'Không thể cập nhật trạng thái')
  }
}

const handleFilter = (newFilters: UserFilterType) => {
  filters.value = newFilters
  setPage(1)
  fetchUsers()
}

const handlePageChange = (page: number, pageSize: number) => {
  setPage(page)
  setLimit(pageSize)
  fetchUsers()
}

const handleModalClose = () => {
  modalVisible.value = false
  currentId.value = undefined
  formData.value = undefined
}

onMounted(() => {
  fetchUsers()
})
</script>
