'use client';

import GalleryItem from './GalleryItem';
import { GalleryImage } from '../types';

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick?: (image: GalleryImage) => void;
}

export default function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {images.map((image, index) => (
        <div
          key={image.id}
          className="animate-fade-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <GalleryItem
            image={image}
            onClick={onImageClick}
            priority={index < 3}
          />
        </div>
      ))}
    </div>
  );
}
