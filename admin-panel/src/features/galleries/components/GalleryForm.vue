<template>
  <a-form
    :model="formData"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 18 }"
    @finish="$emit('submit', formData)"
  >
    <a-form-item label="URL ảnh" required>
      <base-input
        v-model="formData.fileUrl"
        placeholder="https://example.com/image.jpg"
        :error="errors.fileUrl"
      />
      <div v-if="formData.fileUrl" class="mt-2">
        <img :src="formData.fileUrl" alt="Preview" class="w-32 h-32 object-cover rounded" />
      </div>
    </a-form-item>

    <a-form-item label="Tiêu đề" required>
      <base-input
        v-model="formData.title"
        placeholder="VD: Tiệc cưới sang trọng"
        :error="errors.title"
      />
    </a-form-item>

    <a-form-item label="Alt Text">
      <base-input
        v-model="formData.altText"
        placeholder="Mô tả ngắn gọn về ảnh..."
      />
    </a-form-item>

    <a-form-item label="Tên file">
      <base-input
        v-model="formData.fileName"
        placeholder="VD: wedding-photo-1.jpg"
      />
    </a-form-item>

    <a-form-item label="Album">
      <a-select
        v-model:value="formData.albumId"
        placeholder="Chọn album (tùy chọn)"
        allowClear
        showSearch
        :filterOption="filterAlbumOption"
        style="width: 100%"
      >
        <a-select-option
          v-for="album in availableAlbums"
          :key="album.id"
          :value="album.id"
        >
          {{ album.name }} ({{ album.imageCount }} ảnh)
        </a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item label="Loại" required>
      <a-select v-model:value="formData.relatedType" placeholder="Chọn loại">
        <a-select-option v-for="type in RELATED_TYPES" :key="type.value" :value="type.value">
          {{ type.label }}
        </a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item label="Thứ tự hiển thị">
      <base-input
        v-model.number="formData.displayOrder"
        type="number"
        placeholder="0"
      />
    </a-form-item>

    <a-form-item label="Ảnh chính">
      <a-switch v-model:checked="formData.isPrimary" />
      <span class="ml-2 text-gray-600">
        {{ formData.isPrimary ? 'Đặt làm ảnh chính' : 'Ảnh thường' }}
      </span>
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
import { ref, watch, onMounted } from 'vue'
import BaseInput from '@/components/common/input/BaseInput.vue'
import BaseTextarea from '@/components/common/input/BaseTextarea.vue'
import SubmitButton from '@/components/common/button/SubmitButton.vue'
import type { GalleryFormData, Album } from '../types/gallery.types'
import { RELATED_TYPES } from '../types/gallery.types'
import { albumsService } from '../services/albums.service'

const props = defineProps<{
  initialData?: GalleryFormData
  loading?: boolean
  isEdit?: boolean
}>()

const emit = defineEmits<{
  submit: [data: GalleryFormData]
  cancel: []
}>()

const formData = ref<GalleryFormData>({
  fileUrl: '',
  title: '',
  altText: '',
  fileName: '',
  category: 'product',
  albumId: undefined,
  relatedType: 'general',
  relatedId: undefined,
  isPrimary: false,
  displayOrder: 0,
  isActive: true
})

const errors = ref<Record<string, string>>({})
const availableAlbums = ref<Album[]>([])

const filterAlbumOption = (input: string, option: any) => {
  return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
}

const fetchAlbums = async () => {
  try {
    const response = await albumsService.getAlbums({ isActive: true })
    if (response.data) {
      availableAlbums.value = response.data
    }
  } catch (error) {
    console.error('Failed to fetch albums:', error)
  }
}

watch(() => props.initialData, (newData) => {
  if (newData) {
    formData.value = { ...newData }
  }
}, { immediate: true })

onMounted(() => {
  fetchAlbums()
})
</script>
