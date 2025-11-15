'use client';

import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import PackageCard from './PackageCard';
import { WeddingPackagesProps } from '../types';
import { defaultPackages } from '../data';

export default function WeddingPackages({
  title = 'Gói Dịch Vụ Tiệc Cưới',
  subtitle = 'Lựa chọn gói dịch vụ phù hợp với ngân sách và phong cách của bạn',
  packages = defaultPackages,
  onViewDetails,
}: WeddingPackagesProps) {
  const router = useRouter();

  const handleViewDetails = (packageId: string) => {
    if (onViewDetails) {
      onViewDetails(packageId);
    } else {
      router.push(`/packages/${packageId}`);
    }
  };
  return (
    <section
      id="packages"
      className="py-5 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-rose-50/20 to-white"
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

        {/* Packages Grid */}
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

      </div>
    </section>
  );
}
