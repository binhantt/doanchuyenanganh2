import { Request, Response } from 'express';
import { IVoucherService } from '../../application/interfaces/IVoucherService';
export declare class VoucherController {
    private readonly voucherService;
    constructor(voucherService: IVoucherService);
    getAllVouchers(req: Request, res: Response): Promise<void>;
    getActiveVouchers(req: Request, res: Response): Promise<void>;
    getVoucherById(req: Request, res: Response): Promise<void>;
    getVoucherByCode(req: Request, res: Response): Promise<void>;
    validateVoucher(req: Request, res: Response): Promise<void>;
    createVoucher(req: Request, res: Response): Promise<void>;
    updateVoucher(req: Request, res: Response): Promise<void>;
    deleteVoucher(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=voucher.controller.d.ts.map