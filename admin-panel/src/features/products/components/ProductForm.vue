<template>
  <a-form
    :model="formData"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 18 }"
    @finish="$emit('submit', formData)"
  >
    <a-tabs>
      <a-tab-pane key="basic" tab="Thông tin cơ bản">
        <base-input
          v-model="formData.name"
          label="Tên sản phẩm"
          placeholder="Nhập tên sản phẩm"
          required
        />
        
        <base-input
          v-model="formData.slug"
          label="Slug"
          placeholder="ten-san-pham"
          required
        />
        
        <a-form-item label="Danh mục" required>
          <a-select
            v-model:value="formData.categoryId"
            placeholder="Chọn danh mục"
            @change="handleCategoryChange"
          >
            <a-select-option
              v-for="cat in categories"
              :key="cat.id"
              :value="cat.id"
            >
              {{ cat.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        
        <base-input
          v-model.number="formData.price"
          label="Giá"
          placeholder="500000"
          type="number"
          required
        />
      </a-tab-pane>
      
      <a-tab-pane key="description" tab="Mô tả & Tính năng">
        <base-textarea
          v-model="formData.description"
          label="Mô tả"
          placeholder="Mô tả chi tiết về sản phẩm"
          :rows="6"
          required
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
      </a-tab-pane>
      
      <a-tab-pane key="images" tab="Hình ảnh">
        <a-form-item label="Hình ảnh">
          <div class="space-y-2">
            <div v-for="(image, index) in formData.images" :key="index" class="flex gap-2">
              <a-input
                v-model:value="formData.images[index]"
                placeholder="URL hình ảnh"
              />
              <a-button danger @click="removeImage(index)">
                <delete-outlined />
              </a-button>
            </div>
            <a-button type="dashed" block @click="addImage">
              <plus-outlined /> Thêm hình ảnh
            </a-button>
          </div>
          <div class="mt-4 grid grid-cols-4 gap-2">
            <a-image
              v-for="(image, index) in formData.images.filter(img => img)"
              :key="index"
              :src="image"
              :width="100"
              :height="100"
              class="rounded object-cover"
            />
          </div>
        </a-form-item>
      </a-tab-pane>
      
    </a-tabs>
    
    <a-form-item :wrapper-col="{ offset: 6, span: 18 }" class="mt-6">
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
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import BaseInput from '@/components/common/input/BaseInput.vue'
import BaseTextarea from '@/components/common/input/BaseTextarea.vue'
import SubmitButton from '@/components/common/button/SubmitButton.vue'
import type { ProductFormData } from '../types/product.types'
import { categoriesService } from '@/features/categories/services/categories.service'
import type { Category } from '@/features/categories/types/category.types'

const props = defineProps<{
  initialData?: ProductFormData
  loading?: boolean
  isEdit?: boolean
}>()

const emit = defineEmits<{
  submit: [data: ProductFormData]
  cancel: []
}>()

const categories = ref<Category[]>([])

const formData = ref<ProductFormData>({
  name: '',
  slug: '',
  description: '',
  price: 0,
  category: '',
  categoryId: undefined,
  material: null,
  features: [''],
  images: [''],
  stockQuantity: 0,
  isFeatured: false,
  isActive: true
})

const addFeature = () => {
  formData.value.features.push('')
}

const removeFeature = (index: number) => {
  formData.value.features.splice(index, 1)
}

const addImage = () => {
  formData.value.images.push('')
}

const removeImage = (index: number) => {
  formData.value.images.splice(index, 1)
}

const fetchCategories = async () => {
  try {
    const response = await categoriesService.getCategories({ isActive: true })
    if (response.success && response.data) {
      categories.value = response.data
    }
  } catch (error) {
    console.error('Failed to load categories:', error)
  }
}

const handleCategoryChange = (categoryId: number) => {
  const category = categories.value.find(c => c.id === categoryId)
  if (category) {
    formData.value.category = category.name
  }
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

onMounted(() => {
  fetchCategories()
})
</script>
