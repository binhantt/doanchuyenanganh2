export interface User {
  id: string
  email: string
  fullName: string
  phone: string | null
  role: 'admin' | 'staff'
  isActive: boolean
  emailVerifiedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface UserFormData {
  email: string
  password?: string
  fullName: string
  phone: string | null
  role: 'admin' | 'staff'
  isActive: boolean
}

export interface UserFilter {
  keyword?: string
  role?: string
  isActive?: boolean
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export const USER_ROLES = [
  { value: 'admin', label: 'Quản trị viên', color: 'red' },
  { value: 'staff', label: 'Nhân viên', color: 'blue' }
] as const
