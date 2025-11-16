'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Check, Sparkles, Camera, Heart, Video, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { servicesApi, Service } from '@/src/features/api';
import PromotionInput from '@/src/features/order/components/PromotionInput';

interface ServiceDetailPageProps {
  slug: string;
}

export default function ServiceDetailPage({ slug }: ServiceDetailPageProps) {
  const router = useRouter();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedPromotionCode, setAppliedPromotionCode] = useState<string | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await servicesApi.getBySlug(slug);
        
        if (response.success && response.data) {
          setService(response.data);
        } else {
          setError('Không tìm thấy dịch vụ');
        }
      } catch (err) {
        console.error('Failed to fetch service:', err);
        setError('Không thể tải thông tin dịch vụ');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  const handlePromotionApplied = (discount: number, code: string) => {
    setDiscountAmount(discount);
    setAppliedPromotionCode(code);
  };

  const handlePromotionRemoved = () => {
    setDiscountAmount(0);
    setAppliedPromotionCode(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Không tìm thấy dịch vụ'}
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
    video: Video,
    heart: Heart,
  };

  const Icon = iconMap[service.icon?.toLowerCase() || 'sparkles'] || Sparkles;

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
        {service.images && service.images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {service.images.map((img: string, idx: number) => (
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
      {service.features && (
        <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
            Chi Tiết Dịch Vụ
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Included Features */}
            {service.features.included && service.features.included.length > 0 && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Dịch Vụ Bao Gồm
                  </h3>
                </div>
                <ul className="space-y-3">
                  {service.features.included.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Excluded Features */}
            {service.features.excluded && service.features.excluded.length > 0 && (
              <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-8 border-2 border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
                    <X className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Không Bao Gồm
                  </h3>
                </div>
                <ul className="space-y-3">
                  {service.features.excluded.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <X className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Highlights */}
          {service.features.highlights && service.features.highlights.length > 0 && (
            <div className="mt-12 max-w-5xl mx-auto">
              <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6 text-center">
                  ✨ Điểm Nổi Bật
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {service.features.highlights.map((item: string, idx: number) => (
                    <div key={idx} className="text-center">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <p className="font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Pricing */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-white to-pink-50/30">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
          Giá Dịch Vụ
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Giá cơ bản cho dịch vụ này. Liên hệ với chúng tôi để được tư vấn gói dịch vụ phù hợp nhất.
        </p>

        <div className="max-w-2xl mx-auto space-y-6">
    =

          {/* Price Card */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-rose-200">
            <div className="text-center mb-6">
              <p className="text-gray-600 mb-2">Giá từ</p>
              
              {discountAmount > 0 && (
                <div className="mb-2">
                  <span className="text-2xl text-gray-400 line-through">
                    {formatPrice(service.basePrice)}đ
                  </span>
                </div>
              )}
              
              <div className="text-5xl font-bold text-rose-600 mb-2">
                {formatPrice(service.basePrice - discountAmount)}đ
              </div>
              
              {discountAmount > 0 && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border-2 border-green-200 rounded-full mb-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-700">
                    Tiết kiệm {formatPrice(discountAmount)}đ
                  </span>
                </div>
              )}
              
              <p className="text-gray-500 text-sm">Giá có thể thay đổi tùy theo yêu cầu</p>
            </div>
            
            <button
              onClick={() => router.push('/booking')}
              className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Đặt Lịch Tư Vấn Ngay
            </button>
          </div>
        </div>
      </section>

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
