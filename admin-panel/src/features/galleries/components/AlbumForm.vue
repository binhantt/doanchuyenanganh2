<template>
  <a-form
    :model="formData"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 18 }"
    @finish="$emit('submit', formData)"
  >
    <a-form-item label="Tên album" required>
      <base-input
        v-model="formData.name"
        placeholder="VD: Album cưới mùa xuân 2024"
        :error="errors.name"
      />
    </a-form-item>

    <a-form-item label="Mô tả">
      <base-textarea
        v-model="formData.description"
        placeholder="Mô tả về album..."
        :rows="3"
      />
    </a-form-item>

    <a-form-item label="Ảnh bìa">
      <a-select
        v-model:value="formData.coverImageId"
        placeholder="Chọn ảnh bìa (tùy chọn)"
        allowClear
        showSearch
        :filterOption="filterOption"
        style="width: 100%"
      >
        <a-select-option
          v-for="image in availableImages"
          :key="image.id"
          :value="image.id"
        >
          {{ image.title }}
        </a-select-option>
      </a-select>
      <div v-if="selectedCoverImage" class="mt-2">
        <img
          :src="selectedCoverImage.fileUrl"
          alt="Cover preview"
          class="w-32 h-32 object-cover rounded"
        />
      </div>
    </a-form-item>

    <a-form-item label="Thứ tự hiển thị">
      <base-input
        v-model.number="formData.displayOrder"
        type="number"
        placeholder="0"
      />
    </a-form-item>

    <a-form-item label="Trạng thái">
      <a-switch v-model:checked="formData.isActive" />
      <span class="ml-2 text-gray-600">
        {{ formData.isActive ? 'Hiển thị' : 'Ẩn' }}
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
import { ref, watch, computed, onMounted } from 'vue'
import BaseInput from '@/components/common/input/BaseInput.vue'
import BaseTextarea from '@/components/common/input/BaseTextarea.vue'
import SubmitButton from '@/components/common/button/SubmitButton.vue'
import type { AlbumFormData, Gallery } from '../types/gallery.types'
import { galleriesService } from '../services/galleries.service'

const props = defineProps<{
  initialData?: AlbumFormData
  loading?: boolean
  isEdit?: boolean
}>()

const emit = defineEmits<{
  submit: [data: AlbumFormData]
  cancel: []
}>()

const formData = ref<AlbumFormData>({
  name: '',
  description: '',
  coverImageId: undefined,
  displayOrder: 0,
  isActive: true
})

const errors = ref<Record<string, string>>({})
const availableImages = ref<Gallery[]>([])

const selectedCoverImage = computed(() => {
  if (!formData.value.coverImageId) return null
  return availableImages.value.find(img => img.id === formData.value.coverImageId) || null
})

const filterOption = (input: string, option: any) => {
  return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
}

const fetchImages = async () => {
  try {
    const response = await galleriesService.getGalleries({ isActive: true })
    if (response.data) {
      availableImages.value = response.data
    }
  } catch (error) {
    console.error('Failed to fetch images:', error)
  }
}

watch(() => props.initialData, (newData) => {
  if (newData) {
    formData.value = { ...newData }
  }
}, { immediate: true })

onMounted(() => {
  fetchImages()
})
</script>

