'use client';

import { useState } from 'react';
import { Sparkles, Grid3x3, Presentation } from 'lucide-react';
import GalleryGrid from './GalleryGrid';
import GalleryCarousel from './GalleryCarousel';
import { GallerySectionProps } from '../types';
import { useGallery } from '../../api/hooks';


export default function GallerySection({
  title = 'Thư Viện Ảnh',
  subtitle = 'Những khoảnh khắc đẹp nhất từ các đám cưới chúng tôi đã tổ chức',
  images: defaultImagesParam,
  viewMode: initialViewMode = 'grid',
  onImageClick,
}: GallerySectionProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>(initialViewMode);
  const { galleries, loading, error } = useGallery({ autoFetch: true });

  // Convert API galleries to image format for display
  const images = galleries.length > 0 
    ? galleries.map(g => ({
        id: g.id,
        src: g.fileUrl,
        alt: g.altText,
        title: g.title,
      }))
    : (defaultImagesParam  || []);

  const handleImageClick = (image: typeof images[0]) => {
    if (onImageClick) {
      onImageClick(image);
    } else {
      // Default behavior: open in new tab
      window.open(image.src, '_blank');
    }
  };

  if (error) {
    return (
      <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-pink-50/30 to-white">
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
      id="gallery"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-pink-50/30 to-white"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-full">
            <Sparkles className="w-4 h-4 text-pink-600" />
            <span className="text-sm font-medium text-pink-600">
              Khoảnh khắc đáng nhớ
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
            <div className="w-12 h-1 bg-gradient-to-r from-transparent to-pink-300 rounded-full" />
            <div className="w-2 h-2 bg-pink-400 rounded-full" />
            <div className="w-8 h-1 bg-pink-400 rounded-full" />
            <div className="w-2 h-2 bg-pink-400 rounded-full" />
            <div className="w-12 h-1 bg-gradient-to-l from-transparent to-pink-300 rounded-full" />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && images.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Không có ảnh nào</p>
          </div>
        )}

        {/* View Mode Toggle */}
        {!loading && images.length > 0 && (
          <div className="flex items-center justify-center gap-2 mb-12">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-offset-2 ${
                viewMode === 'grid'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-pink-300 hover:shadow-md'
              }`}
              aria-label="Grid view"
            >
              <Grid3x3 className="w-5 h-5" />
              <span>Lưới</span>
            </button>

            <button
              onClick={() => setViewMode('carousel')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-offset-2 ${
                viewMode === 'carousel'
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

        {/* Gallery Content */}
        {!loading && images.length > 0 && (
          <div className="relative">
            {viewMode === 'grid' ? (
              <GalleryGrid images={images} onImageClick={handleImageClick} />
            ) : (
              <GalleryCarousel images={images} onImageClick={handleImageClick} />
            )}
          </div>
        )}

        {/* View More Button */}
        {!loading && images.length > 0 && (
          <div className="text-center mt-16">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-offset-2">
              Xem thêm ảnh
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
