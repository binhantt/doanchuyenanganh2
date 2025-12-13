'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Folder, Images } from 'lucide-react';
import { GalleryAlbum } from '../types';

interface AlbumCardProps {
  album: GalleryAlbum;
  onClick?: (album: GalleryAlbum) => void;
  priority?: boolean;
}

export default function AlbumCard({
  album,
  onClick,
  priority = false,
}: AlbumCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const coverImage = album.coverImageUrl || '/placeholder-album.jpg';

  return (
    <div
      className="group relative overflow-hidden rounded-2xl cursor-pointer bg-gray-100 aspect-square"
      onClick={() => onClick?.(album)}
    >
      {/* Cover Image */}
      {album.coverImageUrl ? (
        <Image
          src={coverImage}
          alt={album.name}
          fill
          className={`object-cover transition-all duration-700 group-hover:scale-110 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
          <Folder className="w-16 h-16 text-pink-400" />
        </div>
      )}

      {/* Loading skeleton */}
      {!isLoaded && album.coverImageUrl && (
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-pink-100 animate-pulse" />
      )}

      {/* Pink highlight border on hover */}
      <div className="absolute inset-0 border-4 border-transparent group-hover:border-pink-400 transition-all duration-300 rounded-2xl pointer-events-none" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
          {/* Folder icon */}
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Images className="w-6 h-6" />
          </div>

          {/* Album name */}
          <h3 className="text-lg font-semibold text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
            {album.name}
          </h3>

          {/* Image count badge */}
          <span className="mt-2 px-3 py-1 bg-pink-500/80 backdrop-blur-sm rounded-full text-xs font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
            {album.imageCount} ảnh
          </span>

          {/* Description */}
          {album.description && (
            <p className="mt-2 text-sm text-center text-gray-200 max-w-xs transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150 line-clamp-2">
              {album.description}
            </p>
          )}
        </div>
      </div>

      {/* Decorative corner gradient */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-400/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}


