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
  albumId: string | null
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
  albumId?: string
  relatedType: 'service' | 'package' | 'product' | 'decoration' | 'general'
  relatedId?: string
  isPrimary?: boolean
  displayOrder?: number
  isActive?: boolean
}

export interface Album {
  id: string
  name: string
  description: string | null
  coverImageId: string | null
  coverImageUrl: string | null
  imageCount: number
  displayOrder: number
  isActive: number
  createdAt: string
  updatedAt: string
}

export interface AlbumFormData {
  name: string
  description?: string
  coverImageId?: string
  displayOrder?: number
  isActive?: boolean
}

export interface AlbumFilter {
  keyword?: string
  isActive?: boolean
  sortBy?: 'name' | 'displayOrder' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

export interface GalleryFilter {
  keyword?: string
  relatedType?: string
  albumId?: string
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
