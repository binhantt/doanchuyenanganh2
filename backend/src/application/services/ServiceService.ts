import { Service } from '../../domain/entities/Service';
import { IServiceRepository } from '../../domain/repositories/IServiceRepository';
import { IServiceService } from '../interfaces/IServiceService';
import { CreateServiceDTO, UpdateServiceDTO } from '../dto/ServiceDTO';
import { v4 as uuidv4 } from 'uuid';

export class ServiceService implements IServiceService {
  constructor(private readonly serviceRepository: IServiceRepository) {}

  async getAllServices(onlyActive: boolean = false): Promise<Service[]> {
    if (onlyActive) {
      return await this.serviceRepository.findActive();
    }
    return await this.serviceRepository.findAll();
  }

  async getServiceById(id: string): Promise<Service | null> {
    return await this.serviceRepository.findById(id);
  }

  async getServiceBySlug(slug: string): Promise<Service | null> {
    return await this.serviceRepository.findBySlug(slug);
  }

  async createService(data: CreateServiceDTO): Promise<Service> {
    if (data.basePrice < 0) {
      throw new Error('Base price must be non-negative');
    }

    if (data.features.length === 0) {
      throw new Error('Service must have at least one feature');
    }

    const existing = await this.serviceRepository.findBySlug(data.slug);
    if (existing) {
      throw new Error(`Service with slug "${data.slug}" already exists`);
    }

    const service = new Service(
      uuidv4(),
      data.name,
      data.slug,
      data.shortDescription,
      data.fullDescription,
      data.icon,
      data.features,
      data.basePrice,
      data.isActive ?? true
    );

    return await this.serviceRepository.create(service);
  }

  async updateService(id: string, data: UpdateServiceDTO): Promise<Service | null> {
    const existing = await this.serviceRepository.findById(id);
    if (!existing) {
      return null;
    }

    if (data.basePrice !== undefined && data.basePrice < 0) {
      throw new Error('Base price must be non-negative');
    }

    if (data.features !== undefined && data.features.length === 0) {
      throw new Error('Service must have at least one feature');
    }

    if (data.slug && data.slug !== existing.slug) {
      const slugExists = await this.serviceRepository.findBySlug(data.slug);
      if (slugExists) {
        throw new Error(`Service with slug "${data.slug}" already exists`);
      }
    }

    return await this.serviceRepository.update(id, data);
  }

  async deleteService(id: string): Promise<boolean> {
    const existing = await this.serviceRepository.findById(id);
    if (!existing) {
      return false;
    }

    return await this.serviceRepository.delete(id);
  }
}
