"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAQController = void 0;
class FAQController {
    constructor(faqService) {
        this.faqService = faqService;
    }
    async getAllFAQs(req, res) {
        try {
            const { keyword, category, isActive, sortBy, sortOrder } = req.query;
            const filters = {};
            if (keyword)
                filters.keyword = keyword;
            if (category)
                filters.category = category;
            if (isActive !== undefined)
                filters.isActive = isActive === 'true';
            if (sortBy)
                filters.sortBy = sortBy;
            if (sortOrder)
                filters.sortOrder = sortOrder;
            const faqs = await this.faqService.getAllFAQs(filters);
            res.json({
                success: true,
                data: faqs,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch FAQs',
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }
    async getActiveFAQs(req, res) {
        try {
            const faqs = await this.faqService.getActiveFAQs();
            res.json({
                success: true,
                data: faqs,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch FAQs',
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }
    async getFAQsByCategory(req, res) {
        try {
            const { category } = req.params;
            const faqs = await this.faqService.getFAQsByCategory(category);
            res.json({
                success: true,
                data: faqs,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch FAQs',
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }
    async getFAQsByLanguage(req, res) {
        try {
            const { language } = req.params;
            const faqs = await this.faqService.getFAQsByLanguage(language);
            res.json({
                success: true,
                data: faqs,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch FAQs',
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }
    async getFAQsByCategoryAndLanguage(req, res) {
        try {
            const { category, language } = req.params;
            const faqs = await this.faqService.getFAQsByCategoryAndLanguage(category, language);
            res.json({
                success: true,
                data: faqs,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch FAQs',
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }
    async getFAQById(req, res) {
        try {
            const { id } = req.params;
            const faq = await this.faqService.getFAQById(id);
            if (!faq) {
                res.status(404).json({
                    success: false,
                    message: 'FAQ not found',
                });
                return;
            }
            res.json({
                success: true,
                data: faq,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch FAQ',
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }
    async createFAQ(req, res) {
        try {
            const { question, answer, category, language, displayOrder, isActive } = req.body;
            if (!question || !answer || !category) {
                res.status(400).json({
                    success: false,
                    message: 'Missing required fields: question, answer, category',
                });
                return;
            }
            const faq = await this.faqService.createFAQ({
                question,
                answer,
                category,
                language: language || 'vi', // Default to Vietnamese
                displayOrder: displayOrder !== undefined ? Number(displayOrder) : 0,
                isActive: isActive !== undefined ? isActive : true,
            });
            res.status(201).json({
                success: true,
                data: faq,
            });
        }
        catch (error) {
            console.error('Create FAQ error:', error);
            res.status(400).json({
                success: false,
                message: 'Failed to create FAQ',
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }
    async updateFAQ(req, res) {
        try {
            const { id } = req.params;
            const faq = await this.faqService.updateFAQ(id, req.body);
            if (!faq) {
                res.status(404).json({
                    success: false,
                    message: 'FAQ not found',
                });
                return;
            }
            res.json({
                success: true,
                data: faq,
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: 'Failed to update FAQ',
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }
    async deleteFAQ(req, res) {
        try {
            const { id } = req.params;
            const deleted = await this.faqService.deleteFAQ(id);
            if (!deleted) {
                res.status(404).json({
                    success: false,
                    message: 'FAQ not found',
                });
                return;
            }
            res.json({
                success: true,
                message: 'FAQ deleted successfully',
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to delete FAQ',
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }
}
exports.FAQController = FAQController;
//# sourceMappingURL=faq.controller.js.map