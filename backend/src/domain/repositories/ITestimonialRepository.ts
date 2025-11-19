import { Testimonial } from '../entities/Testimonial';

export interface ITestimonialRepository {
  findAll(filters?: any): Promise<Testimonial[]>;
  findById(id: string): Promise<Testimonial | null>;
  findActive(): Promise<Testimonial[]>;
  findByLanguage(language: string): Promise<Testimonial[]>;
  create(testimonial: Testimonial): Promise<Testimonial>;
  update(id: string, data: Partial<Testimonial>): Promise<Testimonial | null>;
  delete(id: string): Promise<boolean>;
}
