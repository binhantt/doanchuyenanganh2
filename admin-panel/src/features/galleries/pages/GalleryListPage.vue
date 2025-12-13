<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold pink-gradient-text mb-2">Quản lý thư viện ảnh</h1>
        <p class="text-gray-500">Quản lý albums và hình ảnh trong hệ thống</p>
      </div>
      <a-space>
        <base-button
          v-if="activeTab === 'albums'"
          type="primary"
          :icon="PlusOutlined"
          @click="handleCreateAlbum"
          class="pink-pulse"
        >
          Thêm album mới
        </base-button>
        <base-button
          v-else
          type="primary"
          :icon="PlusOutlined"
          @click="handleCreate"
          class="pink-pulse"
        >
          Thêm ảnh mới
        </base-button>
      </a-space>
    </div>

    <a-tabs v-model:activeKey="activeTab" @change="handleTabChange">
      <a-tab-pane key="albums" tab="Albums">
        <gallery-filter-component v-if="false" @filter="handleFilter" />
        
        <div v-if="albumsLoading" class="text-center py-8">
          <a-spin size="large" />
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div
            v-for="album in albums"
            :key="album.id"
            class="relative group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
            @click="handleViewAlbum(album)"
          >
            <div class="aspect-square relative">
              <img
                v-if="album.coverImageUrl"
                :src="album.coverImageUrl"
                :alt="album.name"
                class="w-full h-full object-cover"
              />
              <div
                v-else
                class="w-full h-full bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center"
              >
                <folder-outlined class="text-6xl text-pink-400" />
              </div>
              <div
                class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100"
                @click.stop
              >
                <a-space>
                  <a-button type="primary" :icon="h(EyeOutlined)" @click.stop="handleViewAlbum(album)" />
                  <a-button :icon="h(EditOutlined)" @click.stop="handleEditAlbum(album)" />
                  <a-button danger :icon="h(DeleteOutlined)" @click.stop="handleDeleteAlbum(album.id)" />
                </a-space>
              </div>
              <div v-if="album.isActive === 0" class="absolute top-2 left-2">
                <a-tag color="red">Ẩn</a-tag>
              </div>
            </div>
            <div class="p-3">
              <h3 class="font-semibold text-sm truncate">{{ album.name }}</h3>
              <p class="text-xs text-gray-500">{{ album.imageCount }} ảnh</p>
              <p v-if="album.description" class="text-xs text-gray-400 truncate mt-1">
                {{ album.description }}
              </p>
            </div>
          </div>
        </div>
      </a-tab-pane>

      <a-tab-pane key="images" tab="Hình ảnh">
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
      </a-tab-pane>
    </a-tabs>

    <!-- Album Modal -->
    <a-modal
      :open="albumModalVisible"
      :title="isEditAlbum ? 'Cập nhật album' : 'Thêm album mới'"
      :footer="null"
      :width="600"
      @cancel="handleAlbumModalClose"
    >
      <album-form
        :initial-data="albumFormData"
        :loading="albumModalLoading"
        :is-edit="isEditAlbum"
        @submit="handleAlbumSubmit"
        @cancel="handleAlbumModalClose"
      />
    </a-modal>

    <!-- Album View Modal -->
    <a-modal
      :open="albumViewModalVisible"
      title="Chi tiết album"
      :footer="null"
      :width="1000"
      @cancel="albumViewModalVisible = false"
    >
      <div v-if="selectedAlbum">
        <div class="mb-4 flex justify-between items-start">
          <div>
            <h2 class="text-2xl font-bold mb-2">{{ selectedAlbum.name }}</h2>
            <p v-if="selectedAlbum.description" class="text-gray-600 mb-2">
              {{ selectedAlbum.description }}
            </p>
            <a-space>
              <a-tag color="blue">{{ selectedAlbum.imageCount }} ảnh</a-tag>
              <a-tag :color="selectedAlbum.isActive === 1 ? 'green' : 'red'">
                {{ selectedAlbum.isActive === 1 ? 'Hiển thị' : 'Ẩn' }}
              </a-tag>
            </a-space>
          </div>
          <a-button type="primary" :icon="h(PlusOutlined)" @click="handleAddImagesToAlbum">
            Thêm ảnh vào album
          </a-button>
        </div>
        <div v-if="albumImages.length > 0" class="grid grid-cols-3 gap-4">
          <div
            v-for="image in albumImages"
            :key="image.id"
            class="relative group"
          >
            <img
              :src="image.fileUrl"
              :alt="image.title"
              class="w-full h-32 object-cover rounded"
            />
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 rounded">
              <a-space>
                <a-button type="primary" size="small" :icon="h(EyeOutlined)" @click="handleView(image)" />
                <a-button size="small" :icon="h(EditOutlined)" @click="handleEdit(image)" />
              </a-space>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-8 text-gray-500">
          Album này chưa có ảnh nào
        </div>
      </div>
    </a-modal>

    <!-- Add Images to Album Modal -->
    <a-modal
      :open="addImagesModalVisible"
      title="Thêm ảnh vào album"
      :width="900"
      :confirmLoading="addImagesLoading"
      @ok="handleConfirmAddImages"
      @cancel="handleCloseAddImages"
    >
      <div>
        <p class="mb-4 text-gray-600">
          Chọn các ảnh bạn muốn thêm vào album <strong>{{ selectedAlbum?.name }}</strong>
        </p>
        <div v-if="availableImagesForAlbum.length === 0" class="text-center py-8 text-gray-500">
          <a-spin size="large" />
        </div>
        <div v-else class="grid grid-cols-4 gap-4 max-h-96 overflow-y-auto">
          <div
            v-for="image in availableImagesForAlbum"
            :key="image.id"
            class="relative cursor-pointer"
            :class="{ 'ring-2 ring-pink-500': selectedImageIds.includes(image.id) }"
            @click="toggleImageSelection(image.id)"
          >
            <img
              :src="image.fileUrl"
              :alt="image.title"
              class="w-full h-24 object-cover rounded"
            />
            <div
              v-if="selectedImageIds.includes(image.id)"
              class="absolute top-1 right-1 bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              <check-outlined />
            </div>
            <div class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all rounded flex items-center justify-center">
              <p class="text-white text-xs text-center px-1 truncate">{{ image.title }}</p>
            </div>
          </div>
        </div>
        <div v-if="selectedImageIds.length > 0" class="mt-4">
          <a-alert
            :message="`Đã chọn ${selectedImageIds.length} ảnh`"
            type="info"
            show-icon
          />
        </div>
      </div>
    </a-modal>

    <!-- Image Modal -->
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
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined, StarFilled, FolderOutlined, CheckOutlined } from '@ant-design/icons-vue'
import BaseButton from '@/components/common/button/BaseButton.vue'
import GalleryFilterComponent from '../components/GalleryFilter.vue'
import GalleryForm from '../components/GalleryForm.vue'
import AlbumForm from '../components/AlbumForm.vue'
import { galleriesService } from '../services/galleries.service'
import { albumsService } from '../services/albums.service'
import type { Gallery, GalleryFormData, GalleryFilter, Album, AlbumFormData } from '../types/gallery.types'
import { RELATED_TYPES } from '../types/gallery.types'

const activeTab = ref('albums')
const galleries = ref<Gallery[]>([])
const albums = ref<Album[]>([])
const albumImages = ref<Gallery[]>([])
const availableImagesForAlbum = ref<Gallery[]>([])
const selectedImageIds = ref<string[]>([])
const loading = ref(false)
const albumsLoading = ref(false)
const addImagesLoading = ref(false)
const modalVisible = ref(false)
const albumModalVisible = ref(false)
const viewModalVisible = ref(false)
const albumViewModalVisible = ref(false)
const addImagesModalVisible = ref(false)
const modalLoading = ref(false)
const albumModalLoading = ref(false)
const isEdit = ref(false)
const isEditAlbum = ref(false)
const currentId = ref<string>()
const currentAlbumId = ref<string>()
const selectedGallery = ref<Gallery | null>(null)
const selectedAlbum = ref<Album | null>(null)
const filters = ref<GalleryFilter>({})

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

const albumFormData = ref<AlbumFormData>({
  name: '',
  description: '',
  coverImageId: undefined,
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

const fetchAlbums = async () => {
  albumsLoading.value = true
  try {
    const response = await albumsService.getAlbums({ isActive: true })
    if (response.data) {
      albums.value = response.data
    }
  } catch (error: any) {
    message.error(error.message || 'Không thể tải danh sách albums')
  } finally {
    albumsLoading.value = false
  }
}

const fetchAlbumImages = async (albumId: string) => {
  try {
    const response = await albumsService.getImagesByAlbum(albumId)
    if (response.data) {
      albumImages.value = response.data
    }
  } catch (error: any) {
    message.error(error.message || 'Không thể tải ảnh trong album')
  }
}

const handleTabChange = (key: string) => {
  activeTab.value = key
  if (key === 'albums') {
    fetchAlbums()
  } else {
    fetchGalleries()
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
    albumId: gallery.albumId || undefined,
    relatedType: gallery.relatedType,
    relatedId: gallery.relatedId || undefined,
    isPrimary: gallery.isPrimary === 1,
    displayOrder: gallery.displayOrder,
    isActive: gallery.isActive === 1
  }
  modalVisible.value = true
}

const handleCreateAlbum = () => {
  isEditAlbum.value = false
  albumFormData.value = {
    name: '',
    description: '',
    coverImageId: undefined,
    displayOrder: 0,
    isActive: true
  }
  albumModalVisible.value = true
}

const handleEditAlbum = (album: Album) => {
  isEditAlbum.value = true
  currentAlbumId.value = album.id
  albumFormData.value = {
    name: album.name,
    description: album.description || '',
    coverImageId: album.coverImageId || undefined,
    displayOrder: album.displayOrder,
    isActive: album.isActive === 1
  }
  albumModalVisible.value = true
}

const handleViewAlbum = async (album: Album) => {
  selectedAlbum.value = album
  await fetchAlbumImages(album.id)
  albumViewModalVisible.value = true
}

const handleAddImagesToAlbum = async () => {
  if (!selectedAlbum.value) return
  
  // Fetch all images that are not in this album
  try {
    const response = await galleriesService.getGalleries({ isActive: true })
    if (response.data) {
      // Filter out images that are already in the album
      const albumImageIds = albumImages.value.map(img => img.id)
      availableImagesForAlbum.value = response.data.filter(
        img => !albumImageIds.includes(img.id)
      )
    }
  } catch (error: any) {
    message.error(error.message || 'Không thể tải danh sách ảnh')
    return
  }
  
  selectedImageIds.value = []
  addImagesModalVisible.value = true
}

const toggleImageSelection = (imageId: string) => {
  const index = selectedImageIds.value.indexOf(imageId)
  if (index > -1) {
    selectedImageIds.value.splice(index, 1)
  } else {
    selectedImageIds.value.push(imageId)
  }
}

const handleConfirmAddImages = async () => {
  if (!selectedAlbum.value || selectedImageIds.value.length === 0) {
    message.warning('Vui lòng chọn ít nhất một ảnh')
    return
  }

  addImagesLoading.value = true
  try {
    // Update each selected image to add it to the album
    const updatePromises = selectedImageIds.value.map(imageId =>
      galleriesService.updateGallery(imageId, { albumId: selectedAlbum.value!.id })
    )
    
    await Promise.all(updatePromises)
    message.success(`Đã thêm ${selectedImageIds.value.length} ảnh vào album`)
    handleCloseAddImages()
    await fetchAlbumImages(selectedAlbum.value.id)
    // Refresh album count
    await fetchAlbums()
  } catch (error: any) {
    message.error(error.message || 'Không thể thêm ảnh vào album')
  } finally {
    addImagesLoading.value = false
  }
}

const handleCloseAddImages = () => {
  addImagesModalVisible.value = false
  selectedImageIds.value = []
  availableImagesForAlbum.value = []
}

const handleAlbumSubmit = async (data: AlbumFormData) => {
  albumModalLoading.value = true
  try {
    if (isEditAlbum.value && currentAlbumId.value) {
      await albumsService.updateAlbum(currentAlbumId.value, data)
      message.success('Cập nhật album thành công')
    } else {
      await albumsService.createAlbum(data)
      message.success('Tạo album thành công')
    }
    handleAlbumModalClose()
    fetchAlbums()
  } catch (error: any) {
    message.error(error.message || 'Có lỗi xảy ra')
  } finally {
    albumModalLoading.value = false
  }
}

const handleDeleteAlbum = (id: string) => {
  Modal.confirm({
    title: 'Xác nhận xóa',
    content: 'Bạn có chắc chắn muốn xóa album này? Tất cả ảnh trong album sẽ không bị xóa.',
    okText: 'Xóa',
    okType: 'danger',
    cancelText: 'Hủy',
    async onOk() {
      try {
        await albumsService.deleteAlbum(id)
        message.success('Xóa album thành công')
        fetchAlbums()
      } catch (error: any) {
        message.error(error.message || 'Không thể xóa album')
      }
    }
  })
}

const handleAlbumModalClose = () => {
  albumModalVisible.value = false
  currentAlbumId.value = undefined
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
  if (activeTab.value === 'albums') {
    fetchAlbums()
  } else {
    fetchGalleries()
  }
})
</script>
