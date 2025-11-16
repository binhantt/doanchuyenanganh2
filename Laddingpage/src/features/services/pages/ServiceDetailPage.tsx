'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Check, Sparkles, Camera, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { servicesApi } from '@/src/features/api';
import { getServiceBySlug } from '../data/servicesData';

interface ServiceDetailPageProps {
  slug: string;
}


export default function ServiceDetailPage({ slug }: ServiceDetailPageProps) {
  const router = useRouter();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const response = await servicesApi.getBySlug(slug);
        
        if (response.success && response.data) {
          const apiService = response.data;
          setService({
            id: apiService.id,
            name: apiService.name,
            slug: apiService.slug,
            shortDescription: apiService.shortDescription,
            fullDescription: apiService.fullDescription || apiService.shortDescription,
            icon: apiService.icon || 'sparkle',
            features: apiService.features || [],
            basePrice: apiService.basePrice,
            isActive: apiService.isActive,
            gallery: [],
            detailedFeatures: [
              {
                category: 'Dịch Vụ Chính',
                items: apiService.features || [],
              },
            ],
            packages: [
              {
                id: '1',
                name: 'Gói Cơ Bản',
                price: apiService.basePrice,
                features: apiService.features?.slice(0, 3) || [],
              },
              {
                id: '2',
                name: 'Gói Cao Cấp',
                price: Math.round(apiService.basePrice * 1.5),
                popular: true,
                features: apiService.features || [],
              },
              {
                id: '3',
                name: 'Gói VIP',
                price: Math.round(apiService.basePrice * 2),
                features: [...(apiService.features || []), 'Hỗ trợ 24/7', 'Chỉnh sửa không giới hạn'],
              },
            ],
            faqs: [
              {
                question: 'Dịch vụ này bao gồm những gì?',
                answer: apiService.features?.join(', ') || 'Xem chi tiết dịch vụ ở trên',
              },
              {
                question: 'Có thể tùy chỉnh gói dịch vụ không?',
                answer: 'Có, chúng tôi có thể tùy chỉnh gói dịch vụ theo nhu cầu của bạn. Vui lòng liên hệ để tư vấn.',
              },
            ],
          });
        } else {
          // Fallback to local data
          const localService = getServiceBySlug(slug);
          setService(localService);
        }
      } catch (error) {
        console.error('Failed to fetch service:', error);
        // Fallback to local data
        const localService = getServiceBySlug(slug);
        setService(localService);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Không tìm thấy dịch vụ
          </h1>
          <button
            onClick={() => router.back()}
            className="text-rose-600 hover:text-rose-700 font-medium"
          >
            ← Quay lại
          </button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const iconMap: Record<string, any> = {
    sparkles: Sparkles,
    camera: Camera,
    Camera: Camera,
    sparkle: Heart,
    Heart: Heart,
  };

  const Icon = iconMap[service.icon?.toLowerCase()] || iconMap[service.icon] || Sparkles;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-pink-50/30 to-white">
      {/* Back Button */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-rose-600 transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại
        </button>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full mb-6">
            <Icon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {service.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {service.fullDescription}
          </p>
        </div>

        {/* Gallery */}
        {service.gallery.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {service.gallery.map((img: string, idx: number) => (
              <div
                key={idx}
                className="relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
              >
                <Image
                  src={img}
                  alt={`${service.name} ${idx + 1}`}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Features */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
          Dịch Vụ Bao Gồm
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {service.detailedFeatures.map((category: any, idx: number) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 border-2 border-rose-200 hover:border-rose-400 transition-colors"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {category.category}
              </h3>
              <ul className="space-y-3">
                {category.items.map((item: string, itemIdx: number) => (
                  <li key={itemIdx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

    

      {/* FAQs */}
      {service.faqs.length > 0 && (
        <section className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
            Câu Hỏi Thường Gặp
          </h2>

          <div className="space-y-4">
            {service.faqs.map((faq: any, idx: number) => (
              <details
                key={idx}
                className="group bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border-2 border-rose-100"
              >
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-gray-900">
                  <span>{faq.question}</span>
                  <svg
                    className="w-5 h-5 text-rose-600 group-open:rotate-180 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Quan Tâm Đến Dịch Vụ Này?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Liên hệ với chúng tôi ngay để được tư vấn chi tiết và nhận ưu đãi
            đặc biệt
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/booking')}
              className="px-8 py-4 bg-white text-rose-600 font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Đặt Lịch Tư Vấn Ngay
            </button>
            <button
              onClick={() => router.push('/#services')}
              className="px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white hover:bg-white/10 transition-all duration-300"
            >
              Xem Dịch Vụ Khác
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
