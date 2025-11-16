<template>
  <a-form
    :model="formData"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 18 }"
    @finish="$emit('submit', formData)"
  >
    <base-input
      v-model="formData.name"
      label="Tên dịch vụ"
      placeholder="Nhập tên dịch vụ"
      required
      :error="errors.name"
    />
    
    <base-input
      v-model="formData.slug"
      label="Slug"
      placeholder="ten-dich-vu"
      required
      :error="errors.slug"
    />
    
    <base-textarea
      v-model="formData.shortDescription"
      label="Mô tả ngắn"
      placeholder="Mô tả ngắn gọn về dịch vụ"
      :rows="2"
      required
      :error="errors.shortDescription"
    />
    
    <base-textarea
      v-model="formData.fullDescription"
      label="Mô tả đầy đủ"
      placeholder="Mô tả chi tiết về dịch vụ"
      :rows="4"
      :error="errors.fullDescription"
    />
    
    <base-input
      v-model="formData.icon"
      label="Icon"
      placeholder="Flower, Heart, Camera..."
      required
      :error="errors.icon"
    />
    
    <a-form-item label="Tính năng">
      <div class="space-y-2">
        <div v-for="(feature, index) in formData.features" :key="index" class="flex gap-2">
          <a-input
            v-model:value="formData.features[index]"
            placeholder="Nhập tính năng"
          />
          <a-button danger @click="removeFeature(index)">
            <delete-outlined />
          </a-button>
        </div>
        <a-button type="dashed" block @click="addFeature">
          <plus-outlined /> Thêm tính năng
        </a-button>
      </div>
    </a-form-item>
    
    <base-input
      v-model.number="formData.basePrice"
      label="Giá cơ bản"
      placeholder="5000000"
      type="number"
      required
      :error="errors.basePrice"
    />
    
    <a-form-item label="Trạng thái">
      <a-switch v-model:checked="formData.isActive" />
      <span class="ml-2 text-gray-600">
        {{ formData.isActive ? 'Hoạt động' : 'Không hoạt động' }}
      </span>
    </a-form-item>
    
    <a-form-item :wrapper-col="{ offset: 6, span: 18 }">
      <a-space>
        <a-button @click="$emit('cancel')">Hủy</a-button>
        <submit-button :loading="loading">
          {{ isEdit ? 'Cập nhật' : 'Tạo mới' }}
        </submit-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import BaseInput from '@/components/common/input/BaseInput.vue'
import BaseTextarea from '@/components/common/input/BaseTextarea.vue'
import SubmitButton from '@/components/common/button/SubmitButton.vue'
import type { ServiceFormData } from '../types/service.types'

const props = defineProps<{
  initialData?: ServiceFormData
  loading?: boolean
  isEdit?: boolean
}>()

const emit = defineEmits<{
  submit: [data: ServiceFormData]
  cancel: []
}>()

const formData = ref<ServiceFormData>({
  name: '',
  slug: '',
  shortDescription: '',
  fullDescription: '',
  icon: '',
  features: [''],
  basePrice: 0,
  isActive: true
})

const errors = ref<Record<string, string>>({})

const addFeature = () => {
  formData.value.features.push('')
}

const removeFeature = (index: number) => {
  formData.value.features.splice(index, 1)
}

watch(() => props.initialData, (newData) => {
  if (newData) {
    formData.value = { ...newData }
  }
}, { immediate: true })

// Auto-generate slug from name
watch(() => formData.value.name, (newName) => {
  if (!props.isEdit) {
    formData.value.slug = newName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
})
</script>
