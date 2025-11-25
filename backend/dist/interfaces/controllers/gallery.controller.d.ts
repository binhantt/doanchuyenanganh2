import { Request, Response } from 'express';
import { IGalleryService } from '../../application/interfaces/IGalleryService';
export declare class GalleryController {
    private galleryService;
    constructor(galleryService: IGalleryService);
    getAllGalleries: (req: Request, res: Response) => Promise<void>;
    getGalleryById: (req: Request, res: Response) => Promise<void>;
    getGalleriesByRelated: (req: Request, res: Response) => Promise<void>;
    getPrimaryImage: (req: Request, res: Response) => Promise<void>;
    createGallery: (req: Request, res: Response) => Promise<void>;
    updateGallery: (req: Request, res: Response) => Promise<void>;
    deleteGallery: (req: Request, res: Response) => Promise<void>;
    setPrimaryImage: (req: Request, res: Response) => Promise<void>;
    updateDisplayOrder: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=gallery.controller.d.ts.map