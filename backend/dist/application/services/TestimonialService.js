"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialService = void 0;
const Testimonial_1 = require("../../domain/entities/Testimonial");
const uuid_1 = require("uuid");
class TestimonialService {
    constructor(testimonialRepository) {
        this.testimonialRepository = testimonialRepository;
    }
    async getAllTestimonials(filters) {
        return this.testimonialRepository.findAll(filters);
    }
    async getTestimonialById(id) {
        return this.testimonialRepository.findById(id);
    }
    async getActiveTestimonials() {
        return this.testimonialRepository.findActive();
    }
    async getTestimonialsByLanguage(language) {
        return this.testimonialRepository.findByLanguage(language);
    }
    async createTestimonial(data) {
        if (data.rating < 1 || data.rating > 5) {
            throw new Error('Rating must be between 1 and 5');
        }
        const testimonial = new Testimonial_1.Testimonial((0, uuid_1.v4)(), data.clientName, data.clientRole, data.content, data.rating, data.eventDate, data.location, data.language, data.isActive !== undefined ? data.isActive : true);
        return this.testimonialRepository.create(testimonial);
    }
    async updateTestimonial(id, data) {
        if (data.rating !== undefined && (data.rating < 1 || data.rating > 5)) {
            throw new Error('Rating must be between 1 and 5');
        }
        return this.testimonialRepository.update(id, data);
    }
    async deleteTestimonial(id) {
        return this.testimonialRepository.delete(id);
    }
}
exports.TestimonialService = TestimonialService;
//# sourceMappingURL=TestimonialService.js.map