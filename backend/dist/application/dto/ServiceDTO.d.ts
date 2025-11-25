export interface ServiceFeaturesDTO {
    included: string[];
    excluded: string[];
    highlights: string[];
}
export interface ServiceDTO {
    id: string;
    name: string;
    slug: string;
    shortDescription: string;
    fullDescription: string;
    icon: string;
    basePrice: number;
    features: ServiceFeaturesDTO;
    images: string[];
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}
export interface CreateServiceDTO {
    name: string;
    slug: string;
    shortDescription: string;
    fullDescription: string;
    icon: string;
    basePrice: number;
    features: ServiceFeaturesDTO;
    images?: string[];
    isActive?: boolean;
}
export interface UpdateServiceDTO {
    name?: string;
    slug?: string;
    shortDescription?: string;
    fullDescription?: string;
    icon?: string;
    basePrice?: number;
    features?: ServiceFeaturesDTO;
    images?: string[];
    isActive?: boolean;
}
//# sourceMappingURL=ServiceDTO.d.ts.map