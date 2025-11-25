import { IConsultationRepository } from '../../domain/repositories/IConsultationRepository';
import { Consultation } from '../../domain/entities/Consultation';
export declare class ConsultationRepository implements IConsultationRepository {
    private readonly tableName;
    private mapRowToEntity;
    findAll(filters?: {
        keyword?: string;
        status?: string;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
    }): Promise<Consultation[]>;
    findById(id: string): Promise<Consultation | null>;
    findByEmail(email: string): Promise<Consultation[]>;
    findByStatus(status: string): Promise<Consultation[]>;
    findByDateRange(startDate: Date, endDate: Date): Promise<Consultation[]>;
    create(consultation: Consultation): Promise<Consultation>;
    update(id: string, data: Partial<Consultation>): Promise<Consultation | null>;
    delete(id: string): Promise<boolean>;
}
//# sourceMappingURL=ConsultationRepository.d.ts.map