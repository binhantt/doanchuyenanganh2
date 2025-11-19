export interface Category {
  id: number
  name: string
  slug: string
  description: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CategoryFormData {
  name: string
  slug: string
  description?: string
  isActive: boolean
}

export interface CategoryFilter {
  keyword?: string
  isActive?: boolean
  sortBy?: 'name' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}
