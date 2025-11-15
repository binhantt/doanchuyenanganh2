'use client';

import { useState } from 'react';
import { Sparkles, Grid3x3, Presentation } from 'lucide-react';
import TestimonialsGrid from './TestimonialsGrid';
import TestimonialsCarousel from './TestimonialsCarousel';
import { TestimonialsSectionProps } from '../types';
import { defaultTestimonials } from '../data';

export default function TestimonialsSection({
  title = 'Khách Hàng Nói Gì Về Chúng Tôi',
  subtitle = 'Những phản hồi chân thực từ các cặp đôi đã sử dụng dịch vụ của chúng tôi',
  testimonials = defaultTestimonials,
  layout: initialLayout = 'carousel',
  showViewToggle = true,
}: TestimonialsSectionProps) {
  const [layout, setLayout] = useState<'grid' | 'carousel'>(initialLayout);

  // Calculate average rating
  const averageRating =
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  return (
    <section
      id="testimonials"
      className="py-5 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-pink-50/40 to-white"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-full">
            <Sparkles className="w-4 h-4 text-pink-600" />
            <span className="text-sm font-medium text-pink-600">
              Đánh giá từ khách hàng
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

          {/* Average Rating */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(averageRating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-lg font-semibold text-gray-900">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-sm text-gray-500">
              ({testimonials.length} đánh giá)
            </span>
          </div>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-2 pt-4">
            <div className="w-12 h-1 bg-gradient-to-r from-transparent to-pink-300 rounded-full" />
            <div className="w-2 h-2 bg-pink-400 rounded-full" />
            <div className="w-8 h-1 bg-pink-400 rounded-full" />
            <div className="w-2 h-2 bg-pink-400 rounded-full" />
            <div className="w-12 h-1 bg-gradient-to-l from-transparent to-pink-300 rounded-full" />
          </div>
        </div>

        {/* View Mode Toggle */}
        {showViewToggle && (
          <div className="flex items-center justify-center gap-2 mb-12">
            <button
              onClick={() => setLayout('grid')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-offset-2 ${
                layout === 'grid'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-pink-300 hover:shadow-md'
              }`}
              aria-label="Grid view"
            >
              <Grid3x3 className="w-5 h-5" />
              <span>Lưới</span>
            </button>

            <button
              onClick={() => setLayout('carousel')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-offset-2 ${
                layout === 'carousel'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-pink-300 hover:shadow-md'
              }`}
              aria-label="Carousel view"
            >
              <Presentation className="w-5 h-5" />
              <span>Trình chiếu</span>
            </button>
          </div>
        )}

        {/* Testimonials Content */}
        <div className="relative">
          {layout === 'grid' ? (
            <TestimonialsGrid testimonials={testimonials} />
          ) : (
            <TestimonialsCarousel testimonials={testimonials} />
          )}
        </div>

      </div>
    </section>
  );
}
