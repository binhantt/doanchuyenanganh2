import { Request, Response } from 'express';
import { IDecorationService } from '../../application/interfaces/IDecorationService';
export declare class DecorationController {
    private readonly decorationService;
    constructor(decorationService: IDecorationService);
    list(req: Request, res: Response): Promise<Response>;
    getById(req: Request, res: Response): Promise<Response>;
    getBySlug(req: Request, res: Response): Promise<Response>;
    create(req: Request, res: Response): Promise<Response>;
    update(req: Request, res: Response): Promise<Response>;
    delete(req: Request, res: Response): Promise<Response>;
}
//# sourceMappingURL=decoration.controller.d.ts.map