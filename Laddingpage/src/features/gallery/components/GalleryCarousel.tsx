'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GalleryItem from './GalleryItem';
import { GalleryImage } from '../types';

interface GalleryCarouselProps {
  images: GalleryImage[];
  onImageClick?: (image: GalleryImage) => void;
}

export default function GalleryCarousel({
  images,
  onImageClick,
}: GalleryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  };

  const [itemsToShow, setItemsToShow] = useState(itemsPerView.desktop);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsToShow(itemsPerView.mobile);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(itemsPerView.tablet);
      } else {
        setItemsToShow(itemsPerView.desktop);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, images.length - itemsToShow);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      goToNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex, maxIndex]);

  // Scroll to current index
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = container.scrollWidth / images.length;
      container.scrollTo({
        left: itemWidth * currentIndex,
        behavior: 'smooth',
      });
    }
  }, [currentIndex, images.length]);

  return (
   
    <div
      className="relative"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >

      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-2xl">
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-hidden scroll-smooth"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
            transition: 'transform 0.5s ease-in-out',
          }}
        >
          {images.map((image, index) => (
            <div
              key={image.id}
              className="flex-shrink-0"
              style={{ width: `calc(${100 / itemsToShow}% - ${(itemsToShow - 1) * 24 / itemsToShow}px)` }}
            >
              <GalleryItem
                image={image}
                onClick={onImageClick}
                priority={index < itemsToShow}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {images.length > itemsToShow && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-gray-800 hover:bg-white hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-gray-800 hover:bg-white hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300 z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {images.length > itemsToShow && (
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 ${
                index === currentIndex
                  ? 'w-8 h-3 bg-gradient-to-r from-rose-500 to-pink-600'
                  : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress bar */}
      {isAutoPlaying && images.length > itemsToShow && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/50">
          <div
            className="h-full bg-gradient-to-r from-rose-500 to-pink-600 transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / (maxIndex + 1)) * 100}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}
