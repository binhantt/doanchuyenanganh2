'use client';

import { useState } from 'react';
import GallerySection from './GallerySection';
import { GalleryImage } from '../types';

/**
 * GallerySectionDemo - Example usage of the GallerySection component
 */
export default function GallerySectionDemo() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    console.log('Image clicked:', image);
    // You can open a lightbox modal here
  };

  // Custom gallery images
  const customImages: GalleryImage[] = [
    {
      id: 'custom-1',
      src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
      alt: 'Wedding ceremony',
      title: 'Ceremony Moment',
      category: 'Ceremony',
    },
    {
      id: 'custom-2',
      src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
      alt: 'Wedding flowers',
      title: 'Floral Beauty',
      category: 'Decoration',
    },
    {
      id: 'custom-3',
      src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
      alt: 'Wedding rings',
      title: 'Forever Together',
      category: 'Details',
    },
    {
      id: 'custom-4',
      src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
      alt: 'Wedding venue',
      title: 'Beautiful Venue',
      category: 'Venue',
    },
    {
      id: 'custom-5',
      src: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&q=80',
      alt: 'Wedding cake',
      title: 'Sweet Celebration',
      category: 'Reception',
    },
    {
      id: 'custom-6',
      src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&q=80',
      alt: 'Bride portrait',
      title: 'Radiant Bride',
      category: 'Portrait',
    },
  ];

  return (
    <div className="space-y-20">
      {/* Example 1: Default Gallery with Grid */}
      <GallerySection />

      {/* Example 2: Gallery with Carousel */}
      <GallerySection
        title="Wedding Moments"
        subtitle="Captured memories from beautiful celebrations"
        viewMode="carousel"
        onImageClick={handleImageClick}
      />

      {/* Example 3: Custom Images */}
      <GallerySection
        title="Our Portfolio"
        subtitle="A collection of our finest work"
        images={customImages}
        onImageClick={handleImageClick}
      />

      {/* Example 4: Grid Only (fewer images) */}
      <GallerySection
        title="Featured Work"
        subtitle="Handpicked highlights from recent weddings"
        images={customImages.slice(0, 6)}
        viewMode="grid"
      />

      {/* Selected Image Display */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-pink-400 transition-colors"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto rounded-lg"
            />
            {selectedImage.title && (
              <p className="text-white text-center mt-4 text-xl font-semibold">
                {selectedImage.title}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
