/**
 * WeddingPackages Component with API Integration
 * Fetches packages from backend API
 */

'use client';

import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import PackageCard from './PackageCard';
import { WeddingPackagesProps } from '../types';
import { usePackages } from '../../api/hooks';

export default function WeddingPackagesWithAPI({
  title = 'Gói Dịch Vụ Tiệc Cưới',
  subtitle = 'Lựa chọn gói dịch vụ phù hợp với ngân sách và phong cách của bạn',
  onViewDetails,
}: Omit<WeddingPackagesProps, 'packages'>) {
  const router = useRouter();
  const { packages, loading, error } = usePackages({ autoFetch: true });

  const handleViewDetails = (packageId: string) => {
    if (onViewDetails) {
      onViewDetails(packageId);
    } else {
      router.push(`/packages/${packageId}`);
    }
  };

  if (error) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-rose-50/20 to-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center py-12">
            <p className="text-red-600 font-semibold">Lỗi: {error}</p>
            <p className="text-gray-600 mt-2">Vui lòng thử lại sau</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="packages"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-rose-50/20 to-white"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 rounded-full">
            <Sparkles className="w-4 h-4 text-rose-600" />
            <span className="text-sm font-medium text-rose-600">
              Bảng giá dịch vụ
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            {title}
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-2 pt-4">
            <div className="w-12 h-1 bg-gradient-to-r from-transparent to-rose-300 rounded-full" />
            <div className="w-2 h-2 bg-rose-400 rounded-full" />
            <div className="w-8 h-1 bg-rose-400 rounded-full" />
            <div className="w-2 h-2 bg-rose-400 rounded-full" />
            <div className="w-12 h-1 bg-gradient-to-l from-transparent to-rose-300 rounded-full" />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && packages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Không có gói dịch vụ nào</p>
          </div>
        )}

        {/* Packages Grid */}
        {!loading && packages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {packages.map((pkg, index) => (
              <PackageCard
                key={pkg.id}
                package={pkg}
                onViewDetails={handleViewDetails}
                delay={index * 150}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
