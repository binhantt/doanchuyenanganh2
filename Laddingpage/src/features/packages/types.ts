export interface PackageFeatures {
  included: string[];
  excluded?: string[];
  highlights?: string[];
}

export interface Package {
  id: string;
  name: string;
  slug?: string;
  price: number;
  currency?: string;
  description?: string;
  features: PackageFeatures;
  images: string[];
  popular?: boolean;
  isPopular?: boolean;
  badge?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PackageCardProps {
  package: Package;
  onViewDetails?: (packageId: string) => void;
  delay?: number;
}

export interface WeddingPackagesProps {
  title?: string;
  subtitle?: string;
  packages?: Package[];
  onViewDetails?: (packageId: string) => void;
}

export interface DetailedFeatureCategory {
  category: string;
  items: string[];
}

export interface PackageDetail extends Package {
  fullDescription: string;
  detailedFeatures: DetailedFeatureCategory[];
  guestCount: string;
  duration: string;
  setupTime: string;
}
