'use client';

import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  showNumber = false,
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const stars = Array.from({ length: maxRating }, (_, index) => {
    const starValue = index + 1;
    const isFilled = starValue <= rating;
    const isPartial = starValue > rating && starValue - 1 < rating;
    const partialPercentage = isPartial ? ((rating % 1) * 100).toFixed(0) : '0';

    return (
      <div key={index} className="relative">
        {/* Background star (empty) */}
        <Star
          className={`${sizeClasses[size]} text-gray-300`}
          fill="currentColor"
        />

        {/* Foreground star (filled) */}
        {(isFilled || isPartial) && (
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              width: isPartial ? `${partialPercentage}%` : '100%',
            }}
          >
            <Star
              className={`${sizeClasses[size]} text-yellow-400`}
              fill="currentColor"
            />
          </div>
        )}
      </div>
    );
  });

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">{stars}</div>
      {showNumber && (
        <span className="text-sm font-medium text-gray-600 ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
