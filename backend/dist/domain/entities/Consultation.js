"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consultation = void 0;
class Consultation {
    constructor(id, clientName, clientEmail, clientPhone, weddingDate, guestCount, venue, serviceType, budget, notes, status = 'pending', createdAt, updatedAt) {
        this.id = id;
        this.clientName = clientName;
        this.clientEmail = clientEmail;
        this.clientPhone = clientPhone;
        this.weddingDate = weddingDate;
        this.guestCount = guestCount;
        this.venue = venue;
        this.serviceType = serviceType;
        this.budget = budget;
        this.notes = notes;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    isPending() {
        return this.status === 'pending';
    }
    isConfirmed() {
        return this.status === 'confirmed';
    }
    getDisplayDate() {
        return this.weddingDate.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }
}
exports.Consultation = Consultation;
//# sourceMappingURL=Consultation.js.map