<template>
  <a-form :model="formData" layout="vertical" @finish="handleSubmit">
    <a-row :gutter="16">
      <a-col :span="12">
        <a-form-item label="Email" name="email" :rules="[{ required: true, message: 'Vui lòng nhập email' }, { type: 'email', message: 'Email không hợp lệ' }]">
          <a-input v-model:value="formData.email" placeholder="email@example.com" />
        </a-form-item>
      </a-col>
      
      <a-col :span="12">
        <a-form-item 
          label="Mật khẩu" 
          name="password" 
          :rules="isEdit ? [] : [{ required: true, message: 'Vui lòng nhập mật khẩu' }, { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự' }]"
        >
          <a-input-password 
            v-model:value="formData.password" 
            :placeholder="isEdit ? 'Để trống nếu không đổi' : 'Nhập mật khẩu'"
          />
        </a-form-item>
      </a-col>
      
      <a-col :span="12">
        <a-form-item label="Họ tên" name="fullName" :rules="[{ required: true, message: 'Vui lòng nhập họ tên' }]">
          <a-input v-model:value="formData.fullName" placeholder="Nguyễn Văn A" />
        </a-form-item>
      </a-col>
      
      <a-col :span="12">
        <a-form-item label="Số điện thoại" name="phone">
          <a-input v-model:value="formData.phone" placeholder="0123456789" />
        </a-form-item>
      </a-col>
      
      <a-col :span="12">
        <a-form-item label="Vai trò" name="role" :rules="[{ required: true, message: 'Vui lòng chọn vai trò' }]">
          <a-select v-model:value="formData.role" placeholder="Chọn vai trò">
            <a-select-option v-for="role in USER_ROLES" :key="role.value" :value="role.value">
              {{ role.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      
      <a-col :span="12">
        <a-form-item label="Trạng thái" name="isActive">
          <a-switch v-model:checked="formData.isActive" checked-children="Hoạt động" un-checked-children="Không hoạt động" />
        </a-form-item>
      </a-col>
    </a-row>
    
    <a-form-item class="mt-4">
      <a-space>
        <a-button type="primary" html-type="submit" :loading="loading" class="pink-button">
          {{ isEdit ? 'Cập nhật' : 'Tạo mới' }}
        </a-button>
        <a-button @click="$emit('cancel')">Hủy</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { UserFormData, User } from '../types/user.types'
import { USER_ROLES } from '../types/user.types'

const props = defineProps<{
  initialData?: User
  loading: boolean
  isEdit: boolean
}>()

const emit = defineEmits<{
  submit: [data: UserFormData]
  cancel: []
}>()

const formData = reactive<UserFormData>({
  email: '',
  password: '',
  fullName: '',
  phone: null,
  role: 'staff',
  isActive: true
})

watch(() => props.initialData, (data) => {
  if (data) {
    formData.email = data.email
    formData.password = ''
    formData.fullName = data.fullName
    formData.phone = data.phone
    formData.role = data.role
    formData.isActive = data.isActive
  }
}, { immediate: true })

const handleSubmit = () => {
  const submitData = { ...formData }
  if (props.isEdit && !submitData.password) {
    delete submitData.password
  }
  emit('submit', submitData)
}
</script>
