export interface Testimonial {
  id: string
  clientName: string
  clientRole: string
  content: string
  rating: number
  eventDate: string
  location: string
  language: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface TestimonialFormData {
  clientName: string
  clientRole: string
  content: string
  rating: number
  eventDate: string
  location: string
  language: string
  isActive?: boolean
}

export interface TestimonialFilter {
  keyword?: string
  rating?: number
  isActive?: boolean
  language?: string
  sortBy?: 'clientName' | 'rating' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

export const TESTIMONIAL_LANGUAGES = [
  { label: 'Tiếng Việt', value: 'vi' },
  { label: 'English', value: 'en' }
]

export const RATING_OPTIONS = [
  { label: '5 sao', value: 5 },
  { label: '4 sao', value: 4 },
  { label: '3 sao', value: 3 },
  { label: '2 sao', value: 2 },
  { label: '1 sao', value: 1 }
]
