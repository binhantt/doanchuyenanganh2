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

    <base-input
      v-model="formData.slug"
      label="Slug"
      placeholder="ten-danh-muc"
      required
      :error="errors.slug"
    />

    <base-textarea
      v-model="formData.description"
      label="Mô tả"
      placeholder="Mô tả về danh mục"
      :rows="3"
      :error="errors.description"
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
  slug: '',
  description: '',
  isActive: true
})

const errors = ref<Record<string, string>>({})

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
