<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold pink-gradient-text mb-2">Quản lý câu hỏi thường gặp</h1>
        <p class="text-gray-500">Quản lý các câu hỏi và câu trả lời phổ biến</p>
      </div>
      <base-button type="primary" :icon="PlusOutlined" @click="handleCreate" class="pink-pulse">
        Thêm câu hỏi
      </base-button>
    </div>

    <faq-filter-component @filter="handleFilter" />
      <FAQTable
        :faqs="faqs"
        :loading="loading"
        @edit="handleEdit"
        @delete="handleDelete"
        @toggle-status="handleToggleStatus"
      />
 
    <a-modal
      :open="modalVisible"
      :title="isEdit ? 'Cập nhật câu hỏi' : 'Thêm câu hỏi mới'"
      :footer="null"
      :width="800"
      @cancel="handleModalClose"
    >
      <FAQForm
        :initial-data="formData"
        :loading="modalLoading"
        :is-edit="isEdit"
        @submit="handleSubmit"
        @cancel="handleModalClose"
      />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { message, Modal } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import BaseButton from '@/components/common/button/BaseButton.vue'
import PinkCard from '@/components/common/card/PinkCard.vue'
import FAQFilterComponent from '../components/FAQFilter.vue'
import FAQTable from '../components/FAQTable.vue'
import FAQForm from '../components/FAQForm.vue'
import { faqsService } from '../services/faqs.service'
import type { FAQ, FAQFormData, FAQFilter } from '../types/faq.types'

const faqs = ref<FAQ[]>([])
const loading = ref(false)
const modalVisible = ref(false)
const modalLoading = ref(false)
const isEdit = ref(false)
const currentId = ref<string>()
const filters = ref<FAQFilter>({})

const formData = ref<FAQFormData>({
  question: '',
  answer: '',
  category: 'general',
  displayOrder: 0,
  isActive: true
})

const fetchFAQs = async () => {
  loading.value = true
  try {
    const response = await faqsService.getFAQs(filters.value)
    if (response && response.data) {
      faqs.value = response.data
    } else if (Array.isArray(response)) {
      faqs.value = response
    }
  } catch (error: any) {
    message.error(error.message || 'Không thể tải danh sách câu hỏi')
  } finally {
    loading.value = false
  }
}

const handleCreate = () => {
  isEdit.value = false
  formData.value = {
    question: '',
    answer: '',
    category: 'general',
    displayOrder: 0,
    isActive: true
  }
  modalVisible.value = true
}

const handleEdit = (faq: FAQ) => {
  isEdit.value = true
  currentId.value = faq.id
  formData.value = {
    question: faq.question,
    answer: faq.answer,
    category: faq.category,
    displayOrder: faq.displayOrder,
    isActive: faq.isActive
  }
  modalVisible.value = true
}

const handleSubmit = async (data: FAQFormData) => {
  modalLoading.value = true
  try {
    if (isEdit.value && currentId.value) {
      await faqsService.updateFAQ(currentId.value, data)
      message.success('Cập nhật câu hỏi thành công')
    } else {
      await faqsService.createFAQ(data)
      message.success('Thêm câu hỏi thành công')
    }
    handleModalClose()
    fetchFAQs()
  } catch (error: any) {
    message.error(error.message || 'Có lỗi xảy ra')
  } finally {
    modalLoading.value = false
  }
}

const handleDelete = (id: string) => {
  Modal.confirm({
    title: 'Xác nhận xóa',
    content: 'Bạn có chắc chắn muốn xóa câu hỏi này?',
    okText: 'Xóa',
    okType: 'danger',
    cancelText: 'Hủy',
    async onOk() {
      try {
        await faqsService.deleteFAQ(id)
        message.success('Xóa câu hỏi thành công')
        fetchFAQs()
      } catch (error: any) {
        message.error(error.message || 'Không thể xóa câu hỏi')
      }
    }
  })
}

const handleToggleStatus = async (id: string) => {
  try {
    const faq = faqs.value.find(f => f.id === id)
    if (faq) {
      await faqsService.updateFAQ(id, { isActive: !faq.isActive })
      message.success('Cập nhật trạng thái thành công')
      fetchFAQs()
    }
  } catch (error: any) {
    message.error(error.message || 'Không thể cập nhật trạng thái')
  }
}

const handleFilter = (newFilters: FAQFilter) => {
  filters.value = newFilters
  fetchFAQs()
}

const handleModalClose = () => {
  modalVisible.value = false
  currentId.value = undefined
}

onMounted(() => {
  fetchFAQs()
})
</script>
