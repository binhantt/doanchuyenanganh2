'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Check, Sparkles, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/src/features/order/store/useCartStore';
import { packagesApi } from '@/src/features/api';
import { useState, useEffect } from 'react';
import { Package } from '../types';

interface PackageDetailPageProps {
  packageId: string;
}

export default function PackageDetailPage({ packageId }: PackageDetailPageProps) {
  const router = useRouter();
  const { addItem } = useCartStore();
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [packageDetail, setPackageDetail] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        setLoading(true);
        const response = await packagesApi.getById(packageId);
        
        if (response.success && response.data) {
          setPackageDetail(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch package:', error);
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
      name: packageDetail.name,
      description: packageDetail.description || '',
      price: packageDetail.price,
      type: 'package',
      image: packageDetail.images?.[0] || '',
    });

    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
      </div>
    );
  }

  if (!packageDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Không tìm thấy gói dịch vụ</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  const images = packageDetail.images || [];
  const mainImage = images[selectedImageIndex] || images[0];
  const features = packageDetail.features?.included || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-rose-50/20 to-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-rose-100">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-rose-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Quay lại</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images Section */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-rose-100 to-pink-100">
              {mainImage ? (
                <Image
                  src={mainImage}
                  alt={packageDetail.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized={
                    mainImage.startsWith('http://localhost') ||
                    mainImage.startsWith('http://192.168.')
                  }
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-rose-400">
                  <Sparkles className="w-12 h-12 mb-2" />
                  <p>Chưa có ảnh</p>
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto py-2" style={{ scrollbarWidth: 'none' }}>
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative flex-shrink-0 w-24 h-20 rounded-xl overflow-hidden shadow-md transition-all duration-200 ${
                      idx === selectedImageIndex
                        ? 'ring-2 ring-rose-500 scale-105'
                        : 'hover:scale-105 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${packageDetail.name} ${idx + 1}`}
                      fill
                      className="object-cover"
                      unoptimized={
                        img.startsWith('http://localhost') ||
                        img.startsWith('http://192.168.')
                      }
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Badge */}
            {(packageDetail.popular || packageDetail.isPopular) && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 text-rose-600 rounded-full text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>Gói phổ biến</span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900">{packageDetail.name}</h1>

            {/* Description */}
            {packageDetail.description && (
              <p className="text-lg text-gray-600 leading-relaxed">{packageDetail.description}</p>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-rose-600">
                {new Intl.NumberFormat('vi-VN').format(packageDetail.price)}
              </span>
              <span className="text-lg text-gray-500">{packageDetail.currency || 'VNĐ'}</span>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-900">Dịch vụ bao gồm:</h3>
              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 px-6 py-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Thêm vào giỏ hàng
              </button>
              <button
                onClick={() => router.push('/order')}
                className="px-6 py-4 rounded-full border-2 border-rose-300 text-rose-600 font-semibold bg-white hover:bg-rose-50 hover:border-rose-400 transition-all duration-300"
              >
                Đặt ngay
              </button>
            </div>

            {/* Success Message */}
            {showAddedMessage && (
              <div className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg animate-in slide-in-from-bottom-5 z-50">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  <span>Đã thêm vào giỏ hàng!</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
