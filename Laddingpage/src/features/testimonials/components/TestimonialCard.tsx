'use client';

import Image from 'next/image';
import { Quote } from 'lucide-react';
import StarRating from './StarRating';
import { TestimonialCardProps } from '../types';

export default function TestimonialCard({
  testimonial,
  variant = 'default',
}: TestimonialCardProps) {
  const isCompact = variant === 'compact';

  return (
    <div
      className={`group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-pink-100 hover:border-pink-300 ${
        isCompact ? 'p-6' : 'p-8'
      }`}
    >
      {/* Decorative gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <div className="relative z-10 space-y-4">
        {/* Quote Icon */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-pink-100 to-rose-100 group-hover:from-pink-200 group-hover:to-rose-200 transition-all duration-500">
          <Quote className="w-6 h-6 text-pink-600" />
        </div>

        {/* Rating */}
        <StarRating rating={testimonial.rating} size={isCompact ? 'sm' : 'md'} />

        {/* Feedback Text */}
        <p
          className={`text-gray-700 leading-relaxed ${
            isCompact ? 'text-sm line-clamp-4' : 'text-base'
          }`}
        >
          "{testimonial.feedback}"
        </p>

        {/* Divider */}
        <div className="w-12 h-1 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full" />

        {/* Customer Info */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-pink-200 group-hover:ring-pink-300 transition-all duration-300">
            {testimonial.avatar ? (
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-pink-200 to-rose-200 flex items-center justify-center">
                <span className="text-lg font-bold text-pink-700">
                  {testimonial.name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Name and Details */}
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
              {testimonial.name}
            </h4>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
              {testimonial.role && <span>{testimonial.role}</span>}
              {testimonial.weddingDate && (
                <>
                  <span>•</span>
                  <span>{testimonial.weddingDate}</span>
                </>
              )}
              {testimonial.location && (
                <>
                  <span>•</span>
                  <span>{testimonial.location}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-200/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-rose-200/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}
