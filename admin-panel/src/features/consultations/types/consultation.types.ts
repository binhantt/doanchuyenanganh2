export interface Consultation {
  id: string
  clientName: string
  clientEmail: string
  clientPhone: string
  weddingDate: string
  guestCount: number
  venue: string
  serviceType: string
  budget: string
  notes?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: string
  updatedAt: string
}

export interface ConsultationFilter {
  keyword?: string
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  dateFrom?: string
  dateTo?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export const CONSULTATION_STATUS = [
  { label: 'Chờ xử lý', value: 'pending', color: 'orange' },
  { label: 'Đã xác nhận', value: 'confirmed', color: 'blue' },
  { label: 'Hoàn thành', value: 'completed', color: 'green' },
  { label: 'Đã hủy', value: 'cancelled', color: 'red' }
]
