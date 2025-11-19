<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold pink-gradient-text mb-2">Quản lý sản phẩm</h1>
        <p class="text-gray-500">Quản lý tất cả sản phẩm cưới hỏi</p>
      </div>
      <base-button type="primary" :icon="PlusOutlined" @click="handleCreate" class="pink-pulse">
        Thêm sản phẩm
      </base-button>
    </div>
    
    <product-stats 
      :products="products" 
      @filter-category="handleCategoryFilter"
    />
    
    <product-filter-component @filter="handleFilter" />
    
    <product-table
      :products="products"
      :loading="loading"
      :pagination="pagination"
      @edit="handleEdit"
      @delete="handleDelete"
      @toggle-status="handleToggleStatus"
      @page-change="handlePageChange"
    />
    
    <!-- Product Form Modal -->
    <a-modal
      :open="modalVisible"
      :title="isEdit ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'"
      :footer="null"
      :width="900"
      @cancel="handleModalClose"
    >
      <product-form
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
import ProductTable from '../components/ProductTable.vue'
import ProductFilterComponent from '../components/ProductFilter.vue'
import ProductForm from '../components/ProductForm.vue'
import ProductStats from '../components/ProductStats.vue'
import { productsService } from '../services/products.service'
import { usePagination } from '@/hooks/usePagination'
import type { Product, ProductFormData, ProductFilter } from '../types/product.types'

const products = ref<Product[]>([])
const loading = ref(false)
const modalVisible = ref(false)
const modalLoading = ref(false)
const isEdit = ref(false)
const currentId = ref<string>()
const filters = ref<ProductFilter>({})

const { pagination, setPage, setLimit, setTotal } = usePagination()

const formData = ref<ProductFormData>({
  name: '',
  slug: '',
  description: '',
  price: 0,
  category: '',
  material: null,
  features: [''],
  images: [''],
  stockQuantity: 0,
  isFeatured: false,
  isActive: true
})

const fetchProducts = async () => {
  loading.value = true
  try {
    const response = await productsService.getProducts({
      ...filters.value
    })
    
    if (response.success && response.data) {
      products.value = response.data
      setTotal(response.data.length)
    }
  } catch (error: any) {
    message.error(error.message || 'Không thể tải danh sách sản phẩm')
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
    category: '',
    material: null,
    features: [''],
    images: [''],
    stockQuantity: 0,
    isFeatured: false,
    isActive: true
  }
  modalVisible.value = true
}

const handleEdit = (product: Product) => {
  isEdit.value = true
  currentId.value = product.id
  formData.value = {
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    category: product.category,
    material: product.material,
    features: product.features,
    images: product.images,
    stockQuantity: product.stockQuantity,
    isFeatured: product.isFeatured,
    isActive: product.isActive
  }
  modalVisible.value = true
}

const handleSubmit = async (data: ProductFormData) => {
  modalLoading.value = true
  try {
    // Filter out empty strings from arrays
    const cleanData = {
      ...data,
      features: data.features.filter(f => f.trim()),
      images: data.images.filter(i => i.trim())
    }
    
    if (isEdit.value && currentId.value) {
      await productsService.updateProduct(currentId.value, cleanData)
      message.success('Cập nhật sản phẩm thành công')
    } else {
      await productsService.createProduct(cleanData)
      message.success('Thêm sản phẩm thành công')
    }
    handleModalClose()
    fetchProducts()
  } catch (error: any) {
    message.error(error.message || 'Có lỗi xảy ra')
  } finally {
    modalLoading.value = false
  }
}

const handleDelete = (id: string) => {
  Modal.confirm({
    title: 'Xác nhận xóa',
    content: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
    okText: 'Xóa',
    okType: 'danger',
    cancelText: 'Hủy',
    async onOk() {
      try {
        await productsService.deleteProduct(id)
        message.success('Xóa sản phẩm thành công')
        fetchProducts()
      } catch (error: any) {
        message.error(error.message || 'Không thể xóa sản phẩm')
      }
    }
  })
}

const handleToggleStatus = async (id: string) => {
  try {
    const product = products.value.find(p => p.id === id)
    if (product) {
      await productsService.updateProduct(id, { isActive: !product.isActive })
      message.success('Cập nhật trạng thái thành công')
      fetchProducts()
    }
  } catch (error: any) {
    message.error(error.message || 'Không thể cập nhật trạng thái')
  }
}

const handleFilter = (newFilters: ProductFilter) => {
  filters.value = newFilters
  setPage(1)
  fetchProducts()
}

const handleCategoryFilter = (category: string) => {
  filters.value = { ...filters.value, category }
  setPage(1)
  fetchProducts()
}

const handlePageChange = (page: number, pageSize: number) => {
  setPage(page)
  setLimit(pageSize)
  fetchProducts()
}

const handleModalClose = () => {
  modalVisible.value = false
  currentId.value = undefined
}

onMounted(() => {
  fetchProducts()
})
</script>
