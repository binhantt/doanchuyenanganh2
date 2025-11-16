export interface Service {
  id: string
  name: string
  slug: string
  shortDescription: string
  fullDescription: string
  icon: string
  features: string[]
  basePrice: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface ServiceFormData {
  name: string
  slug: string
  shortDescription: string
  fullDescription: string
  icon: string
  features: string[]
  basePrice: number
  isActive: boolean
}

export interface ServiceFilter {
  keyword?: string
  isActive?: boolean
  sortBy?: 'name' | 'basePrice' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}
