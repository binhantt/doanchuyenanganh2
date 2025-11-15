import { Consultation } from '../entities/Consultation';

export interface IConsultationRepository {
  findAll(): Promise<Consultation[]>;
  findById(id: string): Promise<Consultation | null>;
  findByEmail(email: string): Promise<Consultation[]>;
  findByStatus(status: string): Promise<Consultation[]>;
  findByDateRange(startDate: Date, endDate: Date): Promise<Consultation[]>;
  create(consultation: Consultation): Promise<Consultation>;
  update(id: string, data: Partial<Consultation>): Promise<Consultation | null>;
  delete(id: string): Promise<boolean>;
}
