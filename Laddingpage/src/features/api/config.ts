/**
 * API Configuration
 * Centralized configuration for all API calls
 */

export const API_CONFIG = {
  // Base URLs
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  API_PREFIX: '/api',

  // Timeouts
  TIMEOUT: 30000,

  // Retry configuration
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,

  // Cache configuration
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes

  // Endpoints
  ENDPOINTS: {
    // User/Public endpoints
    USER: {
      AUTH_LOGIN: '/user/auth/login',
      AUTH_REGISTER: '/user/auth/register',
      AUTH_VERIFY: '/user/auth/verify',
      INVITATIONS: '/user/invitations',
      PACKAGES: '/user/packages',
      PACKAGES_POPULAR: '/user/packages/popular',
      PACKAGES_SLUG: '/user/packages/slug',
      SERVICES: '/user/services',
      SERVICES_AVAILABLE: '/user/services/available',
      PRODUCTS: '/user/products',
      PRODUCTS_FEATURED: '/user/products/featured',
      PRODUCTS_CATEGORY: '/user/products/category',
      GALLERY: '/user/galleries',
      GALLERY_RELATED: '/user/galleries/related',
      TESTIMONIALS: '/user/testimonials',
      FAQ: '/user/faqs',
      CONSULTATIONS: '/user/consultations',
      ORDERS: '/user/orders',
      DECORATIONS: '/user/decorations',
      VOUCHERS: '/user/vouchers',
      PROMOTIONS: '/user/promotions',
    },
    // Admin endpoints
    ADMIN: {
      PACKAGES: '/admin/packages',
      SERVICES: '/admin/services',
      PRODUCTS: '/admin/products',
      GALLERY: '/admin/galleries',
      TESTIMONIALS: '/admin/testimonials',
      FAQ: '/admin/faqs',
      CONSULTATIONS: '/admin/consultations',
      ORDERS: '/admin/orders',
      DECORATIONS: '/admin/decorations',
      PROMOTIONS: '/admin/promotions',
      STATS: '/admin/stats',
    },
  },
};

export const getFullUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.API_PREFIX}${endpoint}`;
};
