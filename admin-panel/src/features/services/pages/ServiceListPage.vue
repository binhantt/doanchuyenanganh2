<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold pink-gradient-text mb-2">Quản lý dịch vụ</h1>
        <p class="text-gray-500">Quản lý tất cả dịch vụ cưới hỏi</p>
      </div>
      <base-button type="primary" :icon="PlusOutlined" @click="handleCreate" class="pink-pulse">
        Thêm dịch vụ
      </base-button>
    </div>
    
    <service-filter-component @filter="handleFilter" />
    
    <service-table
      :services="services"
      :loading="loading"
      :pagination="pagination"
      @edit="handleEdit"
      @delete="handleDelete"
      @toggle-status="handleToggleStatus"
      @page-change="handlePageChange"
    />
    
    <a-modal
      :open="modalVisible"
      :title="isEdit ? 'Cập nhật dịch vụ' : 'Thêm dịch vụ mới'"
      :footer="null"
      :width="800"
      @cancel="handleModalClose"
    >
      <service-form
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
import ServiceTable from '../components/ServiceTable.vue'
import ServiceFilterComponent from '../components/ServiceFilter.vue'
import ServiceForm from '../components/ServiceForm.vue'
import { servicesService } from '../services/services.service'
import { usePagination } from '@/hooks/usePagination'
import type { Service, ServiceFormData, ServiceFilter } from '../types/service.types'

const services = ref<Service[]>([])
const loading = ref(false)
const modalVisible = ref(false)
const modalLoading = ref(false)
const isEdit = ref(false)
const currentId = ref<string>()
const filters = ref<ServiceFilter>({})

const { pagination, setPage, setLimit, setTotal } = usePagination()

const formData = ref<ServiceFormData>({
  name: '',
  slug: '',
  shortDescription: '',
  fullDescription: '',
  icon: '',
  basePrice: 0,
  isActive: true,
  features: {
    included: [''],
    excluded: [''],
    highlights: ['']
  },
  images: ['']
})

const fetchServices = async () => {
  loading.value = true
  try {
    const response = await servicesService.getServices({
      ...filters.value
    })
    
    if (response.success && response.data) {
      services.value = response.data
      setTotal(response.data.length)
    }
  } catch (error: any) {
    message.error(error.message || 'Không thể tải danh sách dịch vụ')
  } finally {
    loading.value = false
  }
}

const handleCreate = () => {
  isEdit.value = false
  formData.value = {
    name: '',
    slug: '',
    shortDescription: '',
    fullDescription: '',
    icon: '',
    basePrice: 0,
    isActive: true,
    features: {
      included: [''],
      excluded: [''],
      highlights: ['']
    },
    images: ['']
  }
  modalVisible.value = true
}

const handleEdit = (service: Service) => {
  isEdit.value = true
  currentId.value = service.id
  formData.value = {
    name: service.name,
    slug: service.slug,
    shortDescription: service.shortDescription,
    fullDescription: service.fullDescription,
    icon: service.icon,
    basePrice: service.basePrice,
    isActive: service.isActive,
    features: service.features || {
      included: [''],
      excluded: [''],
      highlights: ['']
    },
    images: service.images || ['']
  }
  modalVisible.value = true
}

const handleSubmit = async (data: ServiceFormData) => {
  modalLoading.value = true
  try {
    if (isEdit.value && currentId.value) {
      await servicesService.updateService(currentId.value, data)
      message.success('Cập nhật dịch vụ thành công')
    } else {
      await servicesService.createService(data)
      message.success('Thêm dịch vụ thành công')
    }
    handleModalClose()
    fetchServices()
  } catch (error: any) {
    message.error(error.message || 'Có lỗi xảy ra')
  } finally {
    modalLoading.value = false
  }
}

const handleDelete = (id: string) => {
  Modal.confirm({
    title: 'Xác nhận xóa',
    content: 'Bạn có chắc chắn muốn xóa dịch vụ này?',
    okText: 'Xóa',
    okType: 'danger',
    cancelText: 'Hủy',
    async onOk() {
      try {
        await servicesService.deleteService(id)
        message.success('Xóa dịch vụ thành công')
        fetchServices()
      } catch (error: any) {
        message.error(error.message || 'Không thể xóa dịch vụ')
      }
    }
  })
}

const handleToggleStatus = async (id: string) => {
  try {
    const service = services.value.find(s => s.id === id)
    if (service) {
      await servicesService.updateService(id, { isActive: !service.isActive })
      message.success('Cập nhật trạng thái thành công')
      fetchServices()
    }
  } catch (error: any) {
    message.error(error.message || 'Không thể cập nhật trạng thái')
  }
}

const handleFilter = (newFilters: ServiceFilter) => {
  filters.value = newFilters
  setPage(1)
  fetchServices()
}

const handlePageChange = (page: number, pageSize: number) => {
  setPage(page)
  setLimit(pageSize)
  fetchServices()
}

const handleModalClose = () => {
  modalVisible.value = false
  currentId.value = undefined
}

onMounted(() => {
  fetchServices()
})
</script>
