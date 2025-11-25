import { Voucher } from '../../domain/entities/Voucher';
export interface IVoucherService {
    getAllVouchers(): Promise<Voucher[]>;
    getActiveVouchers(): Promise<Voucher[]>;
    getVoucherById(id: string): Promise<Voucher | null>;
    getVoucherByCode(code: string): Promise<Voucher | null>;
    createVoucher(data: {
        code: string;
        name: string;
        description?: string | null;
        discountType: 'percentage' | 'fixed';
        discountValue: number;
        maxDiscountAmount?: number | null;
        minOrderValue?: number | null;
        usageLimit?: number | null;
        usagePerCustomer?: number | null;
        startDate?: Date | null;
        endDate?: Date | null;
        isActive?: boolean;
    }): Promise<Voucher>;
    updateVoucher(id: string, data: Partial<Voucher>): Promise<Voucher | null>;
    deleteVoucher(id: string): Promise<boolean>;
}
//# sourceMappingURL=IVoucherService.d.ts.map