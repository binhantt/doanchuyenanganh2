<template>
  <div class="invoice-container" ref="invoiceRef">
    <div class="invoice-header">
      <div class="company-info">
        <h1 class="company-name">WEDDING PLANNER</h1>
        <p>Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM</p>
        <p>Điện thoại: 0123 456 789</p>
        <p>Email: contact@weddingplanner.vn</p>
      </div>
      <div class="invoice-title">
        <h2>HÓA ĐƠN</h2>
        <p>Số: {{ order.id.substring(0, 8).toUpperCase() }}</p>
        <p>Ngày: {{ formatDate(order.createdAt) }}</p>
      </div>
    </div>

    <div class="customer-info">
      <h3>THÔNG TIN KHÁCH HÀNG</h3>
      <table class="info-table">
        <tr>
          <td class="label">Họ tên:</td>
          <td>{{ order.clientName }}</td>
        </tr>
        <tr>
          <td class="label">Điện thoại:</td>
          <td>{{ order.clientPhone }}</td>
        </tr>
        <tr>
          <td class="label">Email:</td>
          <td>{{ order.clientEmail }}</td>
        </tr>
        <tr>
          <td class="label">Ngày cưới:</td>
          <td>{{ formatDate(order.weddingDate) }}</td>
        </tr>
        <tr>
          <td class="label">Địa điểm:</td>
          <td>{{ order.venue }}</td>
        </tr>
        <tr>
          <td class="label">Số khách:</td>
          <td>{{ order.guestCount }} người</td>
        </tr>
      </table>
    </div>

    <div class="items-section">
      <h3>CHI TIẾT DỊCH VỤ</h3>
      <table class="items-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên dịch vụ</th>
            <th>Loại</th>
            <th>Số lượng</th>
            <th>Đơn giá</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in order.items" :key="item.id">
            <td class="text-center">{{ index + 1 }}</td>
            <td>{{ item.productName }}</td>
            <td class="text-center">{{ getProductTypeLabel(item.productType) }}</td>
            <td class="text-center">{{ item.quantity }}</td>
            <td class="text-right">{{ formatCurrency(item.unitPrice) }}</td>
            <td class="text-right">{{ formatCurrency(item.subtotal) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="summary-section">
      <table class="summary-table">
        <tr>
          <td class="label">Tổng tiền:</td>
          <td class="amount">{{ formatCurrency(order.totalAmount) }}</td>
        </tr>
        <tr v-if="order.discountAmount > 0">
          <td class="label">Giảm giá ({{ order.promotionCode }}):</td>
          <td class="amount discount">-{{ formatCurrency(order.discountAmount) }}</td>
        </tr>
        <tr class="total-row">
          <td class="label">Thành tiền:</td>
          <td class="amount">{{ formatCurrency(order.finalAmount) }}</td>
        </tr>
        <tr>
          <td class="label">Đã đặt cọc:</td>
          <td class="amount">{{ formatCurrency(order.depositAmount) }}</td>
        </tr>
        <tr class="remaining-row">
          <td class="label">Còn lại:</td>
          <td class="amount">{{ formatCurrency(order.finalAmount - order.depositAmount) }}</td>
        </tr>
      </table>
    </div>

    <div class="payment-info">
      <p><strong>Phương thức thanh toán:</strong> {{ getPaymentMethodLabel(order.paymentMethod) }}</p>
      <p v-if="order.notes"><strong>Ghi chú:</strong> {{ order.notes }}</p>
    </div>

    <div class="footer">
      <div class="signature-section">
        <div class="signature-box">
          <p class="signature-title">Khách hàng</p>
          <p class="signature-note">(Ký và ghi rõ họ tên)</p>
        </div>
        <div class="signature-box">
          <p class="signature-title">Người lập</p>
          <p class="signature-note">(Ký và ghi rõ họ tên)</p>
        </div>
      </div>
      <p class="thank-you">Cảm ơn quý khách đã sử dụng dịch vụ!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCurrency, formatDate } from '@/utils/formatDate'
import type { Order } from '../types/order.types'

defineProps<{
  order: Order
}>()

const getProductTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    package: 'Gói dịch vụ',
    service: 'Dịch vụ',
    product: 'Sản phẩm',
    menu: 'Thực đơn'
  }
  return labels[type] || type
}

const getPaymentMethodLabel = (method: string) => {
  const labels: Record<string, string> = {
    bank_transfer: 'Chuyển khoản ngân hàng',
    momo: 'Ví MoMo',
    zalopay: 'Ví ZaloPay',
    cash: 'Tiền mặt'
  }
  return labels[method] || method
}
</script>

<style scoped>
.invoice-container {
  background: white;
  padding: 40px;
  max-width: 210mm;
  margin: 0 auto;
  font-family: 'Times New Roman', serif;
  color: #000;
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

.customer-info,
.items-section {
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

.items-table th,
.items-table td {
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
  .invoice-container {
    padding: 20px;
  }
  
  @page {
    size: A4;
    margin: 15mm;
  }
}
</style>
