/**
 * API Module
 * Central export point for all API services
 */

export * as authApi from './auth';
export { invitationsApi } from './invitations';
export { packagesApi } from './packages';
export { servicesApi } from './services';
export { productsApi } from './products';
export { testimonialsApi } from './testimonials';
export { galleryApi } from './gallery';
export { faqApi } from './faq';
export { consultationsApi } from './consultations';
export { ordersApi } from './orders';
export { vouchersApi } from './vouchers';
export { promotionsApi } from './promotions';

export { default as apiClient } from './client';
export { API_CONFIG, getFullUrl } from './config';

export type {
  ApiResponse,
  ApiError,
  PaginationParams,
  FilterParams,
  Package,
  Service,
  Product,
  Gallery,
  Testimonial,
  FAQ,
  Consultation,
  CreatePackageRequest,
  CreateServiceRequest,
  CreateProductRequest,
  CreateConsultationRequest,
} from './types';
