'use client';

import { Check, Sparkles } from 'lucide-react';
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

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-2 animate-fade-up ${
        pkg.popular
          ? 'border-rose-400 shadow-xl scale-105'
          : 'border-rose-100 hover:border-rose-300'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Popular Badge */}
      {pkg.popular && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-2 rounded-bl-2xl font-semibold text-sm flex items-center gap-2 shadow-lg">
          <Sparkles className="w-4 h-4" />
          {pkg.badge || 'Phổ biến'}
        </div>
      )}

      {/* Badge for non-popular packages */}
      {!pkg.popular && pkg.badge && (
        <div className="absolute top-4 right-4 bg-rose-100 text-rose-600 px-4 py-1 rounded-full font-medium text-xs">
          {pkg.badge}
        </div>
      )}

      {/* Decorative gradient background */}
      <div
        className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
          pkg.popular
            ? 'bg-gradient-to-br from-rose-50 via-pink-50 to-rose-50'
            : 'bg-gradient-to-br from-rose-50/50 to-pink-50/50'
        }`}
      />

      <CardHeader className="relative z-10 pb-4">
        <CardTitle className="text-2xl font-bold text-gray-900">
          {pkg.name}
        </CardTitle>
        {pkg.description && (
          <CardDescription className="text-base text-gray-600 mt-2">
            {pkg.description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="relative z-10 space-y-6">
        {/* Price */}
        <div className="py-6 border-y border-rose-100">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent animate-price-fade">
              {formatPrice(pkg.price)}
            </span>
            <span className="text-lg text-gray-600">{pkg.currency || 'VNĐ'}</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">Giá trọn gói</p>
        </div>

        {/* Features List */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
            Dịch vụ bao gồm:
          </h4>
          <ul className="space-y-3">
            {(pkg.features?.included || pkg.features || []).map((feature: string, index: number) => (
              <li
                key={index}
                className="flex items-start gap-3 text-gray-700 group/item"
              >
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center mt-0.5 group-hover/item:bg-rose-200 transition-colors">
                  <Check className="w-3 h-3 text-rose-600" strokeWidth={3} />
                </div>
                <span className="text-sm leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="relative z-10 pt-6">
        <button
          onClick={() => onViewDetails?.(pkg.id)}
          className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 ${
            pkg.popular
              ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:shadow-xl hover:scale-105 focus:ring-rose-300'
              : 'bg-white text-rose-600 border-2 border-rose-300 hover:bg-rose-50 hover:border-rose-400 hover:shadow-lg focus:ring-rose-300'
          }`}
        >
          Xem Chi Tiết
        </button>
      </CardFooter>

      {/* Decorative corner elements */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-rose-200/20 rounded-full blur-3xl" />
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-200/20 rounded-full blur-3xl" />
    </Card>
  );
}
