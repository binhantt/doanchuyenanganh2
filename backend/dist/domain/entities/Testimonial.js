"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Testimonial = void 0;
class Testimonial {
    constructor(id, clientName, clientRole, content, rating, eventDate, location, language, isActive = true, createdAt, updatedAt) {
        this.id = id;
        this.clientName = clientName;
        this.clientRole = clientRole;
        this.content = content;
        this.rating = rating;
        this.eventDate = eventDate;
        this.location = location;
        this.language = language;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    isVisible() {
        return this.isActive;
    }
    getDisplayDate() {
        return this.eventDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
        });
    }
}
exports.Testimonial = Testimonial;
//# sourceMappingURL=Testimonial.js.map