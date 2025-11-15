'use client';

import { useRouter } from 'next/navigation';
import { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

export interface FeatureItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  slug?: string;
}

export default function FeatureItem({ 
  icon: Icon, 
  title, 
  description,
  delay = 0,
  slug
}: FeatureItemProps) {
  const router = useRouter();

  const handleClick = () => {
    console.log('Clicked! Slug:', slug);
    if (slug) {
      console.log('Navigating to:', `/services/${slug}`);
      router.push(`/services/${slug}`);
    } else {
      console.log('No slug provided');
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-rose-100 hover:border-rose-300 animate-fade-up ${
        slug ? 'cursor-pointer' : ''
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Decorative gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon Container */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-rose-100 to-pink-100 group-hover:from-rose-200 group-hover:to-pink-200 transition-all duration-500 mb-6">
          <Icon 
            className="w-8 h-8 text-rose-600 group-hover:scale-110 transition-transform duration-500" 
            strokeWidth={1.5}
          />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-rose-600 transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-4">
          {description}
        </p>

        {/* View Details Link */}
        {slug && (
          <div className="flex items-center gap-2 text-rose-600 font-medium text-sm group-hover:gap-3 transition-all">
            <span>Xem chi tiết</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Decorative corner element */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-rose-100/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}
