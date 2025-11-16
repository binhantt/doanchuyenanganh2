// This file is deprecated - use API data instead
// Kept for backward compatibility only

export interface ServiceFeatures {
  included: string[];
  excluded?: string[];
  highlights?: string[];
}

export interface ServiceDetail {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  features: ServiceFeatures;
  basePrice: number;
  isActive: boolean;
  images: string[];
}

export const defaultServices: ServiceDetail[] = [];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return defaultServices.find(service => service.slug === slug);
}
