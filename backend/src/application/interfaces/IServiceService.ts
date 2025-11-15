import { Service } from '../../domain/entities/Service';
import { CreateServiceDTO, UpdateServiceDTO } from '../dto/ServiceDTO';

export interface IServiceService {
  getAllServices(onlyActive?: boolean): Promise<Service[]>;
  getServiceById(id: string): Promise<Service | null>;
  getServiceBySlug(slug: string): Promise<Service | null>;
  createService(data: CreateServiceDTO): Promise<Service>;
  updateService(id: string, data: UpdateServiceDTO): Promise<Service | null>;
  deleteService(id: string): Promise<boolean>;
}
