import { Request, Response } from 'express';
import { ICategoryService } from '../../application/interfaces/ICategoryService';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: ICategoryService);
    list(req: Request, res: Response): Promise<Response>;
    getById(req: Request, res: Response): Promise<Response>;
    getBySlug(req: Request, res: Response): Promise<Response>;
    create(req: Request, res: Response): Promise<Response>;
    update(req: Request, res: Response): Promise<Response>;
    delete(req: Request, res: Response): Promise<Response>;
}
//# sourceMappingURL=category.controller.d.ts.map