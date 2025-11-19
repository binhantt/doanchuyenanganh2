export interface Gallery {
  id: string
  title: string
  altText: string | null
  fileName: string
  filePath: string
  fileUrl: string
  mimeType: string
  fileSize: number
  fileSizeKB: number
  fileSizeMB: number
  width: number | null
  height: number | null
  dimensions: string | null
  category: string
  relatedId: string | null
  relatedType: 'service' | 'package' | 'product' | 'decoration' | 'general'
  displayOrder: number
  isPrimary: number
  isActive: number
  createdAt: string
  updatedAt: string
}

export interface GalleryFormData {
  fileUrl: string
  title: string
  altText?: string
  fileName?: string
  category?: string
  relatedType: 'service' | 'package' | 'product' | 'decoration' | 'general'
  relatedId?: string
  isPrimary?: boolean
  displayOrder?: number
  isActive?: boolean
}

export interface GalleryFilter {
  keyword?: string
  relatedType?: string
  isActive?: boolean
  sortBy?: 'title' | 'displayOrder' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

export const RELATED_TYPES = [
  { label: 'Dịch vụ', value: 'service' },
  { label: 'Gói dịch vụ', value: 'package' },
  { label: 'Sản phẩm', value: 'product' },
  { label: 'Trang trí', value: 'decoration' },
  { label: 'Chung', value: 'general' }
]
