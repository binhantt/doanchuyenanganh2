export interface CreateAlbumDTO {
  name: string;
  description?: string;
  coverImageId?: string;
  displayOrder?: number;
  isActive?: boolean;
}

export interface UpdateAlbumDTO {
  name?: string;
  description?: string;
  coverImageId?: string;
  displayOrder?: number;
  isActive?: boolean;
}

export interface AlbumResponseDTO {
  id: string;
  name: string;
  description: string | null;
  coverImageId: string | null;
  coverImageUrl: string | null;
  imageCount: number;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  images?: any[]; // GalleryResponseDTO[]
}

