export interface ServiceFeatures {
  included: string[]
  excluded?: string[]
  highlights?: string[]
}

export interface Service {
  id: string
  name: string
  slug: string
  shortDescription: string
  fullDescription: string
  icon: string
  basePrice: number
  isActive: boolean
  features: ServiceFeatures
  images: string[]
  createdAt: string
  updatedAt: string
}

export interface ServiceFormData {
  name: string
  slug: string
  shortDescription: string
  fullDescription: string
  icon: string
  basePrice: number
  isActive: boolean
  features: ServiceFeatures
  images: string[]
}

export interface ServiceFilter {
  keyword?: string
  isActive?: boolean
  sortBy?: 'name' | 'basePrice' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}
