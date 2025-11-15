import { LucideIcon } from 'lucide-react';

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ServiceFeaturesConfig {
  title: string;
  subtitle: string;
  features: Feature[];
}

export interface ServicePackage {
  name: string;
  price: number;
  popular?: boolean;
  features: string[];
}

export interface DetailedFeatureCategory {
  category: string;
  items: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ServiceDetail {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  features: string[];
  detailedFeatures: DetailedFeatureCategory[];
  packages: ServicePackage[];
  gallery: string[];
  faqs: FAQ[];
}
