import { Request, Response } from 'express';
import { ITestimonialService } from '../../application/interfaces/ITestimonialService';
export declare class TestimonialController {
    private readonly testimonialService;
    constructor(testimonialService: ITestimonialService);
    getAllTestimonials(req: Request, res: Response): Promise<void>;
    getActiveTestimonials(req: Request, res: Response): Promise<void>;
    getTestimonialsByLanguage(req: Request, res: Response): Promise<void>;
    getTestimonialById(req: Request, res: Response): Promise<void>;
    createTestimonial(req: Request, res: Response): Promise<void>;
    submitTestimonial(req: Request, res: Response): Promise<void>;
    updateTestimonial(req: Request, res: Response): Promise<void>;
    deleteTestimonial(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=testimonial.controller.d.ts.map