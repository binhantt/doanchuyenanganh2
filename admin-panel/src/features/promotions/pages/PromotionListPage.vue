<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold pink-gradient-text mb-2">Quản lý mã giảm giá</h1>
        <p class="text-gray-500">Quản lý các chương trình khuyến mãi và giảm giá</p>
      </div>
      <base-button type="primary" :icon="PlusOutlined" @click="handleCreate" class="pink-pulse">
        Thêm mã giảm giá
      </base-button>
    </div>

    <promotion-filter-component @filter="handleFilter" />

    <promotion-table
      :promotions="promotions"
      :loading="loading"
      :pagination="pagination"
      @edit="handleEdit"
      @delete="handleDelete"
      @toggle-status="handleToggleStatus"
      @page-change="handlePageChange"
    />

    <a-modal
      :open="modalVisible"
      :title="isEdit ? 'Cập nhật mã giảm giá' : 'Thêm mã giảm giá mới'"
      :footer="null"
      :width="800"
      @cancel="handleModalClose"
    >
      <promotion-form
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
import PromotionTable from '../components/PromotionTable.vue'
import PromotionFilterComponent from '../components/PromotionFilter.vue'
import PromotionForm from '../components/PromotionForm.vue'
import { promotionsService } from '../services/promotions.service'
import { usePagination } from '@/hooks/usePagination'
import type { Promotion, PromotionFormData, PromotionFilter } from '../types/promotion.types'
import dayjs from 'dayjs'

const promotions = ref<Promotion[]>([])
const loading = ref(false)
const modalVisible = ref(false)
const modalLoading = ref(false)
const isEdit = ref(false)
const currentId = ref<string>()
const filters = ref<PromotionFilter>({})

const { pagination, setPage, setLimit, setTotal } = usePagination()

const formData = ref<PromotionFormData>({
  code: '',
  title: '',
  description: '',
  discountType: 'percentage',
  discountValue: 0,
  maxDiscount: undefined,
  minOrderAmount: undefined,
  startDate: new Date().toISOString(),
  endDate: dayjs().add(30, 'day').toISOString(),
  isActive: true
})

const fetchPromotions = async () => {
  loading.value = true
  try {
    const response = await promotionsService.getPromotions({
      ...filters.value
    })

    if (response.success && response.data) {
      promotions.value = response.data
      setTotal(response.data.length)
    }
  } catch (error: any) {
    message.error(error.message || 'Không thể tải danh sách mã giảm giá')
  } finally {
    loading.value = false
  }
}

const handleCreate = () => {
  isEdit.value = false
  formData.value = {
    code: '',
    title: '',
    description: '',
    discountType: 'percentage',
    discountValue: 0,
    maxDiscount: undefined,
    minOrderAmount: undefined,
    startDate: new Date().toISOString(),
    endDate: dayjs().add(30, 'day').toISOString(),
    isActive: true
  }
  modalVisible.value = true
}

const handleEdit = (promotion: Promotion) => {
  isEdit.value = true
  currentId.value = promotion.id
  formData.value = {
    code: promotion.code,
    title: promotion.title,
    description: promotion.description,
    discountType: promotion.discountType,
    discountValue: promotion.discountValue,
    maxDiscount: promotion.maxDiscount,
    minOrderAmount: promotion.minOrderAmount,
    startDate: promotion.startDate,
    endDate: promotion.endDate,
    isActive: promotion.isActive
  }
  modalVisible.value = true
}

const handleSubmit = async (data: PromotionFormData) => {
  modalLoading.value = true
  try {
    if (isEdit.value && currentId.value) {
      await promotionsService.updatePromotion(currentId.value, data)
      message.success('Cập nhật mã giảm giá thành công')
    } else {
      await promotionsService.createPromotion(data)
      message.success('Thêm mã giảm giá thành công')
    }
    handleModalClose()
    fetchPromotions()
  } catch (error: any) {
    message.error(error.message || 'Có lỗi xảy ra')
  } finally {
    modalLoading.value = false
  }
}

const handleDelete = (id: string) => {
  Modal.confirm({
    title: 'Xác nhận xóa',
    content: 'Bạn có chắc chắn muốn xóa mã giảm giá này?',
    okText: 'Xóa',
    okType: 'danger',
    cancelText: 'Hủy',
    async onOk() {
      try {
        await promotionsService.deletePromotion(id)
        message.success('Xóa mã giảm giá thành công')
        fetchPromotions()
      } catch (error: any) {
        message.error(error.message || 'Không thể xóa mã giảm giá')
      }
    }
  })
}

const handleToggleStatus = async (id: string) => {
  try {
    const promotion = promotions.value.find(p => p.id === id)
    if (promotion) {
      await promotionsService.updatePromotion(id, { isActive: !promotion.isActive })
      message.success('Cập nhật trạng thái thành công')
      fetchPromotions()
    }
  } catch (error: any) {
    message.error(error.message || 'Không thể cập nhật trạng thái')
  }
}

const handleFilter = (newFilters: PromotionFilter) => {
  filters.value = newFilters
  setPage(1)
  fetchPromotions()
}

const handlePageChange = (page: number, pageSize: number) => {
  setPage(page)
  setLimit(pageSize)
  fetchPromotions()
}

const handleModalClose = () => {
  modalVisible.value = false
  currentId.value = undefined
}

onMounted(() => {
  fetchPromotions()
})
</script>
