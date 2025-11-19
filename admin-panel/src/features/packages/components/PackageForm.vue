<template>
  <a-form :model="formData" layout="vertical" @finish="handleSubmit">
    <a-row :gutter="16">
      <a-col :span="12">
        <a-form-item label="Tên gói dịch vụ" name="name" :rules="[{ required: true, message: 'Vui lòng nhập tên gói' }]">
          <a-input v-model:value="formData.name" placeholder="VD: Gói cưới cơ bản" />
        </a-form-item>
      </a-col>
      
      <a-col :span="12">
        <a-form-item label="Slug" name="slug" :rules="[{ required: true, message: 'Vui lòng nhập slug' }]">
          <a-input v-model:value="formData.slug" placeholder="goi-cuoi-co-ban" />
        </a-form-item>
      </a-col>
    </a-row>

    <a-form-item label="Mô tả" name="description" :rules="[{ required: true, message: 'Vui lòng nhập mô tả' }]">
      <a-textarea v-model:value="formData.description" :rows="4" placeholder="Mô tả chi tiết về gói dịch vụ" />
    </a-form-item>

    <a-row :gutter="16">
      <a-col :span="8">
        <a-form-item label="Giá" name="price" :rules="[{ required: true, message: 'Vui lòng nhập giá' }]">
          <a-input-number 
            v-model:value="formData.price" 
            :min="0" 
            :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
            :parser="value => value!.replace(/\$\s?|(,*)/g, '')"
            style="width: 100%"
            placeholder="0"
          />
        </a-form-item>
      </a-col>
      
      <a-col :span="8">
        <a-form-item label="Phổ biến">
          <a-switch v-model:checked="formData.isPopular" />
        </a-form-item>
      </a-col>
      
      <a-col :span="8">
        <a-form-item label="Hoạt động">
          <a-switch v-model:checked="formData.isActive" />
        </a-form-item>
      </a-col>
    </a-row>

    <a-divider>Tính năng gói</a-divider>

    <a-form-item label="Tính năng bao gồm">
      <div v-for="(feature, index) in formData.features.included" :key="index" class="flex gap-2 mb-2">
        <a-input v-model:value="formData.features.included[index]" placeholder="VD: Trang trí sân khấu" />
        <a-button danger @click="removeIncluded(index)">Xóa</a-button>
      </div>
      <a-button type="dashed" @click="addIncluded" block>+ Thêm tính năng</a-button>
    </a-form-item>

    <a-form-item label="Tính năng không bao gồm">
      <div v-for="(feature, index) in formData.features.excluded" :key="index" class="flex gap-2 mb-2">
        <a-input v-model:value="formData.features.excluded![index]" placeholder="VD: Xe hoa" />
        <a-button danger @click="removeExcluded(index)">Xóa</a-button>
      </div>
      <a-button type="dashed" @click="addExcluded" block>+ Thêm tính năng</a-button>
    </a-form-item>

    <a-form-item label="Điểm nổi bật">
      <div v-for="(highlight, index) in formData.features.highlights" :key="index" class="flex gap-2 mb-2">
        <a-input v-model:value="formData.features.highlights![index]" placeholder="VD: Miễn phí trang trí" />
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

    <a-form-item>
      <a-space>
        <submit-button :loading="loading" />
        <a-button @click="$emit('cancel')">Hủy</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import SubmitButton from '@/components/common/button/SubmitButton.vue'
import type { PackageFormData } from '../types/package.types'

const props = defineProps<{
  initialData?: PackageFormData
  loading?: boolean
  isEdit?: boolean
}>()

const emit = defineEmits<{
  submit: [data: PackageFormData]
  cancel: []
}>()

const formData = reactive<PackageFormData>({
  name: '',
  slug: '',
  description: '',
  price: 0,
  features: {
    included: [''],
    excluded: [''],
    highlights: ['']
  },
  images: [''],
  isPopular: false,
  isActive: true
})

watch(() => props.initialData, (newData) => {
  if (newData) {
    Object.assign(formData, newData)
  }
}, { immediate: true })

const addIncluded = () => formData.features.included.push('')
const removeIncluded = (index: number) => formData.features.included.splice(index, 1)

const addExcluded = () => {
  if (!formData.features.excluded) formData.features.excluded = []
  formData.features.excluded.push('')
}
const removeExcluded = (index: number) => formData.features.excluded?.splice(index, 1)

const addHighlight = () => {
  if (!formData.features.highlights) formData.features.highlights = []
  formData.features.highlights.push('')
}
const removeHighlight = (index: number) => formData.features.highlights?.splice(index, 1)

const addImage = () => formData.images.push('')
const removeImage = (index: number) => formData.images.splice(index, 1)

const handleSubmit = () => {
  emit('submit', formData)
}
</script>
