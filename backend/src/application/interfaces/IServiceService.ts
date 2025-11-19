import { Service } from '../../domain/entities/Service';
import { CreateServiceDTO, UpdateServiceDTO } from '../dto/ServiceDTO';

export interface IServiceService {
  getAllServices(
    onlyActive?: boolean,
    filters?: { keyword?: string; sortBy?: string; sortOrder?: 'asc' | 'desc' }
  ): Promise<Service[]>;
  getServiceById(id: string): Promise<Service | null>;
  getServiceBySlug(slug: string): Promise<Service | null>;
  createService(data: CreateServiceDTO): Promise<Service>;
  updateService(id: string, data: UpdateServiceDTO): Promise<Service | null>;
  deleteService(id: string): Promise<boolean>;
  addImage(serviceId: string, imageData: any): Promise<any>;
  removeImage(serviceId: string, imageId: string): Promise<boolean>;
  getImages(serviceId: string): Promise<any[]>;
}
