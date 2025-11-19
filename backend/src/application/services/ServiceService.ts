import { Service } from '../../domain/entities/Service';
import { IServiceRepository } from '../../domain/repositories/IServiceRepository';
import { IServiceService } from '../interfaces/IServiceService';
import { CreateServiceDTO, UpdateServiceDTO } from '../dto/ServiceDTO';
import { IGalleryRepository } from '../../domain/repositories/IGalleryRepository';
import { IImageRepository } from '../../domain/repositories/IImageRepository';
import { IFeatureRepository } from '../../domain/repositories/IFeatureRepository';
import { Image } from '../../domain/entities/Image';
import { Feature } from '../../domain/entities/Feature';
import { v4 as uuidv4 } from 'uuid';

export class ServiceService implements IServiceService {
  constructor(
    private readonly serviceRepository: IServiceRepository,
    private readonly imageRepository: IImageRepository,
    private readonly featureRepository: IFeatureRepository,
    private readonly galleryRepository?: IGalleryRepository
  ) {}

  async getAllServices(
    onlyActive: boolean = false,
    filters?: { keyword?: string; sortBy?: string; sortOrder?: 'asc' | 'desc' }
  ): Promise<Service[]> {
    let services: Service[];
    
    if (onlyActive) {
      services = await this.serviceRepository.findActive();
    } else {
      services = await this.serviceRepository.findAll();
    }

    // Apply keyword filter
    if (filters?.keyword) {
      const keyword = filters.keyword.toLowerCase();
      services = services.filter(service => 
        service.name.toLowerCase().includes(keyword) ||
        service.slug.toLowerCase().includes(keyword) ||
        (service.description && service.description.toLowerCase().includes(keyword))
      );
    }

    // Apply sorting
    if (filters?.sortBy) {
      const sortBy = filters.sortBy as keyof Service;
      const sortOrder = filters.sortOrder || 'asc';
      
      services.sort((a, b) => {
        const aVal = a[sortBy];
        const bVal = b[sortBy];
        
        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;
        
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return sortOrder === 'asc' 
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }
        
        return sortOrder === 'asc'
          ? (aVal > bVal ? 1 : -1)
          : (bVal > aVal ? 1 : -1);
      });
    }

    return services;
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

    // Validate features - check for non-empty values
    const hasIncludedFeatures = data.features && 
      data.features.included && 
      data.features.included.some(f => f && f.trim().length > 0);
    
    if (!hasIncludedFeatures) {
      throw new Error('Service must have at least one included feature');
    }

    const existing = await this.serviceRepository.findBySlug(data.slug);
    if (existing) {
      throw new Error(`Service with slug "${data.slug}" already exists`);
    }

    const serviceId = uuidv4();
    const service = new Service(
      serviceId,
      data.name,
      data.slug,
      data.shortDescription,
      data.fullDescription,
      data.icon,
      data.basePrice,
      data.isActive ?? true
    );

    await this.serviceRepository.create(service);

    // Save features
    await this.saveFeatures(serviceId, data.features);

    // Save images
    if (data.images && data.images.length > 0) {
      await this.saveImages(serviceId, data.images);
    }

    return this.serviceRepository.findById(serviceId) as Promise<Service>;
  }

  async updateService(id: string, data: UpdateServiceDTO): Promise<Service | null> {
    const existing = await this.serviceRepository.findById(id);
    if (!existing) {
      return null;
    }

    if (data.basePrice !== undefined && data.basePrice < 0) {
      throw new Error('Base price must be non-negative');
    }

    // Validate features only if provided and check for non-empty values
    if (data.features !== undefined) {
      const hasIncludedFeatures = data.features.included && 
        data.features.included.some(f => f && f.trim().length > 0);
      
      if (!hasIncludedFeatures) {
        throw new Error('Service must have at least one included feature');
      }
    }

    if (data.slug && data.slug !== existing.slug) {
      const slugExists = await this.serviceRepository.findBySlug(data.slug);
      if (slugExists) {
        throw new Error(`Service with slug "${data.slug}" already exists`);
      }
    }

    // Update basic service info
    await this.serviceRepository.update(id, data);

    // Update features if provided
    if (data.features) {
      await this.featureRepository.deleteByEntity(id, 'service');
      await this.saveFeatures(id, data.features);
    }

    // Update images if provided
    if (data.images !== undefined) {
      await this.imageRepository.deleteByEntity(id, 'service');
      if (data.images.length > 0) {
        await this.saveImages(id, data.images);
      }
    }

    return this.serviceRepository.findById(id);
  }

  async deleteService(id: string): Promise<boolean> {
    const existing = await this.serviceRepository.findById(id);
    if (!existing) {
      return false;
    }

    return await this.serviceRepository.delete(id);
  }

  async addImage(serviceId: string, imageData: any): Promise<Image> {
    const service = await this.serviceRepository.findById(serviceId);
    if (!service) {
      throw new Error('Service not found');
    }

    // Get current images count for display order
    const currentImages = await this.imageRepository.findByEntity(serviceId, 'service');
    const displayOrder = imageData.displayOrder ?? currentImages.length;

    const image = new Image(
      uuidv4(),
      serviceId,
      'service',
      imageData.imageUrl,
      imageData.altText || null,
      displayOrder,
      imageData.isPrimary || false
    );

    return await this.imageRepository.create(image);
  }

  async removeImage(serviceId: string, imageId: string): Promise<boolean> {
    const service = await this.serviceRepository.findById(serviceId);
    if (!service) {
      throw new Error('Service not found');
    }

    return await this.imageRepository.delete(imageId);
  }

  async getImages(serviceId: string): Promise<Image[]> {
    const service = await this.serviceRepository.findById(serviceId);
    if (!service) {
      throw new Error('Service not found');
    }

    return await this.imageRepository.findByEntity(serviceId, 'service');
  }

  private async saveFeatures(serviceId: string, features: any): Promise<void> {
    const featureEntities: Feature[] = [];
    let order = 0;

    // Save included features
    if (features.included && features.included.length > 0) {
      for (const text of features.included) {
        if (text && text.trim()) {
          featureEntities.push(
            new Feature(uuidv4(), serviceId, 'service', 'included', text.trim(), order++)
          );
        }
      }
    }

    // Save excluded features
    if (features.excluded && features.excluded.length > 0) {
      for (const text of features.excluded) {
        if (text && text.trim()) {
          featureEntities.push(
            new Feature(uuidv4(), serviceId, 'service', 'excluded', text.trim(), order++)
          );
        }
      }
    }

    // Save highlights
    if (features.highlights && features.highlights.length > 0) {
      for (const text of features.highlights) {
        if (text && text.trim()) {
          featureEntities.push(
            new Feature(uuidv4(), serviceId, 'service', 'highlight', text.trim(), order++)
          );
        }
      }
    }

    if (featureEntities.length > 0) {
      await this.featureRepository.createMany(featureEntities);
    }
  }

  private async saveImages(serviceId: string, images: string[]): Promise<void> {
    const imageEntities: Image[] = [];
    
    for (let i = 0; i < images.length; i++) {
      const url = images[i];
      if (url && url.trim()) {
        imageEntities.push(
          new Image(
            uuidv4(),
            serviceId,
            'service',
            url.trim(),
            null,
            i,
            i === 0 // First image is primary
          )
        );
      }
    }

    if (imageEntities.length > 0) {
      await this.imageRepository.createMany(imageEntities);
    }
  }
}
