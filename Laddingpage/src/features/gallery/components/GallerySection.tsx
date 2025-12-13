'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Grid3x3, Presentation, Folder } from 'lucide-react';
import GalleryGrid from './GalleryGrid';
import GalleryCarousel from './GalleryCarousel';
import AlbumGrid from './AlbumGrid';
import { GallerySectionProps, GalleryAlbum, GalleryImage } from '../types';
import { useGallery } from '../../api/hooks';


export default function GallerySection({
  title = 'Thư Viện Ảnh',
  subtitle = 'Những khoảnh khắc đẹp nhất từ các đám cưới chúng tôi đã tổ chức',
  images: defaultImagesParam,
  albums: defaultAlbumsParam,
  viewMode: initialViewMode = 'albums',
  onImageClick,
  onAlbumClick,
}: GallerySectionProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'carousel' | 'albums'>(initialViewMode);
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryAlbum | null>(null);
  const { galleries, albums, loading, error, fetchImagesByAlbum, fetchAlbumById } = useGallery({ autoFetch: true });

  // Convert API galleries to image format for display
  const images: GalleryImage[] = galleries.length > 0 
    ? galleries.map(g => ({
        id: g.id,
        src: g.fileUrl,
        alt: g.altText,
        title: g.title,
        category: g.category,
        albumId: g.albumId,
      }))
    : (defaultImagesParam || []);

  // Convert API albums to display format
  const displayAlbums: GalleryAlbum[] = albums.length > 0
    ? albums.map(a => ({
        id: a.id,
        name: a.name,
        description: a.description,
        coverImageUrl: a.coverImageUrl,
        imageCount: a.imageCount,
        images: a.images?.map(img => ({
          id: img.id,
          src: img.fileUrl,
          alt: img.altText,
          title: img.title,
          category: img.category,
          albumId: img.albumId,
        })),
      }))
    : (defaultAlbumsParam || []);

  // Load album images when album is selected
  useEffect(() => {
    if (selectedAlbum) {
      fetchImagesByAlbum(selectedAlbum.id);
      setViewMode('grid');
    }
  }, [selectedAlbum, fetchImagesByAlbum]);

  const handleImageClick = (image: GalleryImage) => {
    if (onImageClick) {
      onImageClick(image);
    } else {
      // Default behavior: open in new tab
      window.open(image.src, '_blank');
    }
  };

  const handleAlbumClick = async (album: GalleryAlbum) => {
    if (onAlbumClick) {
      onAlbumClick(album);
    } else {
      // Default behavior: load album images
      setSelectedAlbum(album);
    }
  };

  const handleBackToAlbums = () => {
    setSelectedAlbum(null);
    setViewMode('albums');
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
        {!loading && displayAlbums.length === 0 && images.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Không có album hoặc ảnh nào</p>
          </div>
        )}

        {/* Back to Albums Button (when viewing album images) */}
        {selectedAlbum && (
          <div className="flex items-center justify-center mb-8">
            <button
              onClick={handleBackToAlbums}
              className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-full font-medium hover:border-pink-300 hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-offset-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Quay lại Album</span>
            </button>
            <h3 className="ml-4 text-xl font-semibold text-gray-900">{selectedAlbum.name}</h3>
          </div>
        )}

        {/* View Mode Toggle */}
        {!loading && !selectedAlbum && displayAlbums.length > 0 && (
          <div className="flex items-center justify-center gap-2 mb-12">
            <button
              onClick={() => setViewMode('albums')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-offset-2 ${
                viewMode === 'albums'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-pink-300 hover:shadow-md'
              }`}
              aria-label="Albums view"
            >
              <Folder className="w-5 h-5" />
              <span>Album</span>
            </button>
          </div>
        )}

        {!loading && (selectedAlbum || images.length > 0) && (
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
        {!loading && (
          <div className="relative">
            {viewMode === 'albums' && displayAlbums.length > 0 ? (
              <AlbumGrid albums={displayAlbums} onAlbumClick={handleAlbumClick} />
            ) : viewMode === 'grid' && images.length > 0 ? (
              <GalleryGrid images={images} onImageClick={handleImageClick} />
            ) : viewMode === 'carousel' && images.length > 0 ? (
              <GalleryCarousel images={images} onImageClick={handleImageClick} />
            ) : null}
          </div>
        )}

        {/* View More Button */}
        {!loading && !selectedAlbum && displayAlbums.length > 0 && (
          <div className="text-center mt-16">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-offset-2">
              Xem thêm album
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
        {!loading && selectedAlbum && images.length > 0 && (
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
