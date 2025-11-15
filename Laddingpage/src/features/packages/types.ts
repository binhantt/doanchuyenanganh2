export interface Package {
  id: string;
  name: string;
  price: number;
  currency?: string;
  description?: string;
  features: string[];
  popular?: boolean;
  badge?: string;
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
  includes: string[];
  excludes: string[];
  guestCount: string;
  duration: string;
  setupTime: string;
  images?: string[];
}
