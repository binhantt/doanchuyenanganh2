export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  category: string
  categoryId: number | null
  material: string | null
  features: string[]
  images: string[]
  stockQuantity: number
  isFeatured: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface ProductFormData {
  name: string
  slug: string
  description: string
  price: number
  category: string
  categoryId?: number
  material: string | null
  features: string[]
  images: string[]
  stockQuantity: number
  isFeatured: boolean
  isActive: boolean
}

export interface ProductFilter {
  keyword?: string
  category?: string
  isActive?: boolean
  isFeatured?: boolean
  inStock?: boolean
  sortBy?: 'name' | 'price' | 'stockQuantity' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

export const PRODUCT_CATEGORIES = [
  { label: 'Trang sức', value: 'jewelry' },
  { label: 'Phụ kiện', value: 'accessories' },
  { label: 'Trang trí', value: 'decoration' },
  { label: 'Quà tặng', value: 'gift' },
  { label: 'Khác', value: 'other' }
]
