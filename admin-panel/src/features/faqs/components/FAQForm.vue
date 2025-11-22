<template>
  <a-form
    :model="formData"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 18 }"
    @finish="$emit('submit', formData)"
    class="faq-form"
  >
    <a-form-item label="Câu hỏi" required>
      <a-textarea
        v-model:value="formData.question"
        placeholder="Nhập câu hỏi..."
        :rows="2"
      />
    </a-form-item>

    <a-form-item label="Câu trả lời" required>
      <a-textarea
        v-model:value="formData.answer"
        placeholder="Nhập câu trả lời..."
        :rows="5"
      />
    </a-form-item>

    <a-form-item label="Danh mục" required>
      <a-select v-model:value="formData.category" placeholder="Chọn danh mục">
        <a-select-option v-for="cat in FAQ_CATEGORIES" :key="cat.value" :value="cat.value">
          {{ cat.label }}
        </a-select-option>  
      </a-select>
    </a-form-item>

    <a-form-item label="Ngôn ngữ">
      <a-select v-model:value="formData.language" placeholder="Chọn ngôn ngữ">
        <a-select-option value="vi">Tiếng Việt</a-select-option>
        <a-select-option value="en">English</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item label="Thứ tự hiển thị">
      <a-input-number
        v-model:value="formData.displayOrder"
        :min="0"
        placeholder="0"
        class="w-full"
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
import { ref, watch } from 'vue'
import SubmitButton from '@/components/common/button/SubmitButton.vue'
import type { FAQFormData } from '../types/faq.types'
import { FAQ_CATEGORIES } from '../types/faq.types'

const props = defineProps<{
  initialData?: FAQFormData
  loading?: boolean
  isEdit?: boolean
}>()

defineEmits<{
  submit: [data: FAQFormData]
  cancel: []
}>()

const formData = ref<FAQFormData>({
  question: '',
  answer: '',
  category: 'general',
  language: 'vi',
  displayOrder: 0,
  isActive: true
})

watch(() => props.initialData, (newData) => {
  if (newData) {
    formData.value = { ...newData }
  }
}, { immediate: true })
</script>
