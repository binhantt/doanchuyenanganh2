<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold pink-gradient-text mb-2">Quản lý đơn hàng</h1>
        <p class="text-gray-500">Quản lý tất cả đơn hàng cưới hỏi</p>
      </div>
    </div>
    
    <order-stats :orders="orders" />
    
    <order-filter @filter="handleFilter" />
    
    <order-table
      :orders="orders"
      :loading="loading"
      :pagination="pagination"
      @view="handleView"
      @print="handlePrint"
      @delete="handleDelete"
      @update-status="handleUpdateStatus"
      @page-change="handlePageChange"
    />
    
    <a-modal
      :open="invoiceModalVisible"
      title="Hóa đơn"
      :footer="null"
      :width="900"
      @cancel="invoiceModalVisible = false"
    >
      <order-invoice v-if="selectedOrder" :order="selectedOrder" />
      <div class="mt-4 text-center">
        <a-button type="primary" @click="handlePrintInvoice" class="pink-button">
          In hóa đơn
        </a-button>
      </div>
    </a-modal>

    <a-modal
      :open="modalVisible"
      title="Chi tiết đơn hàng"
      :footer="null"
      :width="800"
      @cancel="modalVisible = false"
    >
      <div v-if="selectedOrder">
        <a-descriptions bordered :column="2">
          <a-descriptions-item label="Khách hàng">{{ selectedOrder.clientName }}</a-descriptions-item>
          <a-descriptions-item label="Số điện thoại">{{ selectedOrder.clientPhone }}</a-descriptions-item>
          <a-descriptions-item label="Email">{{ selectedOrder.clientEmail }}</a-descriptions-item>
          <a-descriptions-item label="Ngày cưới">{{ formatDate(selectedOrder.weddingDate) }}</a-descriptions-item>
          <a-descriptions-item label="Địa điểm" :span="2">{{ selectedOrder.venue }}</a-descriptions-item>
          <a-descriptions-item label="Số khách">{{ selectedOrder.guestCount }}</a-descriptions-item>
          <a-descriptions-item label="Trạng thái">
            <a-tag :color="getStatusColor(selectedOrder.status)">{{ getStatusLabel(selectedOrder.status) }}</a-tag>
          </a-descriptions-item>
        </a-descriptions>
        
        <a-divider>Danh sách sản phẩm/dịch vụ</a-divider>
        <a-table :columns="itemColumns" :data-source="selectedOrder.items" :pagination="false" size="small">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'subtotal'">
              {{ formatCurrency(record.subtotal) }}
            </template>
          </template>
        </a-table>
        
        <div class="mt-4 text-right">
          <div class="text-lg">Tổng tiền: <span class="font-bold">{{ formatCurrency(selectedOrder.totalAmount) }}</span></div>
          <div v-if="selectedOrder.discountAmount > 0" class="text-sm text-green-600">
            Giảm giá: -{{ formatCurrency(selectedOrder.discountAmount) }}
          </div>
          <div class="text-xl font-bold text-pinkPrimary mt-2">
            Thành tiền: {{ formatCurrency(selectedOrder.finalAmount) }}
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { message, Modal } from 'ant-design-vue'
import OrderTable from '../components/OrderTable.vue'
import OrderStats from '../components/OrderStats.vue'
import OrderInvoice from '../components/OrderInvoice.vue'
import OrderFilter from '../components/OrderFilter.vue'
import { ordersService } from '../services/orders.service'
import { usePagination } from '@/hooks/usePagination'
import { formatCurrency, formatDate } from '@/utils/formatDate'
import type { Order, OrderFilter as OrderFilterType } from '../types/order.types'
import { ORDER_STATUS } from '../types/order.types'

const orders = ref<Order[]>([])
const loading = ref(false)
const modalVisible = ref(false)
const invoiceModalVisible = ref(false)
const selectedOrder = ref<Order | null>(null)
const filters = ref<OrderFilterType>({})

const { pagination, setPage, setLimit, setTotal } = usePagination()

const itemColumns = [
  { title: 'Tên', dataIndex: 'productName', key: 'productName' },
  { title: 'Loại', dataIndex: 'productType', key: 'productType' },
  { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity' },
  { title: 'Thành tiền', key: 'subtotal' }
]

const fetchOrders = async () => {
  loading.value = true
  try {
    const response = await ordersService.getOrders({
      ...filters.value
    })
    if (response.success && response.data) {
      orders.value = response.data
      setTotal(response.data.length)
    }
  } catch (error: any) {
    message.error(error.message || 'Không thể tải danh sách đơn hàng')
  } finally {
    loading.value = false
  }
}

const handleFilter = (newFilters: OrderFilterType) => {
  filters.value = newFilters
  setPage(1)
  fetchOrders()
}

const handleView = (order: Order) => {
  selectedOrder.value = order
  modalVisible.value = true
}

const handlePrint = (order: Order) => {
  selectedOrder.value = order
  invoiceModalVisible.value = true
}

const handlePrintInvoice = () => {
  // Create a new window for printing
  const printWindow = window.open('', '_blank')
  if (!printWindow) return
  
  const invoiceElement = document.querySelector('.invoice-container')
  if (!invoiceElement) return
  
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Hóa đơn - ${selectedOrder.value?.clientName}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Times New Roman', serif;
            color: #000;
            background: white;
          }
          ${getInvoiceStyles()}
        </style>
      </head>
      <body>
        ${invoiceElement.innerHTML}
      </body>
    </html>
  `)
  
  printWindow.document.close()
  printWindow.focus()
  
  setTimeout(() => {
    printWindow.print()
    printWindow.close()
  }, 250)
}

const getInvoiceStyles = () => {
  return `
    .invoice-container {
      padding: 40px;
      max-width: 210mm;
      margin: 0 auto;
    }
    .invoice-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #000;
    }
    .company-name {
      font-size: 24px;
      font-weight: bold;
      color: #e91e63;
      margin-bottom: 10px;
    }
    .company-info p {
      margin: 5px 0;
      font-size: 14px;
    }
    .invoice-title {
      text-align: right;
    }
    .invoice-title h2 {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 10px;
      color: #e91e63;
    }
    .invoice-title p {
      margin: 5px 0;
      font-size: 14px;
    }
    .customer-info, .items-section {
      margin-bottom: 30px;
    }
    h3 {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 15px;
      color: #333;
      text-transform: uppercase;
    }
    .info-table {
      width: 100%;
      border-collapse: collapse;
    }
    .info-table td {
      padding: 8px 0;
      font-size: 14px;
    }
    .info-table .label {
      width: 150px;
      font-weight: bold;
    }
    .items-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }
    .items-table th, .items-table td {
      border: 1px solid #ddd;
      padding: 10px;
      font-size: 14px;
    }
    .items-table th {
      background-color: #f5f5f5;
      font-weight: bold;
      text-align: left;
    }
    .text-center {
      text-align: center;
    }
    .text-right {
      text-align: right;
    }
    .summary-section {
      margin: 30px 0;
      display: flex;
      justify-content: flex-end;
    }
    .summary-table {
      width: 400px;
      border-collapse: collapse;
    }
    .summary-table td {
      padding: 10px;
      font-size: 14px;
    }
    .summary-table .label {
      text-align: right;
      font-weight: bold;
      width: 200px;
    }
    .summary-table .amount {
      text-align: right;
      width: 200px;
    }
    .summary-table .discount {
      color: #e91e63;
    }
    .total-row {
      border-top: 2px solid #000;
      border-bottom: 1px solid #000;
    }
    .total-row td {
      font-size: 16px;
      font-weight: bold;
      padding: 15px 10px;
    }
    .remaining-row {
      border-bottom: 2px solid #000;
    }
    .remaining-row td {
      font-size: 15px;
      font-weight: bold;
      color: #e91e63;
    }
    .payment-info {
      margin: 20px 0;
      padding: 15px;
      background-color: #f9f9f9;
      border-left: 4px solid #e91e63;
    }
    .payment-info p {
      margin: 8px 0;
      font-size: 14px;
    }
    .footer {
      margin-top: 50px;
    }
    .signature-section {
      display: flex;
      justify-content: space-around;
      margin-bottom: 30px;
    }
    .signature-box {
      text-align: center;
      width: 200px;
    }
    .signature-title {
      font-weight: bold;
      margin-bottom: 80px;
      font-size: 14px;
    }
    .signature-note {
      font-size: 12px;
      font-style: italic;
      color: #666;
    }
    .thank-you {
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      color: #e91e63;
      margin-top: 20px;
    }
    @media print {
      @page {
        size: A4;
        margin: 15mm;
      }
    }
  `
}

const handleDelete = (id: string) => {
  Modal.confirm({
    title: 'Xác nhận xóa',
    content: 'Bạn có chắc chắn muốn xóa đơn hàng này?',
    okText: 'Xóa',
    okType: 'danger',
    cancelText: 'Hủy',
    async onOk() {
      try {
        await ordersService.deleteOrder(id)
        message.success('Xóa đơn hàng thành công')
        fetchOrders()
      } catch (error: any) {
        message.error(error.message || 'Không thể xóa đơn hàng')
      }
    }
  })
}

const handleUpdateStatus = async (id: string, status: string) => {
  try {
    await ordersService.updateOrderStatus(id, status)
    message.success('Cập nhật trạng thái thành công')
    fetchOrders()
  } catch (error: any) {
    message.error(error.message || 'Không thể cập nhật trạng thái')
  }
}

const handlePageChange = (page: number, pageSize: number) => {
  setPage(page)
  setLimit(pageSize)
}

const getStatusLabel = (status: string) => {
  return ORDER_STATUS.find(s => s.value === status)?.label || status
}

const getStatusColor = (status: string) => {
  return ORDER_STATUS.find(s => s.value === status)?.color || 'default'
}

onMounted(() => {
  fetchOrders()
})
</script>
