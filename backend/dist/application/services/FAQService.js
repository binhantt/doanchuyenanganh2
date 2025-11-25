"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAQService = void 0;
const FAQ_1 = require("../../domain/entities/FAQ");
const uuid_1 = require("uuid");
class FAQService {
    constructor(faqRepository) {
        this.faqRepository = faqRepository;
    }
    async getAllFAQs(filters) {
        return this.faqRepository.findAll(filters);
    }
    async getFAQById(id) {
        return this.faqRepository.findById(id);
    }
    async getActiveFAQs() {
        return this.faqRepository.findActive();
    }
    async getFAQsByCategory(category) {
        return this.faqRepository.findByCategory(category);
    }
    async getFAQsByLanguage(language) {
        return this.faqRepository.findByLanguage(language);
    }
    async getFAQsByCategoryAndLanguage(category, language) {
        return this.faqRepository.findByCategoryAndLanguage(category, language);
    }
    async createFAQ(data) {
        if (!data.question || !data.answer || !data.category || !data.language) {
            throw new Error('Missing required fields');
        }
        const faq = new FAQ_1.FAQ((0, uuid_1.v4)(), data.question, data.answer, data.category, data.language, data.displayOrder, data.isActive !== undefined ? data.isActive : true);
        return this.faqRepository.create(faq);
    }
    async updateFAQ(id, data) {
        return this.faqRepository.update(id, data);
    }
    async deleteFAQ(id) {
        return this.faqRepository.delete(id);
    }
}
exports.FAQService = FAQService;
//# sourceMappingURL=FAQService.js.map