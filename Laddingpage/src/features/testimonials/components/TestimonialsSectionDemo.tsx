'use client';

import TestimonialsSection from './TestimonialsSection';
import { Testimonial } from '../types';

/**
 * TestimonialsSectionDemo - Example usage of the TestimonialsSection component
 */
export default function TestimonialsSectionDemo() {
  // Custom testimonials example
  const customTestimonials: Testimonial[] = [
    {
      id: 'custom-1',
      name: 'Sarah & John',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      rating: 5,
      feedback:
        'Absolutely amazing service! Our wedding was perfect in every way. The team was professional, attentive, and made sure everything ran smoothly.',
      role: 'Bride & Groom',
      weddingDate: 'June 2024',
      location: 'New York',
    },
    {
      id: 'custom-2',
      name: 'Emily & Michael',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      rating: 5,
      feedback:
        'We couldn\'t have asked for a better wedding planning team. They handled everything with care and attention to detail. Highly recommend!',
      role: 'Bride & Groom',
      weddingDate: 'July 2024',
      location: 'Los Angeles',
    },
    {
      id: 'custom-3',
      name: 'Jessica & David',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
      rating: 4.5,
      feedback:
        'Great experience overall. The decorations were stunning and the food was delicious. Our guests are still talking about it!',
      role: 'Bride & Groom',
      weddingDate: 'August 2024',
      location: 'Chicago',
    },
  ];

  return (
    <div className="space-y-20">
      {/* Example 1: Default Testimonials with Carousel */}
      <TestimonialsSection />

      {/* Example 2: Grid Layout */}
      <TestimonialsSection
        title="Client Reviews"
        subtitle="What our happy couples say about us"
        layout="grid"
      />

      {/* Example 3: Custom Testimonials */}
      <TestimonialsSection
        title="Success Stories"
        subtitle="Real weddings, real happiness"
        testimonials={customTestimonials}
        layout="carousel"
      />

      {/* Example 4: Without View Toggle */}
      <TestimonialsSection
        title="Featured Reviews"
        subtitle="Handpicked testimonials from our clients"
        layout="grid"
        showViewToggle={false}
      />

      {/* Example 5: Minimal (3 testimonials) */}
      <TestimonialsSection
        title="What They Say"
        subtitle="Testimonials from recent weddings"
        testimonials={customTestimonials}
        layout="carousel"
        showViewToggle={false}
      />
    </div>
  );
}
