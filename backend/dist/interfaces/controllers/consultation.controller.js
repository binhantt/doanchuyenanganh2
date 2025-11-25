"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultationController = void 0;
class ConsultationController {
    constructor(consultationService) {
        this.consultationService = consultationService;
    }
    async getAllConsultations(req, res) {
        try {
            const { keyword, status, sortBy, sortOrder } = req.query;
            const filters = {};
            if (keyword)
                filters.keyword = keyword;
            if (status)
                filters.status = status;
            if (sortBy)
                filters.sortBy = sortBy;
            if (sortOrder)
                filters.sortOrder = sortOrder;
            const consultations = await this.consultationService.getAllConsultations(filters);
            res.json({
                success: true,
                data: consultations,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch consultations',
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }
    async getConsultationById(req, res) {
        try {
            const { id } = req.params;
            const consultation = await this.consultationService.getConsultationById(id);
            if (!consultation) {
                res.status(404).json({
                    success: false,
                    message: 'Consultation not found',
                });
                return;
            }
            res.json({
                success: true,
                data: consultation,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch consultation',
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }
    async getConsultationsByEmail(req, res) {
        try {
            const { email } = req.params;
            const consultations = await this.consultationService.getConsultationsByEmail(email);
            res.json({
                success: true,
                data: consultations,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch consultations',
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }
    async getConsultationsByStatus(req, res) {
        try {
            const { status } = req.params;
            const consultations = await this.consultationService.getConsultationsByStatus(status);
            res.json({
                success: true,
                data: consultations,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch consultations',
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }
    async bookConsultation(req, res) {
        try {
            const { clientName, clientEmail, clientPhone, weddingDate, guestCount, venue, serviceType, budget, notes } = req.body;
            if (!clientName || !clientEmail || !clientPhone || !weddingDate || !serviceType || !budget) {
                res.status(400).json({
                    success: false,
                    message: 'Missing required fields',
                });
                return;
            }
            const consultation = await this.consultationService.bookConsultation({
                clientName,
                clientEmail,
                clientPhone,
                weddingDate: new Date(weddingDate),
                guestCount: Number(guestCount),
                venue,
                serviceType,
                budget,
                notes,
            });
            res.status(201).json({
                success: true,
                message: 'Consultation booked successfully',
                data: consultation,
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: 'Failed to book consultation',
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }
    async updateConsultation(req, res) {
        try {
            const { id } = req.params;
            const consultation = await this.consultationService.updateConsultation(id, req.body);
            if (!consultation) {
                res.status(404).json({
                    success: false,
                    message: 'Consultation not found',
                });
                return;
            }
            res.json({
                success: true,
                data: consultation,
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: 'Failed to update consultation',
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }
    async deleteConsultation(req, res) {
        try {
            const { id } = req.params;
            const deleted = await this.consultationService.deleteConsultation(id);
            if (!deleted) {
                res.status(404).json({
                    success: false,
                    message: 'Consultation not found',
                });
                return;
            }
            res.json({
                success: true,
                message: 'Consultation deleted successfully',
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to delete consultation',
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }
}
exports.ConsultationController = ConsultationController;
//# sourceMappingURL=consultation.controller.js.map