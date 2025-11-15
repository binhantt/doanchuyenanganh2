export interface HeroSectionProps {
  heading?: string;
  subheading?: string;
  primaryHref?: string;
  secondaryHref?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface HeroContent {
  badge: string;
  heading: string;
  headingAccent: string;
  subheading: string;
  primaryCTA: {
    label: string;
    href: string;
  };
  secondaryCTA: {
    label: string;
    href: string;
  };
  stats: Array<{
    value: string;
    label: string;
  }>;
}
