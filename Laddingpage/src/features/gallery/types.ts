export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  category?: string;
  width?: number;
  height?: number;
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
  viewMode?: 'grid' | 'carousel';
  onImageClick?: (image: GalleryImage) => void;
}
