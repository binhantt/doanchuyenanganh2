import { Request, Response } from 'express';
import { IProductService } from '../../application/interfaces/IProductService';
export declare class ProductController {
    private productService;
    constructor(productService: IProductService);
    getAllProducts: (req: Request, res: Response) => Promise<void>;
    getProductById: (req: Request, res: Response) => Promise<void>;
    getProductBySlug: (req: Request, res: Response) => Promise<void>;
    getProductsByCategory: (req: Request, res: Response) => Promise<void>;
    createProduct: (req: Request, res: Response) => Promise<void>;
    updateProduct: (req: Request, res: Response) => Promise<void>;
    deleteProduct: (req: Request, res: Response) => Promise<void>;
    getStock: (req: Request, res: Response) => Promise<void>;
    updateStock: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=product.controller.d.ts.map