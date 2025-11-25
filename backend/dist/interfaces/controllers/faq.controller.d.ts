import { Request, Response } from 'express';
import { IFAQService } from '../../application/interfaces/IFAQService';
export declare class FAQController {
    private readonly faqService;
    constructor(faqService: IFAQService);
    getAllFAQs(req: Request, res: Response): Promise<void>;
    getActiveFAQs(req: Request, res: Response): Promise<void>;
    getFAQsByCategory(req: Request, res: Response): Promise<void>;
    getFAQsByLanguage(req: Request, res: Response): Promise<void>;
    getFAQsByCategoryAndLanguage(req: Request, res: Response): Promise<void>;
    getFAQById(req: Request, res: Response): Promise<void>;
    createFAQ(req: Request, res: Response): Promise<void>;
    updateFAQ(req: Request, res: Response): Promise<void>;
    deleteFAQ(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=faq.controller.d.ts.map