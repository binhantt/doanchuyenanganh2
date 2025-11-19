export interface Promotion {
  id: string
  code: string
  title: string
  description: string
  discountType: 'percentage' | 'fixed'
  discountValue: number
  maxDiscount?: number
  minOrderAmount?: number
  applicableServices?: string[]
  applicablePackages?: string[]
  startDate: string
  endDate: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface PromotionFormData {
  code: string
  title: string
  description: string
  discountType: 'percentage' | 'fixed'
  discountValue: number
  maxDiscount?: number
  minOrderAmount?: number
  applicableServices?: string[]
  applicablePackages?: string[]
  startDate: string
  endDate: string
  isActive: boolean
}

export interface PromotionFilter {
  keyword?: string
  isActive?: boolean
  discountType?: 'percentage' | 'fixed'
  sortBy?: 'code' | 'discountValue' | 'startDate' | 'endDate'
  sortOrder?: 'asc' | 'desc'
}
