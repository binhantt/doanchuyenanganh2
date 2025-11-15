export interface ServiceDTO {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  features: string[];
  basePrice: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServiceListDTO {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  icon: string;
  basePrice: number;
  isActive: boolean;
}

export interface CreateServiceDTO {
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  features: string[];
  basePrice: number;
  isActive?: boolean;
}

export interface UpdateServiceDTO {
  name?: string;
  slug?: string;
  shortDescription?: string;
  fullDescription?: string;
  icon?: string;
  features?: string[];
  basePrice?: number;
  isActive?: boolean;
}
