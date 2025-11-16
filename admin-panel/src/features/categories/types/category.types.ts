export interface Category {
  id: number
  name: string
  description?: string
  image?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CategoryFormData {
  name: string
  description?: string
  image?: string
  isActive: boolean
}

export interface CategoryFilter {
  keyword?: string
  isActive?: boolean
  sortBy?: 'name' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}
