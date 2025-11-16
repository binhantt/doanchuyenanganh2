'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  ArrowLeft,
  Check,
  X,
  Clock,
  Users,
  Calendar,
  Sparkles,
  ShoppingCart,
} from 'lucide-react';
import { useCartStore } from '@/src/features/order/store/useCartStore';
import { packagesApi, Package } from '@/src/features/api';
import { useState, useEffect } from 'react';

interface PackageDetailPageProps {
  packageId: string;
}

export default function PackageDetailPage({
  packageId,
}: PackageDetailPageProps) {
  const router = useRouter();
  const { addItem } = useCartStore();
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [packageDetail, setPackageDetail] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await packagesApi.getById(packageId);

        if (response.success && response.data) {
          setPackageDetail(response.data);
        } else {
          setError('Không tìm thấy gói dịch vụ');
        }
      } catch (err) {
        console.error('Failed to fetch package:', err);
        setError('Không thể tải thông tin gói');
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [packageId]);

  const handleAddToCart = () => {
    if (!packageDetail) return;

    addItem({
      id: packageDetail.id,
      type: 'package',
      name: packageDetail.name,
      price: packageDetail.price,
      currency: 'VNĐ',
      image: packageDetail.images?.[0],
      description: packageDetail.description,
    });

    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 3000);
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

  if (error || !packageDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Không tìm thấy gói dịch vụ'}
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
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-gray-200">
              {packageDetail.images && packageDetail.images.length > 0 ? (
                <Image
                  src={packageDetail.images[0]}
                  alt={packageDetail.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
                  <div className="text-center text-gray-600">
                    <p className="text-lg font-semibold">Không có hình ảnh</p>
                  </div>
                </div>
              )}

              {packageDetail.isPopular && (
                <div className="absolute top-6 right-6 bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 shadow-lg">
                  <Sparkles className="w-5 h-5" />
                  Được yêu thích nhất
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {packageDetail.images && packageDetail.images.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {packageDetail.images.slice(1, 4).map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg bg-gray-200"
                  >
                    <Image
                      src={img}
                      alt={`${packageDetail.name} ${idx + 2}`}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="space-y-6">
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
              {packageDetail.name}
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed">
              {packageDetail.description}
            </p>

            {/* Quick Info */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-rose-100">
              <div className="text-center">
                <Users className="w-8 h-8 mx-auto text-rose-600 mb-2" />
                <div className="text-sm text-gray-600">Số khách</div>
                <div className="font-semibold text-gray-900">50-500 khách</div>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 mx-auto text-rose-600 mb-2" />
                <div className="text-sm text-gray-600">Thời gian</div>
                <div className="font-semibold text-gray-900">4-6 tiếng</div>
              </div>
              <div className="text-center">
                <Calendar className="w-8 h-8 mx-auto text-rose-600 mb-2" />
                <div className="text-sm text-gray-600">Setup</div>
                <div className="font-semibold text-gray-900">2-3 tiếng</div>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 border-2 border-rose-200">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-5xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  {formatPrice(packageDetail.price)}
                </span>
                <span className="text-2xl text-gray-600">VNĐ</span>
              </div>
              <p className="text-gray-600 mb-6">Giá trọn gói - Đã bao gồm VAT</p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Thêm Vào Giỏ
                </button>
                <button
                  onClick={() => router.push('/order')}
                  className="flex-1 px-8 py-4 bg-white text-rose-600 font-semibold rounded-full border-2 border-rose-300 hover:bg-rose-50 hover:border-rose-400 transition-all duration-300"
                >
                  Đặt Ngay
                </button>
              </div>

              {/* Added Message */}
              {showAddedMessage && (
                <div className="mt-4 bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-green-700 font-medium">
                    Đã thêm vào giỏ hàng!
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      {packageDetail.features && (
        <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
            Chi Tiết Dịch Vụ
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Includes */}
            {packageDetail.features.included &&
              packageDetail.features.included.length > 0 && (
                <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-green-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Bao Gồm
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {packageDetail.features.included.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check
                          className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                          strokeWidth={2.5}
                        />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {/* Excludes */}
            {packageDetail.features.excluded &&
              packageDetail.features.excluded.length > 0 && (
                <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
                      <X className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Không Bao Gồm
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {packageDetail.features.excluded.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <X
                          className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
                          strokeWidth={2.5}
                        />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>

          {/* Highlights */}
          {packageDetail.features.highlights &&
            packageDetail.features.highlights.length > 0 && (
              <div className="mt-12">
                <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-6 text-center">
                    ✨ Điểm Nổi Bật
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {packageDetail.features.highlights.map((item, idx) => (
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

      {/* CTA Section */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Sẵn Sàng Đặt Gói Này?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Liên hệ với chúng tôi ngay hôm nay để được tư vấn chi tiết và nhận
            ưu đãi đặc biệt
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/#booking')}
              className="px-8 py-4 bg-white text-rose-600 font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Đặt Lịch Tư Vấn Ngay
            </button>
            <button
              onClick={() => router.push('/#packages')}
              className="px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white hover:bg-white/10 transition-all duration-300"
            >
              Xem Gói Khác
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
