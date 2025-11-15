export interface CreateProductDTO {
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  material: string;
  features: string[];
  images: string[];
  stockQuantity?: number;
  isFeatured?: boolean;
  isActive?: boolean;
}

export interface UpdateProductDTO {
  name?: string;
  slug?: string;
  description?: string;
  price?: number;
  category?: string;
  material?: string;
  features?: string[];
  images?: string[];
  stockQuantity?: number;
  isFeatured?: boolean;
  isActive?: boolean;
}

export interface ProductResponseDTO {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  material: string;
  features: string[];
  images: string[];
  stockQuantity: number;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
