export interface ServiceDetail {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  features: string[];
  basePrice: number;
  isActive: boolean;
  gallery: string[];
  detailedFeatures: Array<{ category: string; items: string[] }>;
  packages: Array<{ id: string; name: string; price: number; popular?: boolean; features?: string[] }>;
  faqs: Array<{ question: string; answer: string }>;
}

export const defaultServices: ServiceDetail[] = [
  {
    id: '1',
    name: 'Trang Trí Tiệc Cưới',
    slug: 'trang-tri-tiec-cuoi',
    shortDescription: 'Trang trí tiệc cưới chuyên nghiệp',
    fullDescription: 'Dịch vụ trang trí tiệc cưới với thiết kế độc đáo, sang trọng',
    icon: 'sparkle',
    basePrice: 50000000,
    isActive: true,
    features: ['Thiết kế độc đáo', 'Trang trí sang trọng', 'Hỗ trợ setup'],
    gallery: ['https://images.unsplash.com/photo-1519741497674-611481863552?w=800'],
    detailedFeatures: [
      {
        category: 'Trang Trí',
        items: ['Backdrop chuyên nghiệp', 'Ánh sáng nghệ thuật', 'Hoa tươi cao cấp'],
      },
    ],
    packages: [
      { id: '1', name: 'Gói Basic', price: 50000000 },
      { id: '2', name: 'Gói Premium', price: 100000000, popular: true },
    ],
    faqs: [
      { question: 'Giá dịch vụ bao gồm gì?', answer: 'Giá bao gồm trang trí, setup và hỗ trợ' },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return defaultServices.find(service => service.slug === slug);
}
