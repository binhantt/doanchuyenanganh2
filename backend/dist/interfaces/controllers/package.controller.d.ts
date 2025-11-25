import { Request, Response } from 'express';
import { IPackageService } from '../../application/interfaces/IPackageService';
export declare class PackageController {
    private readonly packageService;
    constructor(packageService: IPackageService);
    getAllPackages(req: Request, res: Response): Promise<void>;
    getPackageById(req: Request, res: Response): Promise<void>;
    list(req: Request, res: Response): Promise<Response>;
    getById(req: Request, res: Response): Promise<Response>;
    getBySlug(req: Request, res: Response): Promise<Response>;
    create(req: Request, res: Response): Promise<Response>;
    update(req: Request, res: Response): Promise<Response>;
    delete(req: Request, res: Response): Promise<Response>;
}
//# sourceMappingURL=package.controller.d.ts.map