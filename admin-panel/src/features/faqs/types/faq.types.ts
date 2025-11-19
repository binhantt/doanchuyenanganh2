export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  language: string
  displayOrder: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface FAQFormData {
  question: string
  answer: string
  category: string
  language?: string
  displayOrder?: number
  isActive?: boolean
}

export interface FAQFilter {
  keyword?: string
  category?: string
  isActive?: boolean
  sortBy?: 'question' | 'displayOrder' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

export const FAQ_CATEGORIES = [
  { label: 'Dịch vụ', value: 'service' },
  { label: 'Giá cả', value: 'pricing' },
  { label: 'Đặt hàng', value: 'booking' },
  { label: 'Thanh toán', value: 'payment' },
  { label: 'Chung', value: 'general' }
]
