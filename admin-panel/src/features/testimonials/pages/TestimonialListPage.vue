<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold pink-gradient-text mb-2">Quản lý bình luận</h1>
        <p class="text-gray-500">Quản lý đánh giá và phản hồi từ khách hàng</p>
      </div>
      <base-button type="primary" :icon="PlusOutlined" @click="handleCreate" class="pink-pulse">
        Thêm bình luận
      </base-button>
    </div>

    <testimonial-filter @filter="handleFilter" />
    
    <testimonial-table
      :testimonials="testimonials"
      :loading="loading"
      @edit="handleEdit"
      @delete="handleDelete"
      @toggle-status="handleToggleStatus"
    />

    <a-modal
      :open="modalVisible"
      :title="isEdit ? 'Cập nhật bình luận' : 'Thêm bình luận mới'"
      :footer="null"
      :width="900"
      @cancel="handleModalClose"
    >
      <testimonial-form
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
import TestimonialFilter from '../components/TestimonialFilter.vue'
import TestimonialTable from '../components/TestimonialTable.vue'
import TestimonialForm from '../components/TestimonialForm.vue'
import { testimonialsService } from '../services/testimonials.service'
import type { Testimonial, TestimonialFormData, TestimonialFilter as TestimonialFilterType } from '../types/testimonial.types'

const testimonials = ref<Testimonial[]>([])
const loading = ref(false)
const modalVisible = ref(false)
const modalLoading = ref(false)
const isEdit = ref(false)
const currentId = ref<string>()
const filters = ref<TestimonialFilterType>({})

const formData = ref<TestimonialFormData>({
  clientName: '',
  clientRole: '',
  content: '',
  rating: 5,
  eventDate: '',
  location: '',
  language: 'vi',
  isActive: true
})

const fetchTestimonials = async () => {
  loading.value = true
  try {
    const response = await testimonialsService.getTestimonials(filters.value)
    if (response && response.data) {
      testimonials.value = response.data
    } else if (Array.isArray(response)) {
      testimonials.value = response
    }
  } catch (error: any) {
    message.error(error.message || 'Không thể tải danh sách bình luận')
  } finally {
    loading.value = false
  }
}

const handleCreate = () => {
  isEdit.value = false
  formData.value = {
    clientName: '',
    clientRole: '',
    content: '',
    rating: 5,
    eventDate: '',
    location: '',
    language: 'vi',
    isActive: true
  }
  modalVisible.value = true
}

const handleEdit = (testimonial: Testimonial) => {
  isEdit.value = true
  currentId.value = testimonial.id
  formData.value = {
    clientName: testimonial.clientName,
    clientRole: testimonial.clientRole,
    content: testimonial.content,
    rating: testimonial.rating,
    eventDate: testimonial.eventDate,
    location: testimonial.location,
    language: testimonial.language,
    isActive: testimonial.isActive
  }
  modalVisible.value = true
}

const handleSubmit = async (data: TestimonialFormData) => {
  modalLoading.value = true
  try {
    if (isEdit.value && currentId.value) {
      await testimonialsService.updateTestimonial(currentId.value, data)
      message.success('Cập nhật bình luận thành công')
    } else {
      await testimonialsService.createTestimonial(data)
      message.success('Thêm bình luận thành công')
    }
    handleModalClose()
    fetchTestimonials()
  } catch (error: any) {
    message.error(error.message || 'Có lỗi xảy ra')
  } finally {
    modalLoading.value = false
  }
}

const handleDelete = (id: string) => {
  Modal.confirm({
    title: 'Xác nhận xóa',
    content: 'Bạn có chắc chắn muốn xóa bình luận này?',
    okText: 'Xóa',
    okType: 'danger',
    cancelText: 'Hủy',
    async onOk() {
      try {
        await testimonialsService.deleteTestimonial(id)
        message.success('Xóa bình luận thành công')
        fetchTestimonials()
      } catch (error: any) {
        message.error(error.message || 'Không thể xóa bình luận')
      }
    }
  })
}

const handleToggleStatus = async (id: string) => {
  try {
    const testimonial = testimonials.value.find(t => t.id === id)
    if (testimonial) {
      await testimonialsService.updateTestimonial(id, { isActive: !testimonial.isActive })
      message.success('Cập nhật trạng thái thành công')
      fetchTestimonials()
    }
  } catch (error: any) {
    message.error(error.message || 'Không thể cập nhật trạng thái')
  }
}

const handleFilter = (newFilters: TestimonialFilterType) => {
  filters.value = newFilters
  fetchTestimonials()
}

const handleModalClose = () => {
  modalVisible.value = false
  currentId.value = undefined
}

onMounted(() => {
  fetchTestimonials()
})
</script>
