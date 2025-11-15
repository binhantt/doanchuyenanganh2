import { ITestimonialService } from '../interfaces/ITestimonialService';
import { ITestimonialRepository } from '../../domain/repositories/ITestimonialRepository';
import { Testimonial } from '../../domain/entities/Testimonial';
import { v4 as uuidv4 } from 'uuid';

export class TestimonialService implements ITestimonialService {
  constructor(private readonly testimonialRepository: ITestimonialRepository) {}

  async getAllTestimonials(): Promise<Testimonial[]> {
    return this.testimonialRepository.findAll();
  }

  async getTestimonialById(id: string): Promise<Testimonial | null> {
    return this.testimonialRepository.findById(id);
  }

  async getActiveTestimonials(): Promise<Testimonial[]> {
    return this.testimonialRepository.findActive();
  }

  async getTestimonialsByLanguage(language: string): Promise<Testimonial[]> {
    return this.testimonialRepository.findByLanguage(language);
  }

  async createTestimonial(data: {
    clientName: string;
    clientRole: string;
    content: string;
    rating: number;
    eventDate: Date;
    location: string;
    language: string;
  }): Promise<Testimonial> {
    if (data.rating < 1 || data.rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    const testimonial = new Testimonial(
      uuidv4(),
      data.clientName,
      data.clientRole,
      data.content,
      data.rating,
      data.eventDate,
      data.location,
      data.language,
      true
    );

    return this.testimonialRepository.create(testimonial);
  }

  async updateTestimonial(id: string, data: Partial<Testimonial>): Promise<Testimonial | null> {
    if (data.rating !== undefined && (data.rating < 1 || data.rating > 5)) {
      throw new Error('Rating must be between 1 and 5');
    }

    return this.testimonialRepository.update(id, data);
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    return this.testimonialRepository.delete(id);
  }
}
