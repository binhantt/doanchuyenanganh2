'use client';

import TestimonialCard from './TestimonialCard';
import { Testimonial } from '../types';

interface TestimonialsGridProps {
  testimonials: Testimonial[];
}

export default function TestimonialsGrid({
  testimonials,
}: TestimonialsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => (
        <div
          key={testimonial.id}
          className="animate-fade-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <TestimonialCard testimonial={testimonial} />
        </div>
      ))}
    </div>
  );
}
