<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold pink-gradient-text mb-2">Quản lý thư viện ảnh</h1>
        <p class="text-gray-500">Quản lý tất cả hình ảnh trong hệ thống</p>
      </div>
      <base-button type="primary" :icon="PlusOutlined" @click="handleCreate" class="pink-pulse">
        Thêm ảnh mới
      </base-button>
    </div>

    <gallery-filter-component @filter="handleFilter" />

    <div v-if="loading" class="text-center py-8">
      <a-spin size="large" />
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div
        v-for="gallery in galleries"
        :key="gallery.id"
        class="relative group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
      >
        <div class="aspect-square relative">
          <img
            :src="gallery.fileUrl"
            :alt="gallery.altText || gallery.title"
            class="w-full h-full object-cover"
          />
          <div
            class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100"
          >
            <a-space>
              <a-button type="primary" :icon="h(EyeOutlined)" @click="handleView(gallery)" />
              <a-button :icon="h(EditOutlined)" @click="handleEdit(gallery)" />
              <a-button danger :icon="h(DeleteOutlined)" @click="handleDelete(gallery.id)" />
            </a-space>
          </div>
          <div v-if="gallery.isPrimary === 1" class="absolute top-2 right-2">
            <a-tag color="gold">
              <star-filled /> Ảnh chính
            </a-tag>
          </div>
          <div v-if="gallery.isActive === 0" class="absolute top-2 left-2">
            <a-tag color="red">Ẩn</a-tag>
          </div>
        </div>
        <div class="p-3">
          <h3 class="font-semibold text-sm truncate">{{ gallery.title }}</h3>
          <p class="text-xs text-gray-500 truncate">{{ getRelatedTypeLabel(gallery.relatedType) }}</p>
        </div>
      </div>
    </div>

    <a-modal
      :open="modalVisible"
      :title="isEdit ? 'Cập nhật ảnh' : 'Thêm ảnh mới'"
      :footer="null"
      :width="600"
      @cancel="handleModalClose"
    >
      <gallery-form
        :initial-data="formData"
        :loading="modalLoading"
        :is-edit="isEdit"
        @submit="handleSubmit"
        @cancel="handleModalClose"
      />
    </a-modal>

    <a-modal
      :open="viewModalVisible"
      title="Chi tiết ảnh"
      :footer="null"
      :width="800"
      @cancel="viewModalVisible = false"
    >
      <div v-if="selectedGallery">
        <img
          :src="selectedGallery.fileUrl"
          :alt="selectedGallery.altText || selectedGallery.title"
          class="w-full rounded-lg mb-4"
        />
        <a-descriptions bordered :column="2">
          <a-descriptions-item label="Tiêu đề" :span="2">{{ selectedGallery.title }}</a-descriptions-item>
          <a-descriptions-item label="Alt Text" :span="2">{{ selectedGallery.altText || 'Không có' }}</a-descriptions-item>
          <a-descriptions-item label="Tên file">{{ selectedGallery.fileName }}</a-descriptions-item>
          <a-descriptions-item label="Kích thước">{{ selectedGallery.fileSizeMB.toFixed(2) }} MB</a-descriptions-item>
          <a-descriptions-item label="Kích thước ảnh">{{ selectedGallery.dimensions || 'N/A' }}</a-descriptions-item>
          <a-descriptions-item label="Loại">{{ getRelatedTypeLabel(selectedGallery.relatedType) }}</a-descriptions-item>
          <a-descriptions-item label="Thứ tự">{{ selectedGallery.displayOrder }}</a-descriptions-item>
          <a-descriptions-item label="Ảnh chính">
            <a-tag :color="selectedGallery.isPrimary === 1 ? 'gold' : 'default'">
              {{ selectedGallery.isPrimary === 1 ? 'Có' : 'Không' }}
            </a-tag>
          </a-descriptions-item>
          <a-descriptions-item label="Trạng thái">
            <a-tag :color="selectedGallery.isActive === 1 ? 'green' : 'red'">
              {{ selectedGallery.isActive === 1 ? 'Hiển thị' : 'Ẩn' }}
            </a-tag>
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import { message, Modal } from 'ant-design-vue'
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined, StarFilled } from '@ant-design/icons-vue'
import BaseButton from '@/components/common/button/BaseButton.vue'
import GalleryFilterComponent from '../components/GalleryFilter.vue'
import GalleryForm from '../components/GalleryForm.vue'
import { galleriesService } from '../services/galleries.service'
import type { Gallery, GalleryFormData, GalleryFilter } from '../types/gallery.types'
import { RELATED_TYPES } from '../types/gallery.types'

const galleries = ref<Gallery[]>([])
const loading = ref(false)
const modalVisible = ref(false)
const viewModalVisible = ref(false)
const modalLoading = ref(false)
const isEdit = ref(false)
const currentId = ref<string>()
const selectedGallery = ref<Gallery | null>(null)
const filters = ref<GalleryFilter>({})

const formData = ref<GalleryFormData>({
  fileUrl: '',
  title: '',
  altText: '',
  fileName: '',
  category: 'product',
  relatedType: 'general',
  relatedId: undefined,
  isPrimary: false,
  displayOrder: 0,
  isActive: true
})

const fetchGalleries = async () => {
  loading.value = true
  try {
    const response = await galleriesService.getGalleries(filters.value)
    if (response.data) {
      galleries.value = response.data
    }
  } catch (error: any) {
    message.error(error.message || 'Không thể tải danh sách ảnh')
  } finally {
    loading.value = false
  }
}

const handleCreate = () => {
  isEdit.value = false
  formData.value = {
    fileUrl: '',
    title: '',
    altText: '',
    fileName: '',
    category: 'product',
    relatedType: 'general',
    relatedId: undefined,
    isPrimary: false,
    displayOrder: 0,
    isActive: true
  }
  modalVisible.value = true
}

const handleEdit = (gallery: Gallery) => {
  isEdit.value = true
  currentId.value = gallery.id
  formData.value = {
    fileUrl: gallery.fileUrl,
    title: gallery.title,
    altText: gallery.altText || '',
    fileName: gallery.fileName,
    category: gallery.category,
    relatedType: gallery.relatedType,
    relatedId: gallery.relatedId || undefined,
    isPrimary: gallery.isPrimary === 1,
    displayOrder: gallery.displayOrder,
    isActive: gallery.isActive === 1
  }
  modalVisible.value = true
}

const handleView = (gallery: Gallery) => {
  selectedGallery.value = gallery
  viewModalVisible.value = true
}

const handleSubmit = async (data: GalleryFormData) => {
  modalLoading.value = true
  try {
    if (isEdit.value && currentId.value) {
      await galleriesService.updateGallery(currentId.value, data)
      message.success('Cập nhật ảnh thành công')
    } else {
      await galleriesService.createGallery(data)
      message.success('Thêm ảnh thành công')
    }
    handleModalClose()
    fetchGalleries()
  } catch (error: any) {
    message.error(error.message || 'Có lỗi xảy ra')
  } finally {
    modalLoading.value = false
  }
}

const handleDelete = (id: string) => {
  Modal.confirm({
    title: 'Xác nhận xóa',
    content: 'Bạn có chắc chắn muốn xóa ảnh này?',
    okText: 'Xóa',
    okType: 'danger',
    cancelText: 'Hủy',
    async onOk() {
      try {
        await galleriesService.deleteGallery(id)
        message.success('Xóa ảnh thành công')
        fetchGalleries()
      } catch (error: any) {
        message.error(error.message || 'Không thể xóa ảnh')
      }
    }
  })
}

const handleFilter = (newFilters: GalleryFilter) => {
  filters.value = newFilters
  fetchGalleries()
}

const handleModalClose = () => {
  modalVisible.value = false
  currentId.value = undefined
}

const getRelatedTypeLabel = (type: string) => {
  return RELATED_TYPES.find(t => t.value === type)?.label || type
}

onMounted(() => {
  fetchGalleries()
})
</script>
