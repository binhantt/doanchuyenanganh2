export interface CreateProductDTO {
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  categoryId?: number;
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
  categoryId?: number;
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
  categoryId: number | null;
  material: string;
  features: string[];
  images: string[];
  stockQuantity: number;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
