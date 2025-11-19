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
    

    <base-input
      v-model.number="formData.basePrice"
      label="Giá cơ bản"
      placeholder="5000000"
      type="number"
      required
      :error="errors.basePrice"
    />
    
    <a-divider>Tính năng dịch vụ</a-divider>

    <a-form-item label="Tính năng bao gồm">
      <div v-for="(feature, index) in formData.features.included" :key="index" class="flex gap-2 mb-2">
        <a-input v-model:value="formData.features.included[index]" placeholder="VD: Trang trí sân khấu" />
        <a-button danger @click="removeIncluded(index)">Xóa</a-button>
      </div>
      <a-button type="dashed" @click="addIncluded" block>+ Thêm tính năng</a-button>
    </a-form-item>

    <a-form-item label="Tính năng không bao gồm">
      <div v-for="(feature, index) in formData.features.excluded" :key="index" class="flex gap-2 mb-2">
        <a-input v-model:value="formData.features.excluded![index]" placeholder="VD: Âm thanh ánh sáng" />
        <a-button danger @click="removeExcluded(index)">Xóa</a-button>
      </div>
      <a-button type="dashed" @click="addExcluded" block>+ Thêm tính năng</a-button>
    </a-form-item>

    <a-form-item label="Điểm nổi bật">
      <div v-for="(highlight, index) in formData.features.highlights" :key="index" class="flex gap-2 mb-2">
        <a-input v-model:value="formData.features.highlights![index]" placeholder="VD: Thiết kế concept độc đáo" />
        <a-button danger @click="removeHighlight(index)">Xóa</a-button>
      </div>
      <a-button type="dashed" @click="addHighlight" block>+ Thêm điểm nổi bật</a-button>
    </a-form-item>

    <a-form-item label="Hình ảnh (URLs)">
      <div v-for="(image, index) in formData.images" :key="index" class="flex gap-2 mb-2">
        <a-input v-model:value="formData.images[index]" placeholder="https://..." />
        <a-button danger @click="removeImage(index)">Xóa</a-button>
      </div>
      <a-button type="dashed" @click="addImage" block>+ Thêm hình ảnh</a-button>
    </a-form-item>
    
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
  basePrice: 0,
  isActive: true,
  features: {
    included: [''],
    excluded: [''],
    highlights: ['']
  },
  images: ['']
})

const errors = ref<Record<string, string>>({})

const addIncluded = () => formData.value.features.included.push('')
const removeIncluded = (index: number) => formData.value.features.included.splice(index, 1)

const addExcluded = () => {
  if (!formData.value.features.excluded) formData.value.features.excluded = []
  formData.value.features.excluded.push('')
}
const removeExcluded = (index: number) => formData.value.features.excluded?.splice(index, 1)

const addHighlight = () => {
  if (!formData.value.features.highlights) formData.value.features.highlights = []
  formData.value.features.highlights.push('')
}
const removeHighlight = (index: number) => formData.value.features.highlights?.splice(index, 1)

const addImage = () => formData.value.images.push('')
const removeImage = (index: number) => formData.value.images.splice(index, 1)

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
