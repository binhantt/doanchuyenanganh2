import { Request, Response } from 'express';
import { IPromotionService } from '../../application/interfaces/IPromotionService';
export declare class PromotionController {
    private readonly promotionService;
    constructor(promotionService: IPromotionService);
    list(req: Request, res: Response): Promise<Response>;
    getById(req: Request, res: Response): Promise<Response>;
    getByCode(req: Request, res: Response): Promise<Response>;
    getByService(req: Request, res: Response): Promise<Response>;
    getByPackage(req: Request, res: Response): Promise<Response>;
    create(req: Request, res: Response): Promise<Response>;
    update(req: Request, res: Response): Promise<Response>;
    delete(req: Request, res: Response): Promise<Response>;
}
//# sourceMappingURL=promotion.controller.d.ts.map