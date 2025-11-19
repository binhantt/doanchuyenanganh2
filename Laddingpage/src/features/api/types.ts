/**
 * API Response Types
 * Shared types for all API responses
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  count?: number;
  errors?: ApiError[];
}

export interface ApiError {
  field?: string;
  message: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterParams {
  [key: string]: any;
}

// Package types
export interface PackageFeatures {
  included: string[];
  excluded?: string[];
  highlights?: string[];
}

export interface Package {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  features: PackageFeatures;
  images: string[];
  isPopular?: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Service types
export interface ServiceFeatures {
  included: string[];
  excluded: string[];
  highlights: string[];
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription?: string;
  icon?: string;
  features?: ServiceFeatures;
  basePrice: number;
  images?: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Product types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  material?: string;
  features?: string[];
  images?: string[];
  stockQuantity: number;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Gallery types
export interface Gallery {
  id: string;
  title: string;
  altText: string;
  fileName: string;
  filePath: string;
  fileUrl: string;
  mimeType: string;
  fileSize: number;
  width?: number;
  height?: number;
  category: string;
  relatedId?: string;
  relatedType?: string;
  displayOrder: number;
  isPrimary: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Testimonial types
export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  content: string;
  rating: number;
  eventDate: string;
  location: string;
  language: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// FAQ types
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Consultation types
export interface Consultation {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  message: string;
  serviceType?: string;
  preferredDate?: string;
  status: 'pending' | 'contacted' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

// API Request types
export interface CreatePackageRequest {
  name: string;
  slug: string;
  description: string;
  price: number;
  features: PackageFeatures;
  images?: string[];
  isPopular?: boolean;
  isActive: boolean;
}

export interface CreateServiceRequest {
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription?: string;
  icon?: string;
  features?: ServiceFeatures;
  basePrice: number;
  images?: string[];
  isActive: boolean;
}

export interface CreateProductRequest {
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  material?: string;
  features?: string[];
  images?: string[];
  stockQuantity: number;
  isFeatured: boolean;
  isActive: boolean;
}

export interface CreateConsultationRequest {
  customerName: string;
  email: string;
  phone: string;
  message: string;
  serviceType?: string;
  preferredDate?: string;
}
