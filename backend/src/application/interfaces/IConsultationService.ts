import { Consultation } from '../../domain/entities/Consultation';

export interface IConsultationService {
  getAllConsultations(): Promise<Consultation[]>;
  getConsultationById(id: string): Promise<Consultation | null>;
  getConsultationsByEmail(email: string): Promise<Consultation[]>;
  getConsultationsByStatus(status: string): Promise<Consultation[]>;
  getConsultationsByDateRange(startDate: Date, endDate: Date): Promise<Consultation[]>;
  bookConsultation(data: {
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    weddingDate: Date;
    guestCount: number;
    venue: string;
    serviceType: string;
    budget: string;
    notes?: string;
  }): Promise<Consultation>;
  updateConsultation(id: string, data: Partial<Consultation>): Promise<Consultation | null>;
  deleteConsultation(id: string): Promise<boolean>;
}
