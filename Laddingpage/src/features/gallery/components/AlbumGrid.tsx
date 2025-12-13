'use client';

import AlbumCard from './AlbumCard';
import { GalleryAlbum } from '../types';

interface AlbumGridProps {
  albums: GalleryAlbum[];
  onAlbumClick?: (album: GalleryAlbum) => void;
}

export default function AlbumGrid({ albums, onAlbumClick }: AlbumGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {albums.map((album, index) => (
        <div
          key={album.id}
          className="animate-fade-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <AlbumCard
            album={album}
            onClick={onAlbumClick}
            priority={index < 3}
          />
        </div>
      ))}
    </div>
  );
}


