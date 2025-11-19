export interface OrderItem {
  id: string
  productId: string
  productName: string
  productType: 'package' | 'service' | 'product' | 'menu'
  quantity: number
  unitPrice: number
  subtotal: number
  description?: string
}

export interface Order {
  id: string
  clientName: string
  clientEmail: string
  clientPhone: string
  weddingDate: string
  guestCount: number
  venue: string
  notes: string
  items: OrderItem[]
  paymentMethod: 'bank_transfer' | 'momo' | 'zalopay' | 'cash'
  totalAmount: number
  depositAmount: number
  status: 'pending' | 'confirmed' | 'paid' | 'completed' | 'cancelled'
  promotionId?: string | null
  promotionCode?: string | null
  discountAmount: number
  finalAmount: number
  createdAt: string
  updatedAt: string
}

export interface OrderFilter {
  keyword?: string
  status?: string
  paymentMethod?: string
  startDate?: string
  endDate?: string
  sortBy?: 'weddingDate' | 'totalAmount' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

export const ORDER_STATUS = [
  { label: 'Chờ xác nhận', value: 'pending', color: 'orange' },
  { label: 'Đã xác nhận', value: 'confirmed', color: 'blue' },
  { label: 'Đã thanh toán', value: 'paid', color: 'green' },
  { label: 'Hoàn thành', value: 'completed', color: 'success' },
  { label: 'Đã hủy', value: 'cancelled', color: 'error' }
]

export const PAYMENT_METHODS = [
  { label: 'Chuyển khoản', value: 'bank_transfer' },
  { label: 'MoMo', value: 'momo' },
  { label: 'ZaloPay', value: 'zalopay' },
  { label: 'Tiền mặt', value: 'cash' }
]
