export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  category?: string;
  albumId?: string;
  width?: number;
  height?: number;
}

export interface GalleryAlbum {
  id: string;
  name: string;
  description?: string;
  coverImageUrl?: string;
  imageCount: number;
  images?: GalleryImage[];
}

export interface GalleryItemProps {
  image: GalleryImage;
  onClick?: (image: GalleryImage) => void;
  priority?: boolean;
}

export interface GallerySectionProps {
  title?: string;
  subtitle?: string;
  images?: GalleryImage[];
  albums?: GalleryAlbum[];
  viewMode?: 'grid' | 'carousel' | 'albums';
  onImageClick?: (image: GalleryImage) => void;
  onAlbumClick?: (album: GalleryAlbum) => void;
}
