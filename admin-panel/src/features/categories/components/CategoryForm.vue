<template>
  <a-form
    :model="formData"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 18 }"
    @finish="$emit('submit', formData)"
  >
    <base-input
      v-model="formData.name"
      label="Tên danh mục"
      placeholder="Nhập tên danh mục"
      required
      :error="errors.name"
    />
    
    <base-textarea
      v-model="formData.description"
      label="Mô tả"
      placeholder="Nhập mô tả danh mục"
      :rows="4"
      :error="errors.description"
    />
    
    <base-image
      v-model="formData.image"
      label="Ảnh danh mục"
      :max-count="1"
      :error="errors.image"
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
import BaseInput from '@/components/common/input/BaseInput.vue'
import BaseTextarea from '@/components/common/input/BaseTextarea.vue'
import BaseImage from '@/components/common/input/BaseImage.vue'
import SubmitButton from '@/components/common/button/SubmitButton.vue'
import type { CategoryFormData } from '../types/category.types'

const props = defineProps<{
  initialData?: CategoryFormData
  loading?: boolean
  isEdit?: boolean
}>()

const emit = defineEmits<{
  submit: [data: CategoryFormData]
  cancel: []
}>()

const formData = ref<CategoryFormData>({
  name: '',
  description: '',
  image: '',
  isActive: true
})

const errors = ref<Record<string, string>>({})

watch(() => props.initialData, (newData) => {
  if (newData) {
    formData.value = { ...newData }
  }
}, { immediate: true })
</script>
