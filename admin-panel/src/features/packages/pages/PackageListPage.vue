<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold pink-gradient-text mb-2">Quản lý gói dịch vụ</h1>
        <p class="text-gray-500">Quản lý tất cả gói dịch vụ cưới hỏi</p>
      </div>
      <base-button type="primary" :icon="PlusOutlined" @click="handleCreate" class="pink-pulse">
        Thêm gói dịch vụ
      </base-button>
    </div>
    
    <package-stats :packages="packages" />
    
    <package-filter @filter="handleFilter" />
    
    <package-table
      :packages="packages"
      :loading="loading"
      :pagination="pagination"
      @edit="handleEdit"
      @delete="handleDelete"
      @toggle-status="handleToggleStatus"
      @page-change="handlePageChange"
    />
    
    <a-modal
      :open="modalVisible"
      :title="isEdit ? 'Cập nhật gói dịch vụ' : 'Thêm gói dịch vụ mới'"
      :footer="null"
      :width="900"
      @cancel="handleModalClose"
    >
      <package-form
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
import PackageTable from '../components/PackageTable.vue'
import PackageFilter from '../components/PackageFilter.vue'
import PackageForm from '../components/PackageForm.vue'
import PackageStats from '../components/PackageStats.vue'
import { packagesService } from '../services/packages.service'
import { usePagination } from '@/hooks/usePagination'
import type { Package, PackageFormData, PackageFilter as PackageFilterType } from '../types/package.types'

const packages = ref<Package[]>([])
const loading = ref(false)
const modalVisible = ref(false)
const modalLoading = ref(false)
const isEdit = ref(false)
const currentId = ref<string>()
const filters = ref<PackageFilterType>({})

const { pagination, setPage, setLimit, setTotal } = usePagination()

const formData = ref<PackageFormData>({
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

const fetchPackages = async () => {
  loading.value = true
  try {
    const response = await packagesService.getPackages({
      ...filters.value
    })
    
    if (response.success && response.data) {
      packages.value = response.data
      setTotal(response.data.length)
    }
  } catch (error: any) {
    message.error(error.message || 'Không thể tải danh sách gói dịch vụ')
  } finally {
    loading.value = false
  }
}

const handleCreate = () => {
  isEdit.value = false
  formData.value = {
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
  }
  modalVisible.value = true
}

const handleEdit = (pkg: Package) => {
  isEdit.value = true
  currentId.value = pkg.id
  formData.value = {
    name: pkg.name,
    slug: pkg.slug,
    description: pkg.description,
    price: pkg.price,
    features: pkg.features,
    images: pkg.images,
    isPopular: pkg.isPopular,
    isActive: pkg.isActive
  }
  modalVisible.value = true
}

const handleSubmit = async (data: PackageFormData) => {
  modalLoading.value = true
  try {
    const cleanData = {
      ...data,
      features: {
        included: data.features.included.filter(f => f.trim()),
        excluded: data.features.excluded?.filter(f => f.trim()) || [],
        highlights: data.features.highlights?.filter(f => f.trim()) || []
      },
      images: data.images.filter(i => i.trim())
    }
    
    if (isEdit.value && currentId.value) {
      await packagesService.updatePackage(currentId.value, cleanData)
      message.success('Cập nhật gói dịch vụ thành công')
    } else {
      await packagesService.createPackage(cleanData)
      message.success('Thêm gói dịch vụ thành công')
    }
    handleModalClose()
    fetchPackages()
  } catch (error: any) {
    message.error(error.message || 'Có lỗi xảy ra')
  } finally {
    modalLoading.value = false
  }
}

const handleDelete = (id: string) => {
  Modal.confirm({
    title: 'Xác nhận xóa',
    content: 'Bạn có chắc chắn muốn xóa gói dịch vụ này?',
    okText: 'Xóa',
    okType: 'danger',
    cancelText: 'Hủy',
    async onOk() {
      try {
        await packagesService.deletePackage(id)
        message.success('Xóa gói dịch vụ thành công')
        fetchPackages()
      } catch (error: any) {
        message.error(error.message || 'Không thể xóa gói dịch vụ')
      }
    }
  })
}

const handleToggleStatus = async (id: string) => {
  try {
    const pkg = packages.value.find(p => p.id === id)
    if (pkg) {
      await packagesService.updatePackage(id, { isActive: !pkg.isActive })
      message.success('Cập nhật trạng thái thành công')
      fetchPackages()
    }
  } catch (error: any) {
    message.error(error.message || 'Không thể cập nhật trạng thái')
  }
}

const handleFilter = (newFilters: PackageFilterType) => {
  filters.value = newFilters
  setPage(1)
  fetchPackages()
}

const handlePageChange = (page: number, pageSize: number) => {
  setPage(page)
  setLimit(pageSize)
  fetchPackages()
}

const handleModalClose = () => {
  modalVisible.value = false
  currentId.value = undefined
}

onMounted(() => {
  fetchPackages()
})
</script>
