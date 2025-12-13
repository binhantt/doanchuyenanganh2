export interface CreateGalleryDTO {
  title: string;
  altText?: string;
  fileName: string;
  filePath: string;
  fileUrl: string;
  mimeType: string;
  fileSize: number;
  width?: number;
  height?: number;
  category: string;
  albumId?: string;
  relatedId?: string;
  relatedType?: string;
  displayOrder?: number;
  isPrimary?: boolean;
  isActive?: boolean;
}

export interface UpdateGalleryDTO {
  title?: string;
  altText?: string;
  category?: string;
  albumId?: string;
  relatedId?: string;
  relatedType?: string;
  displayOrder?: number;
  isPrimary?: boolean;
  isActive?: boolean;
}

export interface GalleryResponseDTO {
  id: string;
  title: string;
  altText: string | null;
  fileName: string;
  filePath: string;
  fileUrl: string;
  mimeType: string;
  fileSize: number;
  fileSizeKB: number;
  fileSizeMB: number;
  width: number | null;
  height: number | null;
  dimensions: string | null;
  category: string;
  albumId: string | null;
  relatedId: string | null;
  relatedType: string | null;
  displayOrder: number;
  isPrimary: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UploadResponseDTO {
  success: boolean;
  message: string;
  data?: GalleryResponseDTO;
}
