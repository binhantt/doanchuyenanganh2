<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold pink-gradient-text mb-2">Quản lý danh mục</h1>
        <p class="text-gray-500">Quản lý tất cả danh mục sản phẩm</p>
      </div>
      <base-button type="primary" :icon="PlusOutlined" @click="handleCreate" class="pink-pulse">
        Thêm danh mục
      </base-button>
    </div>

    <category-filter-component @filter="handleFilter" />

    <category-table
      :categories="categories"
      :loading="loading"
      :pagination="pagination"
      @edit="handleEdit"
      @delete="handleDelete"
      @toggle-status="handleToggleStatus"
      @page-change="handlePageChange"
    />

    <a-modal
      :open="modalVisible"
      :title="isEdit ? 'Cập nhật danh mục' : 'Thêm danh mục mới'"
      :footer="null"
      :width="700"
      @cancel="handleModalClose"
    >
      <category-form
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
import CategoryTable from '../components/CategoryTable.vue'
import CategoryFilterComponent from '../components/CategoryFilter.vue'
import CategoryForm from '../components/CategoryForm.vue'
import { categoriesService } from '../services/categories.service'
import { usePagination } from '@/hooks/usePagination'
import type { Category, CategoryFormData, CategoryFilter } from '../types/category.types'

const categories = ref<Category[]>([])
const loading = ref(false)
const modalVisible = ref(false)
const modalLoading = ref(false)
const isEdit = ref(false)
const currentId = ref<number>()
const filters = ref<CategoryFilter>({})

const { pagination, setPage, setLimit, setTotal } = usePagination()

const formData = ref<CategoryFormData>({
  name: '',
  slug: '',
  description: '',
  isActive: true
})

const fetchCategories = async () => {
  loading.value = true
  try {
    const response = await categoriesService.getCategories({
      ...filters.value
    })

    if (response.success && response.data) {
      categories.value = response.data
      setTotal(response.data.length)
    }
  } catch (error: any) {
    message.error(error.message || 'Không thể tải danh sách danh mục')
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
    isActive: true
  }
  modalVisible.value = true
}

const handleEdit = (category: Category) => {
  isEdit.value = true
  currentId.value = category.id
  formData.value = {
    name: category.name,
    slug: category.slug,
    description: category.description || '',
    isActive: category.isActive
  }
  modalVisible.value = true
}

const handleSubmit = async (data: CategoryFormData) => {
  modalLoading.value = true
  try {
    if (isEdit.value && currentId.value) {
      await categoriesService.updateCategory(currentId.value, data)
      message.success('Cập nhật danh mục thành công')
    } else {
      await categoriesService.createCategory(data)
      message.success('Thêm danh mục thành công')
    }
    handleModalClose()
    fetchCategories()
  } catch (error: any) {
    message.error(error.message || 'Có lỗi xảy ra')
  } finally {
    modalLoading.value = false
  }
}

const handleDelete = (id: number) => {
  Modal.confirm({
    title: 'Xác nhận xóa',
    content: 'Bạn có chắc chắn muốn xóa danh mục này?',
    okText: 'Xóa',
    okType: 'danger',
    cancelText: 'Hủy',
    async onOk() {
      try {
        await categoriesService.deleteCategory(id)
        message.success('Xóa danh mục thành công')
        fetchCategories()
      } catch (error: any) {
        message.error(error.message || 'Không thể xóa danh mục')
      }
    }
  })
}

const handleToggleStatus = async (id: number) => {
  try {
    const category = categories.value.find(c => c.id === id)
    if (category) {
      await categoriesService.updateCategory(id, { isActive: !category.isActive })
      message.success('Cập nhật trạng thái thành công')
      fetchCategories()
    }
  } catch (error: any) {
    message.error(error.message || 'Không thể cập nhật trạng thái')
  }
}

const handleFilter = (newFilters: CategoryFilter) => {
  filters.value = newFilters
  setPage(1)
  fetchCategories()
}

const handlePageChange = (page: number, pageSize: number) => {
  setPage(page)
  setLimit(pageSize)
  fetchCategories()
}

const handleModalClose = () => {
  modalVisible.value = false
  currentId.value = undefined
}

onMounted(() => {
  fetchCategories()
})
</script>
