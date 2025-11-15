export interface Product {
  id: string;
  name: string;
  price: number;
  currency?: string;
  description?: string;
  category: string;
  features: string[];
  popular?: boolean;
  badge?: string;
  image?: string;
}

export interface ProductCardProps {
  product: Product;
  onViewDetails?: (productId: string) => void;
  delay?: number;
}

export interface ProductsListProps {
  title?: string;
  subtitle?: string;
  products?: Product[];
  onViewDetails?: (productId: string) => void;
}

export interface DetailedFeatureCategory {
  category: string;
  items: string[];
}

export interface ProductDetail extends Product {
  fullDescription: string;
  detailedFeatures: DetailedFeatureCategory[];
  includes: string[];
  excludes: string[];
  specifications: {
    material?: string;
    size?: string;
    color?: string;
    quantity?: string;
    warranty?: string;
  };
  images?: string[];
}
