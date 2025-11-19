import { Request, Response } from 'express';
import { ITestimonialService } from '../../application/interfaces/ITestimonialService';

export class TestimonialController {
  constructor(private readonly testimonialService: ITestimonialService) {}

  async getAllTestimonials(req: Request, res: Response): Promise<void> {
    try {
      const { keyword, rating, isActive, sortBy, sortOrder } = req.query;

      const filters: any = {};
      if (keyword) filters.keyword = keyword as string;
      if (rating) filters.rating = Number(rating);
      if (isActive !== undefined) filters.isActive = isActive === 'true';
      if (sortBy) filters.sortBy = sortBy as string;
      if (sortOrder) filters.sortOrder = sortOrder as 'asc' | 'desc';

      const testimonials = await this.testimonialService.getAllTestimonials(filters);
      res.json({
        success: true,
        data: testimonials,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch testimonials',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getActiveTestimonials(req: Request, res: Response): Promise<void> {
    try {
      const testimonials = await this.testimonialService.getActiveTestimonials();
      res.json({
        success: true,
        data: testimonials,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch testimonials',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getTestimonialsByLanguage(req: Request, res: Response): Promise<void> {
    try {
      const { language } = req.params;
      const testimonials = await this.testimonialService.getTestimonialsByLanguage(language);
      res.json({
        success: true,
        data: testimonials,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch testimonials',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getTestimonialById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const testimonial = await this.testimonialService.getTestimonialById(id);

      if (!testimonial) {
        res.status(404).json({
          success: false,
          message: 'Testimonial not found',
        });
        return;
      }

      res.json({
        success: true,
        data: testimonial,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch testimonial',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async createTestimonial(req: Request, res: Response): Promise<void> {
    try {
      const { clientName, clientRole, content, rating, eventDate, location, language } = req.body;

      if (!clientName || !clientRole || !content || !rating || !eventDate || !location || !language) {
        res.status(400).json({
          success: false,
          message: 'Missing required fields',
        });
        return;
      }

      const testimonial = await this.testimonialService.createTestimonial({
        clientName,
        clientRole,
        content,
        rating: Number(rating),
        eventDate: new Date(eventDate),
        location,
        language,
      });

      res.status(201).json({
        success: true,
        data: testimonial,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Failed to create testimonial',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async submitTestimonial(req: Request, res: Response): Promise<void> {
    try {
      const { clientName, clientRole, content, rating, eventDate, location, language } = req.body;

      if (!clientName || !content || !rating) {
        res.status(400).json({
          success: false,
          message: 'Vui lòng điền đầy đủ thông tin: Tên, Nội dung và Đánh giá',
        });
        return;
      }

      // Create testimonial with isActive = false (pending approval)
      const testimonial = await this.testimonialService.createTestimonial({
        clientName,
        clientRole: clientRole || 'Khách hàng',
        content,
        rating: Number(rating),
        eventDate: eventDate ? new Date(eventDate) : new Date(),
        location: location || 'Việt Nam',
        language: language || 'vi',
        isActive: false,
      });

      res.status(201).json({
        success: true,
        message: 'Cảm ơn bạn đã gửi đánh giá! Đánh giá của bạn sẽ được hiển thị sau khi được duyệt.',
        data: testimonial,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Không thể gửi đánh giá. Vui lòng thử lại sau.',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async updateTestimonial(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: any = { ...req.body };
      
      // Convert eventDate string to Date if provided
      if (updateData.eventDate) {
        updateData.eventDate = new Date(updateData.eventDate);
      }
      
      // Convert rating to number if provided
      if (updateData.rating !== undefined) {
        updateData.rating = Number(updateData.rating);
      }

      const testimonial = await this.testimonialService.updateTestimonial(id, updateData);

      if (!testimonial) {
        res.status(404).json({
          success: false,
          message: 'Testimonial not found',
        });
        return;
      }

      res.json({
        success: true,
        data: testimonial,
      });
    } catch (error) {
      console.error('Update testimonial error:', error);
      res.status(400).json({
        success: false,
        message: 'Failed to update testimonial',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async deleteTestimonial(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await this.testimonialService.deleteTestimonial(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Testimonial not found',
        });
        return;
      }

      res.json({
        success: true,
        message: 'Testimonial deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to delete testimonial',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}
