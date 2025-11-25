import { Request, Response } from 'express';
import { IConsultationService } from '../../application/interfaces/IConsultationService';
export declare class ConsultationController {
    private readonly consultationService;
    constructor(consultationService: IConsultationService);
    getAllConsultations(req: Request, res: Response): Promise<void>;
    getConsultationById(req: Request, res: Response): Promise<void>;
    getConsultationsByEmail(req: Request, res: Response): Promise<void>;
    getConsultationsByStatus(req: Request, res: Response): Promise<void>;
    bookConsultation(req: Request, res: Response): Promise<void>;
    updateConsultation(req: Request, res: Response): Promise<void>;
    deleteConsultation(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=consultation.controller.d.ts.map