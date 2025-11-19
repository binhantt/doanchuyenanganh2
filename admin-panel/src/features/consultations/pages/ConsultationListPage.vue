<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold pink-gradient-text mb-2">Quản lý lịch tư vấn</h1>
        <p class="text-gray-500">Quản lý các yêu cầu đặt lịch tư vấn từ khách hàng</p>
      </div>
    </div>

    <consultation-filter-component @filter="handleFilter" />

    <pink-card>
      <consultation-table
        :consultations="consultations"
        :loading="loading"
        @view="handleView"
        @delete="handleDelete"
        @update-status="handleUpdateStatus"
      />
    </pink-card>

    <!-- View Detail Modal -->
    <a-modal
      :open="modalVisible"
      title="Chi tiết lịch tư vấn"
      :footer="null"
      :width="700"
      @cancel="handleModalClose"
    >
      <div v-if="selectedConsultation" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-gray-600 text-sm">Tên khách hàng</label>
            <div class="font-semibold">{{ selectedConsultation.clientName }}</div>
          </div>
          <div>
            <label class="text-gray-600 text-sm">Email</label>
            <div class="font-semibold">{{ selectedConsultation.clientEmail }}</div>
          </div>
          <div>
            <label class="text-gray-600 text-sm">Số điện thoại</label>
            <div class="font-semibold">{{ selectedConsultation.clientPhone }}</div>
          </div>
          <div>
            <label class="text-gray-600 text-sm">Ngày cưới</label>
            <div class="font-semibold">{{ formatDate(selectedConsultation.weddingDate) }}</div>
          </div>
          <div>
            <label class="text-gray-600 text-sm">Số lượng khách</label>
            <div class="font-semibold">{{ selectedConsultation.guestCount }} người</div>
          </div>
          <div>
            <label class="text-gray-600 text-sm">Địa điểm</label>
            <div class="font-semibold">{{ selectedConsultation.venue }}</div>
          </div>
          <div>
            <label class="text-gray-600 text-sm">Loại dịch vụ</label>
            <div class="font-semibold">{{ selectedConsultation.serviceType }}</div>
          </div>
          <div>
            <label class="text-gray-600 text-sm">Ngân sách</label>
            <div class="font-semibold text-pink-600">{{ selectedConsultation.budget }}</div>
          </div>
          <div class="col-span-2">
            <label class="text-gray-600 text-sm">Trạng thái</label>
            <div>
              <a-tag :color="getStatusColor(selectedConsultation.status)">
                {{ getStatusLabel(selectedConsultation.status) }}
              </a-tag>
            </div>
          </div>
          <div class="col-span-2">
            <label class="text-gray-600 text-sm">Ghi chú</label>
            <div class="mt-1 p-3 bg-gray-50 rounded">{{ selectedConsultation.notes || 'Không có ghi chú' }}</div>
          </div>
          <div class="col-span-2">
            <label class="text-gray-600 text-sm">Ngày tạo</label>
            <div class="text-sm">{{ formatDate(selectedConsultation.createdAt) }}</div>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { message, Modal } from 'ant-design-vue'
import PinkCard from '@/components/common/card/PinkCard.vue'
import ConsultationFilterComponent from '../components/ConsultationFilter.vue'
import ConsultationTable from '../components/ConsultationTable.vue'
import { consultationsService } from '../services/consultations.service'
import type { Consultation, ConsultationFilter } from '../types/consultation.types'
import { CONSULTATION_STATUS } from '../types/consultation.types'
import { formatDate } from '@/utils/formatDate'

const consultations = ref<Consultation[]>([])
const loading = ref(false)
const modalVisible = ref(false)
const selectedConsultation = ref<Consultation | null>(null)
const filters = ref<ConsultationFilter>({})

const fetchConsultations = async () => {
  loading.value = true
  try {
    const response = await consultationsService.getConsultations(filters.value)
    if (response && response.data) {
      consultations.value = response.data
    } else if (Array.isArray(response)) {
      consultations.value = response
    }
  } catch (error: any) {
    message.error(error.message || 'Không thể tải danh sách lịch tư vấn')
  } finally {
    loading.value = false
  }
}

const handleView = (consultation: Consultation) => {
  selectedConsultation.value = consultation
  modalVisible.value = true
}

const handleDelete = (id: string) => {
  Modal.confirm({
    title: 'Xác nhận xóa',
    content: 'Bạn có chắc chắn muốn xóa lịch tư vấn này?',
    okText: 'Xóa',
    okType: 'danger',
    cancelText: 'Hủy',
    async onOk() {
      try {
        await consultationsService.deleteConsultation(id)
        message.success('Xóa lịch tư vấn thành công')
        fetchConsultations()
      } catch (error: any) {
        message.error(error.message || 'Không thể xóa lịch tư vấn')
      }
    }
  })
}

const handleUpdateStatus = async (id: string, status: string) => {
  try {
    await consultationsService.updateConsultationStatus(id, status)
    message.success('Cập nhật trạng thái thành công')
    fetchConsultations()
  } catch (error: any) {
    message.error(error.message || 'Không thể cập nhật trạng thái')
  }
}

const handleFilter = (newFilters: ConsultationFilter) => {
  filters.value = newFilters
  fetchConsultations()
}

const handleModalClose = () => {
  modalVisible.value = false
  selectedConsultation.value = null
}

const getStatusLabel = (status: string) => {
  return CONSULTATION_STATUS.find(s => s.value === status)?.label || status
}

const getStatusColor = (status: string) => {
  return CONSULTATION_STATUS.find(s => s.value === status)?.color || 'default'
}

onMounted(() => {
  fetchConsultations()
})
</script>
