import { IConsultationRepository } from '../../domain/repositories/IConsultationRepository';
import { Consultation } from '../../domain/entities/Consultation';
import knex from 'knex';
import databaseConfig from '../config/database';

const db = knex(databaseConfig);

interface ConsultationRow {
  id: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  wedding_date: Date;
  guest_count: number;
  venue: string;
  service_type: string;
  budget: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: Date;
  updated_at: Date;
}

export class ConsultationRepository implements IConsultationRepository {
  private readonly tableName = 'consultations';

  private mapRowToEntity(row: ConsultationRow): Consultation {
    return new Consultation(
      row.id,
      row.client_name,
      row.client_email,
      row.client_phone,
      new Date(row.wedding_date),
      row.guest_count,
      row.venue,
      row.service_type,
      row.budget,
      row.notes,
      row.status,
      new Date(row.created_at),
      new Date(row.updated_at)
    );
  }

  async findAll(): Promise<Consultation[]> {
    const rows = await db<ConsultationRow>(this.tableName).select('*').orderBy('created_at', 'desc');
    return rows.map((row) => this.mapRowToEntity(row));
  }

  async findById(id: string): Promise<Consultation | null> {
    const row = await db<ConsultationRow>(this.tableName).where({ id }).first();
    return row ? this.mapRowToEntity(row) : null;
  }

  async findByEmail(email: string): Promise<Consultation[]> {
    const rows = await db<ConsultationRow>(this.tableName)
      .where({ client_email: email })
      .orderBy('created_at', 'desc')
      .select('*');
    return rows.map((row) => this.mapRowToEntity(row));
  }

  async findByStatus(status: string): Promise<Consultation[]> {
    const rows = await db<ConsultationRow>(this.tableName)
      .where({ status })
      .orderBy('wedding_date', 'asc')
      .select('*');
    return rows.map((row) => this.mapRowToEntity(row));
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Consultation[]> {
    const rows = await db<ConsultationRow>(this.tableName)
      .whereBetween('wedding_date', [startDate, endDate])
      .orderBy('wedding_date', 'asc')
      .select('*');
    return rows.map((row) => this.mapRowToEntity(row));
  }

  async create(consultation: Consultation): Promise<Consultation> {
    await db(this.tableName).insert({
      id: consultation.id,
      client_name: consultation.clientName,
      client_email: consultation.clientEmail,
      client_phone: consultation.clientPhone,
      wedding_date: consultation.weddingDate,
      guest_count: consultation.guestCount,
      venue: consultation.venue,
      service_type: consultation.serviceType,
      budget: consultation.budget,
      notes: consultation.notes,
      status: consultation.status,
    });

    return consultation;
  }

  async update(id: string, data: Partial<Consultation>): Promise<Consultation | null> {
    const updateData: any = {};

    if (data.clientName) updateData.client_name = data.clientName;
    if (data.clientEmail) updateData.client_email = data.clientEmail;
    if (data.clientPhone) updateData.client_phone = data.clientPhone;
    if (data.weddingDate) updateData.wedding_date = data.weddingDate;
    if (data.guestCount !== undefined) updateData.guest_count = data.guestCount;
    if (data.venue) updateData.venue = data.venue;
    if (data.serviceType) updateData.service_type = data.serviceType;
    if (data.budget) updateData.budget = data.budget;
    if (data.notes) updateData.notes = data.notes;
    if (data.status) updateData.status = data.status;

    updateData.updated_at = db.fn.now();

    const updated = await db(this.tableName).where({ id }).update(updateData);

    if (updated === 0) {
      return null;
    }

    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await db(this.tableName).where({ id }).del();
    return deleted > 0;
  }
}
