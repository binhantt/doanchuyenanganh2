<template>
  <a-form
    :model="formState"
    :rules="rules"
    layout="vertical"
    @finish="handleSubmit"
  >
    <a-row :gutter="16">
      <a-col :span="12">
        <a-form-item label="Tên khách hàng" name="clientName">
          <a-input
            v-model:value="formState.clientName"
            placeholder="Nhập tên khách hàng"
          />
        </a-form-item>
      </a-col>

      <a-col :span="12">
        <a-form-item label="Vai trò" name="clientRole">
          <a-input
            v-model:value="formState.clientRole"
            placeholder="Ví dụ: Cô dâu, Chú rể, Khách hàng..."
          />
        </a-form-item>
      </a-col>
    </a-row>

    <a-form-item label="Nội dung đánh giá" name="content">
      <a-textarea
        v-model:value="formState.content"
        placeholder="Nhập nội dung đánh giá"
        :rows="4"
      />
    </a-form-item>

    <a-row :gutter="16">
      <a-col :span="8">
        <a-form-item label="Đánh giá" name="rating">
          <a-select v-model:value="formState.rating" placeholder="Chọn đánh giá">
            <a-select-option :value="5">⭐⭐⭐⭐⭐ (5 sao)</a-select-option>
            <a-select-option :value="4">⭐⭐⭐⭐ (4 sao)</a-select-option>
            <a-select-option :value="3">⭐⭐⭐ (3 sao)</a-select-option>
            <a-select-option :value="2">⭐⭐ (2 sao)</a-select-option>
            <a-select-option :value="1">⭐ (1 sao)</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>

      <a-col :span="8">
        <a-form-item label="Ngày sự kiện" name="eventDate">
          <base-date-picker
            v-model:value="formState.eventDate"
            placeholder="Chọn ngày sự kiện"
          />
        </a-form-item>
      </a-col>

      <a-col :span="8">
        <a-form-item label="Địa điểm" name="location">
          <a-input
            v-model:value="formState.location"
            placeholder="Nhập địa điểm"
          />
        </a-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="16">
      <a-col :span="12">
        <a-form-item label="Ngôn ngữ" name="language">
          <a-select v-model:value="formState.language" placeholder="Chọn ngôn ngữ">
            <a-select-option value="vi">Tiếng Việt</a-select-option>
            <a-select-option value="en">English</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>

      <a-col :span="12">
        <a-form-item label="Trạng thái" name="isActive">
          <a-switch
            v-model:checked="formState.isActive"
            checked-children="Hiển thị"
            un-checked-children="Ẩn"
          />
        </a-form-item>
      </a-col>
    </a-row>

    <div class="flex justify-end gap-2 mt-4">
      <a-button @click="emit('cancel')">Hủy</a-button>
      <submit-button :loading="loading" type="primary">
        {{ isEdit ? 'Cập nhật' : 'Thêm mới' }}
      </submit-button>
    </div>
  </a-form>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import SubmitButton from '@/components/common/button/SubmitButton.vue'
import BaseDatePicker from '@/components/common/input/BaseDatePicker.vue'
import type { TestimonialFormData } from '../types/testimonial.types'

const props = defineProps<{
  initialData?: TestimonialFormData
  loading: boolean
  isEdit: boolean
}>()

const emit = defineEmits<{
  submit: [data: TestimonialFormData]
  cancel: []
}>()

const formState = reactive<TestimonialFormData>({
  clientName: '',
  clientRole: '',
  content: '',
  rating: 5,
  eventDate: '',
  location: '',
  language: 'vi',
  isActive: true
})

const rules = {
  clientName: [{ required: true, message: 'Vui lòng nhập tên khách hàng' }],
  clientRole: [{ required: true, message: 'Vui lòng nhập vai trò' }],
  content: [{ required: true, message: 'Vui lòng nhập nội dung đánh giá' }],
  rating: [{ required: true, message: 'Vui lòng chọn đánh giá' }],
  eventDate: [{ required: true, message: 'Vui lòng chọn ngày sự kiện' }],
  location: [{ required: true, message: 'Vui lòng nhập địa điểm' }],
  language: [{ required: true, message: 'Vui lòng chọn ngôn ngữ' }]
}

watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      Object.assign(formState, newData)
    }
  },
  { immediate: true }
)

const handleSubmit = () => {
  emit('submit', { ...formState })
}
</script>
