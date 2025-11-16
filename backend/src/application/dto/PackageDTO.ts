export interface PackageDTO {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  features: string[];
  images?: string[];
  isPopular: boolean;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PackageListDTO {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images?: string[];
  isPopular: boolean;
  isActive: boolean;
}

export interface CreatePackageDTO {
  name: string;
  slug: string;
  description: string;
  price: number;
  features: string[];
  images?: string[];
  isPopular?: boolean;
  isActive?: boolean;
}

export interface UpdatePackageDTO {
  name?: string;
  slug?: string;
  description?: string;
  price?: number;
  features?: string[];
  images?: string[];
  isPopular?: boolean;
  isActive?: boolean;
}
