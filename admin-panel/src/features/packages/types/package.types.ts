export interface PackageFeatures {
  included: string[]
  excluded?: string[]
  highlights?: string[]
}

export interface Package {
  id: string
  name: string
  slug: string
  description: string
  price: number
  features: PackageFeatures
  images: string[]
  isPopular: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface PackageFormData {
  name: string
  slug: string
  description: string
  price: number
  features: PackageFeatures
  images: string[]
  isPopular: boolean
  isActive: boolean
}

export interface PackageFilter {
  keyword?: string
  isActive?: boolean
  isPopular?: boolean
  minPrice?: number
  maxPrice?: number
  sortBy?: 'name' | 'price' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}
