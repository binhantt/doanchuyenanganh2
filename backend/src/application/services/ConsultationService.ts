import { IConsultationService } from '../interfaces/IConsultationService';
import { IConsultationRepository } from '../../domain/repositories/IConsultationRepository';
import { Consultation } from '../../domain/entities/Consultation';
import { v4 as uuidv4 } from 'uuid';

export class ConsultationService implements IConsultationService {
  constructor(private readonly consultationRepository: IConsultationRepository) {}

  async getAllConsultations(): Promise<Consultation[]> {
    return this.consultationRepository.findAll();
  }

  async getConsultationById(id: string): Promise<Consultation | null> {
    return this.consultationRepository.findById(id);
  }

  async getConsultationsByEmail(email: string): Promise<Consultation[]> {
    return this.consultationRepository.findByEmail(email);
  }

  async getConsultationsByStatus(status: string): Promise<Consultation[]> {
    return this.consultationRepository.findByStatus(status);
  }

  async getConsultationsByDateRange(startDate: Date, endDate: Date): Promise<Consultation[]> {
    return this.consultationRepository.findByDateRange(startDate, endDate);
  }

  async bookConsultation(data: {
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    weddingDate: Date;
    guestCount: number;
    venue: string;
    serviceType: string;
    budget: string;
    notes?: string;
  }): Promise<Consultation> {
    if (!data.clientName || !data.clientEmail || !data.clientPhone || !data.weddingDate || !data.serviceType || !data.budget) {
      throw new Error('Missing required fields');
    }

    if (data.guestCount < 1) {
      throw new Error('Guest count must be at least 1');
    }

    const consultation = new Consultation(
      uuidv4(),
      data.clientName,
      data.clientEmail,
      data.clientPhone,
      data.weddingDate,
      data.guestCount,
      data.venue,
      data.serviceType,
      data.budget,
      data.notes || '',
      'pending'
    );

    return this.consultationRepository.create(consultation);
  }

  async updateConsultation(id: string, data: Partial<Consultation>): Promise<Consultation | null> {
    return this.consultationRepository.update(id, data);
  }

  async deleteConsultation(id: string): Promise<boolean> {
    return this.consultationRepository.delete(id);
  }
}
