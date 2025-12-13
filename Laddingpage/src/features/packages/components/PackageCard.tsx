'use client';

import { Check, Sparkles, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PackageCardProps } from '../types';

export default function PackageCard({
  package: pkg,
  onViewDetails,
  delay = 0,
}: PackageCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const mainImage = pkg.images && pkg.images.length > 0 ? pkg.images[0] : null;

  return (
    <Card
      className={`group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-2 animate-fade-up ${
        pkg.popular || pkg.isPopular
          ? 'border-rose-400 shadow-xl scale-105'
          : 'border-rose-100 hover:border-rose-300'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {(pkg.popular || pkg.isPopular) && (
        <div className="absolute top-0 right-0 z-20 bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-2 rounded-bl-2xl font-semibold text-sm flex items-center gap-2 shadow-lg">
          <Sparkles className="w-4 h-4" />
          {pkg.badge || 'Phổ biến'}
        </div>
      )}

      {!pkg.popular && !pkg.isPopular && pkg.badge && (
        <div className="absolute top-4 right-4 z-20 bg-rose-100 text-rose-600 px-4 py-1 rounded-full font-medium text-xs">
          {pkg.badge}
        </div>
      )}

      <div className="relative w-full h-64 overflow-hidden bg-gradient-to-br from-rose-100 to-pink-100">
        {mainImage ? (
          <>
            <Image
              src={mainImage}
              alt={pkg.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized={
                mainImage.startsWith('http://localhost') || mainImage.startsWith('http://192.168.')
              }
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3">
            <ImageIcon className="w-16 h-16 text-rose-300" />
            <p className="text-sm text-rose-400 font-medium">Chưa có ảnh</p>
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-rose-100">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                {formatPrice(pkg.price)}
              </span>
              <span className="text-sm text-gray-600">{pkg.currency || 'VNĐ'}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Giá trọn gói</p>
          </div>
        </div>
      </div>

      <div
        className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
          pkg.popular || pkg.isPopular
            ? 'bg-gradient-to-br from-rose-50 via-pink-50 to-rose-50'
            : 'bg-gradient-to-br from-rose-50/50 to-pink-50/50'
        }`}
      />

      <CardHeader className="relative z-10 pb-3 pt-6">
        <CardTitle className="text-2xl font-bold text-gray-900 line-clamp-2">
          {pkg.name}
        </CardTitle>
        {pkg.description && (
          <CardDescription className="text-base text-gray-600 mt-2 line-clamp-2">
            {pkg.description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="relative z-10 space-y-4">
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
            Dịch vụ bao gồm:
          </h4>
          <ul className="space-y-2.5 max-h-48 overflow-y-auto">
            {(pkg.features?.included || pkg.features || []).slice(0, 5).map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-gray-700 group/item"
              >
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center mt-0.5 group-hover/item:bg-rose-200 transition-colors">
                  <Check className="w-3 h-3 text-rose-600" strokeWidth={3} />
                </div>
                <span className="text-sm leading-relaxed line-clamp-2">{feature}</span>
              </li>
            ))}
            {(pkg.features?.included || pkg.features || []).length > 5 && (
              <li className="text-xs text-rose-600 font-medium pt-1">
                +{(pkg.features?.included || pkg.features || []).length - 5} dịch vụ khác
              </li>
            )}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="relative z-10 pt-4 pb-6">
        <button
          onClick={() => onViewDetails?.(pkg.id)}
          className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 ${
            pkg.popular || pkg.isPopular
              ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:shadow-xl hover:scale-105 focus:ring-rose-300'
              : 'bg-white text-rose-600 border-2 border-rose-300 hover:bg-rose-50 hover:border-rose-400 hover:shadow-lg focus:ring-rose-300'
          }`}
        >
          Xem Chi Tiết
        </button>
      </CardFooter>

      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-rose-200/20 rounded-full blur-3xl" />
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-200/20 rounded-full blur-3xl" />
    </Card>
  );
}

