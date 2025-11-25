"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultationRepository = void 0;
const Consultation_1 = require("../../domain/entities/Consultation");
const knex_1 = __importDefault(require("knex"));
const database_1 = __importDefault(require("../config/database"));
const db = (0, knex_1.default)(database_1.default);
class ConsultationRepository {
    constructor() {
        this.tableName = 'consultations';
    }
    mapRowToEntity(row) {
        return new Consultation_1.Consultation(row.id, row.client_name, row.client_email, row.client_phone, new Date(row.wedding_date), row.guest_count, row.venue, row.service_type, row.budget, row.notes, row.status, new Date(row.created_at), new Date(row.updated_at));
    }
    async findAll(filters) {
        let query = db(this.tableName);
        if (filters?.keyword) {
            query = query.where((builder) => {
                builder
                    .where('client_name', 'like', `%${filters.keyword}%`)
                    .orWhere('client_email', 'like', `%${filters.keyword}%`)
                    .orWhere('client_phone', 'like', `%${filters.keyword}%`)
                    .orWhere('venue', 'like', `%${filters.keyword}%`);
            });
        }
        if (filters?.status) {
            query = query.where('status', filters.status);
        }
        // Map camelCase to snake_case for database columns
        const columnMap = {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            weddingDate: 'wedding_date',
            clientName: 'client_name',
            guestCount: 'guest_count'
        };
        const sortBy = filters?.sortBy || 'created_at';
        const sortOrder = filters?.sortOrder || 'desc';
        const dbColumn = columnMap[sortBy] || sortBy;
        const rows = await query.orderBy(dbColumn, sortOrder).select('*');
        return rows.map((row) => this.mapRowToEntity(row));
    }
    async findById(id) {
        const row = await db(this.tableName).where({ id }).first();
        return row ? this.mapRowToEntity(row) : null;
    }
    async findByEmail(email) {
        const rows = await db(this.tableName)
            .where({ client_email: email })
            .orderBy('created_at', 'desc')
            .select('*');
        return rows.map((row) => this.mapRowToEntity(row));
    }
    async findByStatus(status) {
        const rows = await db(this.tableName)
            .where({ status })
            .orderBy('wedding_date', 'asc')
            .select('*');
        return rows.map((row) => this.mapRowToEntity(row));
    }
    async findByDateRange(startDate, endDate) {
        const rows = await db(this.tableName)
            .whereBetween('wedding_date', [startDate, endDate])
            .orderBy('wedding_date', 'asc')
            .select('*');
        return rows.map((row) => this.mapRowToEntity(row));
    }
    async create(consultation) {
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
    async update(id, data) {
        const updateData = {};
        if (data.clientName)
            updateData.client_name = data.clientName;
        if (data.clientEmail)
            updateData.client_email = data.clientEmail;
        if (data.clientPhone)
            updateData.client_phone = data.clientPhone;
        if (data.weddingDate)
            updateData.wedding_date = data.weddingDate;
        if (data.guestCount !== undefined)
            updateData.guest_count = data.guestCount;
        if (data.venue)
            updateData.venue = data.venue;
        if (data.serviceType)
            updateData.service_type = data.serviceType;
        if (data.budget)
            updateData.budget = data.budget;
        if (data.notes)
            updateData.notes = data.notes;
        if (data.status)
            updateData.status = data.status;
        updateData.updated_at = db.fn.now();
        const updated = await db(this.tableName).where({ id }).update(updateData);
        if (updated === 0) {
            return null;
        }
        return this.findById(id);
    }
    async delete(id) {
        const deleted = await db(this.tableName).where({ id }).del();
        return deleted > 0;
    }
}
exports.ConsultationRepository = ConsultationRepository;
//# sourceMappingURL=ConsultationRepository.js.map