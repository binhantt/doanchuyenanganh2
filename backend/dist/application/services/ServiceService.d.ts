import { Service } from '../../domain/entities/Service';
import { IServiceRepository } from '../../domain/repositories/IServiceRepository';
import { IServiceService } from '../interfaces/IServiceService';
import { CreateServiceDTO, UpdateServiceDTO } from '../dto/ServiceDTO';
import { IGalleryRepository } from '../../domain/repositories/IGalleryRepository';
import { IImageRepository } from '../../domain/repositories/IImageRepository';
import { IFeatureRepository } from '../../domain/repositories/IFeatureRepository';
import { Image } from '../../domain/entities/Image';
export declare class ServiceService implements IServiceService {
    private readonly serviceRepository;
    private readonly imageRepository;
    private readonly featureRepository;
    private readonly galleryRepository?;
    constructor(serviceRepository: IServiceRepository, imageRepository: IImageRepository, featureRepository: IFeatureRepository, galleryRepository?: IGalleryRepository | undefined);
    getAllServices(onlyActive?: boolean, filters?: {
        keyword?: string;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
    }): Promise<Service[]>;
    getServiceById(id: string): Promise<Service | null>;
    getServiceBySlug(slug: string): Promise<Service | null>;
    createService(data: CreateServiceDTO): Promise<Service>;
    updateService(id: string, data: UpdateServiceDTO): Promise<Service | null>;
    deleteService(id: string): Promise<boolean>;
    addImage(serviceId: string, imageData: any): Promise<Image>;
    removeImage(serviceId: string, imageId: string): Promise<boolean>;
    getImages(serviceId: string): Promise<Image[]>;
    private saveFeatures;
    private saveImages;
}
//# sourceMappingURL=ServiceService.d.ts.map