import { ITestimonialRepository } from '../../domain/repositories/ITestimonialRepository';
import { Testimonial } from '../../domain/entities/Testimonial';
export declare class TestimonialRepository implements ITestimonialRepository {
    private readonly tableName;
    private mapRowToEntity;
    findAll(filters?: {
        keyword?: string;
        rating?: number;
        isActive?: boolean;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
    }): Promise<Testimonial[]>;
    findById(id: string): Promise<Testimonial | null>;
    findActive(): Promise<Testimonial[]>;
    findByLanguage(language: string): Promise<Testimonial[]>;
    create(testimonial: Testimonial): Promise<Testimonial>;
    update(id: string, data: Partial<Testimonial>): Promise<Testimonial | null>;
    delete(id: string): Promise<boolean>;
}
//# sourceMappingURL=TestimonialRepository.d.ts.map