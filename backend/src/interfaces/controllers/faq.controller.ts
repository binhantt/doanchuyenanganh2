import { Request, Response } from 'express';
import { IFAQService } from '../../application/interfaces/IFAQService';

export class FAQController {
  constructor(private readonly faqService: IFAQService) {}

  async getAllFAQs(req: Request, res: Response): Promise<void> {
    try {
      const faqs = await this.faqService.getAllFAQs();
      res.json({
        success: true,
        data: faqs,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch FAQs',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getActiveFAQs(req: Request, res: Response): Promise<void> {
    try {
      const faqs = await this.faqService.getActiveFAQs();
      res.json({
        success: true,
        data: faqs,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch FAQs',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getFAQsByCategory(req: Request, res: Response): Promise<void> {
    try {
      const { category } = req.params;
      const faqs = await this.faqService.getFAQsByCategory(category);
      res.json({
        success: true,
        data: faqs,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch FAQs',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getFAQsByLanguage(req: Request, res: Response): Promise<void> {
    try {
      const { language } = req.params;
      const faqs = await this.faqService.getFAQsByLanguage(language);
      res.json({
        success: true,
        data: faqs,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch FAQs',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getFAQsByCategoryAndLanguage(req: Request, res: Response): Promise<void> {
    try {
      const { category, language } = req.params;
      const faqs = await this.faqService.getFAQsByCategoryAndLanguage(category, language);
      res.json({
        success: true,
        data: faqs,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch FAQs',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getFAQById(req: Request, res: Response): Promise<void> {
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
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch FAQ',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async createFAQ(req: Request, res: Response): Promise<void> {
    try {
      const { question, answer, category, language, displayOrder } = req.body;

      if (!question || !answer || !category || !language) {
        res.status(400).json({
          success: false,
          message: 'Missing required fields',
        });
        return;
      }

      const faq = await this.faqService.createFAQ({
        question,
        answer,
        category,
        language,
        displayOrder: displayOrder || 0,
      });

      res.status(201).json({
        success: true,
        data: faq,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Failed to create FAQ',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async updateFAQ(req: Request, res: Response): Promise<void> {
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
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Failed to update FAQ',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async deleteFAQ(req: Request, res: Response): Promise<void> {
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
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to delete FAQ',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}
