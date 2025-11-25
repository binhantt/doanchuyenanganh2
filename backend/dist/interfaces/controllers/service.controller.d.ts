import { Request, Response } from 'express';
import { IServiceService } from '../../application/interfaces/IServiceService';
export declare class ServiceController {
    private readonly serviceService;
    constructor(serviceService: IServiceService);
    list(req: Request, res: Response): Promise<Response>;
    getById(req: Request, res: Response): Promise<Response>;
    getBySlug(req: Request, res: Response): Promise<Response>;
    create(req: Request, res: Response): Promise<Response>;
    update(req: Request, res: Response): Promise<Response>;
    delete(req: Request, res: Response): Promise<Response>;
    addImage(req: Request, res: Response): Promise<Response>;
    removeImage(req: Request, res: Response): Promise<Response>;
    getImages(req: Request, res: Response): Promise<Response>;
}
//# sourceMappingURL=service.controller.d.ts.map