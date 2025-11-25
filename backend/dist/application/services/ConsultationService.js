"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultationService = void 0;
const Consultation_1 = require("../../domain/entities/Consultation");
const uuid_1 = require("uuid");
class ConsultationService {
    constructor(consultationRepository) {
        this.consultationRepository = consultationRepository;
    }
    async getAllConsultations() {
        return this.consultationRepository.findAll();
    }
    async getConsultationById(id) {
        return this.consultationRepository.findById(id);
    }
    async getConsultationsByEmail(email) {
        return this.consultationRepository.findByEmail(email);
    }
    async getConsultationsByStatus(status) {
        return this.consultationRepository.findByStatus(status);
    }
    async getConsultationsByDateRange(startDate, endDate) {
        return this.consultationRepository.findByDateRange(startDate, endDate);
    }
    async bookConsultation(data) {
        if (!data.clientName || !data.clientEmail || !data.clientPhone || !data.weddingDate || !data.serviceType || !data.budget) {
            throw new Error('Missing required fields');
        }
        if (data.guestCount < 1) {
            throw new Error('Guest count must be at least 1');
        }
        const consultation = new Consultation_1.Consultation((0, uuid_1.v4)(), data.clientName, data.clientEmail, data.clientPhone, data.weddingDate, data.guestCount, data.venue, data.serviceType, data.budget, data.notes || '', 'pending');
        return this.consultationRepository.create(consultation);
    }
    async updateConsultation(id, data) {
        return this.consultationRepository.update(id, data);
    }
    async deleteConsultation(id) {
        return this.consultationRepository.delete(id);
    }
}
exports.ConsultationService = ConsultationService;
//# sourceMappingURL=ConsultationService.js.map