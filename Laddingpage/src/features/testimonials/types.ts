export interface Testimonial {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  feedback: string;
  role?: string;
  date?: string;
  weddingDate?: string;
  location?: string;
}

export interface TestimonialCardProps {
  testimonial: Testimonial;
  variant?: 'default' | 'compact';
}

export interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
  layout?: 'grid' | 'carousel';
  showViewToggle?: boolean;
}
