import { CreateAlbumDTO, UpdateAlbumDTO, AlbumResponseDTO } from '../dto/AlbumDTO';

export interface IAlbumService {
  getAllAlbums(filters?: {
    isActive?: boolean;
  }): Promise<AlbumResponseDTO[]>;
  getAlbumById(id: string): Promise<AlbumResponseDTO>;
  getImagesByAlbum(albumId: string): Promise<any[]>; // GalleryResponseDTO[]
  createAlbum(data: CreateAlbumDTO): Promise<AlbumResponseDTO>;
  updateAlbum(id: string, data: UpdateAlbumDTO): Promise<AlbumResponseDTO>;
  deleteAlbum(id: string): Promise<void>;
}

