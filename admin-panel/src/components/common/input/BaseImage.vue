<template>
  <div class="mb-4">
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <a-upload
      v-model:file-list="fileList"
      list-type="picture-card"
      :before-upload="beforeUpload"
      :max-count="maxCount"
      @preview="handlePreview"
      @change="handleChange"
    >
      <div v-if="fileList.length < maxCount">
        <plus-outlined />
        <div class="mt-2">Upload</div>
      </div>
    </a-upload>
    <a-modal :open="previewVisible" :footer="null" @cancel="previewVisible = false">
      <img :src="previewImage" class="w-full" />
    </a-modal>
    <div v-if="error" class="text-red-500 text-xs mt-1">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import type { UploadProps } from 'ant-design-vue'

const props = defineProps<{
  modelValue?: string | string[]
  label?: string
  required?: boolean
  maxCount?: number
  maxSize?: number
  error?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]]
}>()

const fileList = ref<any[]>([])
const previewVisible = ref(false)
const previewImage = ref('')

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  const isImage = file.type.startsWith('image/')
  if (!isImage) {
    message.error('Chỉ được upload file ảnh!')
    return false
  }
  
  const maxSize = props.maxSize || 5
  const isLtSize = file.size / 1024 / 1024 < maxSize
  if (!isLtSize) {
    message.error(`Kích thước ảnh phải nhỏ hơn ${maxSize}MB!`)
    return false
  }
  
  return false
}

const handlePreview = (file: any) => {
  previewImage.value = file.url || file.thumbUrl
  previewVisible.value = true
}

const handleChange = ({ fileList: newFileList }: any) => {
  fileList.value = newFileList
  const urls = newFileList.map((file: any) => file.url || file.thumbUrl).filter(Boolean)
  emit('update:modelValue', props.maxCount === 1 ? urls[0] : urls)
}
</script>
