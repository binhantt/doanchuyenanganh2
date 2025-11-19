import { Testimonial } from '../../domain/entities/Testimonial';

export interface ITestimonialService {
  getAllTestimonials(filters?: any): Promise<Testimonial[]>;
  getTestimonialById(id: string): Promise<Testimonial | null>;
  getActiveTestimonials(): Promise<Testimonial[]>;
  getTestimonialsByLanguage(language: string): Promise<Testimonial[]>;
  createTestimonial(data: {
    clientName: string;
    clientRole: string;
    content: string;
    rating: number;
    eventDate: Date;
    location: string;
    language: string;
    isActive?: boolean;
  }): Promise<Testimonial>;
  updateTestimonial(id: string, data: Partial<Testimonial>): Promise<Testimonial | null>;
  deleteTestimonial(id: string): Promise<boolean>;
}
