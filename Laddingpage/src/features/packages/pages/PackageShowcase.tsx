'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Sparkles, Check } from 'lucide-react';
import { usePackages } from '@/src/features/api/hooks';
import { Package } from '../types';
import { useState } from 'react';
import { useCartStore } from '@/src/features/order/store/useCartStore';

interface PackageShowcaseProps {
  title?: string;
  subtitle?: string;
  limit?: number; // 0 hoặc undefined sẽ hiển thị tất cả
}

export default function PackageShowcase({
  title = 'Gói Dịch Vụ Tiệc Cưới',
  subtitle = 'Chi tiết gói ngay trên trang chủ, hình và mô tả xen kẽ trái / phải',
  limit = 0,
}: PackageShowcaseProps) {
  const router = useRouter();
  const { packages, loading, error } = usePackages({ autoFetch: true });
  const items =
    limit && limit > 0 ? (packages || []).slice(0, limit) : packages || [];

  // Lưu lựa chọn ảnh theo gói
  const [selectedImages, setSelectedImages] = useState<Record<string, number>>(
    {}
  );
  const [expandedFeatures, setExpandedFeatures] = useState<Record<string, boolean>>(
    {}
  );
  const { addItem } = useCartStore();

  const getSelectedIndex = (id: string, total: number) =>
    selectedImages[id] !== undefined ? selectedImages[id] % total : 0;

  const handleSelectImage = (id: string, idx: number) => {
    setSelectedImages((prev) => ({ ...prev, [id]: idx }));
  };

  const handleOrderClick = (pkg: Package) => {
    // Thêm package vào giỏ hàng ngay khi click
    addItem({
      id: pkg.id,
      name: pkg.name,
      description: pkg.description || '',
      price: pkg.price,
      type: 'package',
      image: pkg.images?.[0] || '',
    });
  };

  return (
    <section
      id="packages"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-rose-50/20 to-white"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 rounded-full">
            <Sparkles className="w-4 h-4 text-rose-600" />
            <span className="text-sm font-medium text-rose-600">Bảng giá dịch vụ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
          </div>
        )}

        {error && (
          <div className="text-center py-12 text-red-600 font-semibold">
            Lỗi: {error}
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="text-center py-12 text-gray-600">Không có gói dịch vụ</div>
        )}

        <div className="space-y-16">
          {items.map((pkg: Package, index: number) => {
            const isEven = index % 2 === 0;
            const imagesArr = pkg.images || [];
            const hasImages = imagesArr.length > 0;
            const selectedIdx = hasImages
              ? getSelectedIndex(pkg.id, imagesArr.length)
              : 0;
            const mainImage = hasImages ? imagesArr[selectedIdx] : undefined;
            const features = pkg.features?.included || [];
            const isExpanded = !!expandedFeatures[pkg.id];
            const displayedFeatures = isExpanded ? features : features.slice(0, 4);
            return (
              <div
                key={pkg.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
                  !isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={`space-y-4 ${!isEven ? 'lg:order-2' : ''}`}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-xs font-semibold">
                    {pkg.popular || pkg.isPopular ? 'Phổ biến' : 'Gói dịch vụ'}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">{pkg.name}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">{pkg.description}</p>
                  <div className="flex items-baseline gap-2 text-rose-600 font-bold text-3xl">
                    {new Intl.NumberFormat('vi-VN').format(pkg.price)}{' '}
                    <span className="text-lg text-gray-500">{pkg.currency || 'VNĐ'}</span>
                  </div>
                  <div className="space-y-2">
                    {displayedFeatures.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-gray-700">
                        <Check className="w-4 h-4 text-rose-600 mt-0.5" />
                        <span className="leading-relaxed">{f}</span>
                      </div>
                    ))}
                    {features.length > 4 && !isExpanded && (
                      <button
                        onClick={() =>
                          setExpandedFeatures((prev) => ({ ...prev, [pkg.id]: true }))
                        }
                        className="text-sm text-rose-600 font-medium underline underline-offset-4"
                      >
                        +{features.length - 4} dịch vụ khác
                      </button>
                    )}
                    {features.length > 4 && isExpanded && (
                      <button
                        onClick={() =>
                          setExpandedFeatures((prev) => ({ ...prev, [pkg.id]: false }))
                        }
                        className="text-sm text-rose-600 font-medium underline underline-offset-4"
                      >
                        Thu gọn
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 pt-4">
                    <button
                      onClick={() => handleOrderClick(pkg)}
                      className="px-5 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                      Đặt ngay
                    </button>
                    <button
                      onClick={() => router.push(`/packages/${pkg.id}`)}
                      className="px-5 py-3 rounded-full border-2 border-rose-300 text-rose-600 font-semibold bg-white hover:bg-rose-50 hover:border-rose-400 transition-all duration-300"
                    >
                      Chi tiết gói
                    </button>
                  </div>
                </div>

                <div className={`${!isEven ? 'lg:order-1' : ''}`}>
                  <div className="space-y-4">
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-rose-100 to-pink-100">
                      {mainImage ? (
                        <Image
                          src={mainImage}
                          alt={pkg.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
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

                    {hasImages && imagesArr.length > 1 && (
                      <div
                        className="flex gap-3 overflow-x-auto py-2"
                        style={{ scrollbarWidth: 'none' }}
                      >
                        {imagesArr.map((img, idx) => (
                          <button
                            key={idx}
                            onMouseEnter={() => handleSelectImage(pkg.id, idx)}
                            onClick={() => handleSelectImage(pkg.id, idx)}
                            className={`relative flex-shrink-0 w-24 h-20 rounded-xl overflow-hidden shadow-md transition-all duration-200 ${
                              idx === selectedIdx
                                ? 'ring-2 ring-rose-500 scale-105'
                                : 'hover:scale-105'
                            }`}
                          >
                            <Image
                              src={img}
                              alt={`${pkg.name} ${idx + 1}`}
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

