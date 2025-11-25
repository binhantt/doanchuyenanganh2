import { Voucher } from '../entities/Voucher';
export interface IVoucherRepository {
    findAll(): Promise<Voucher[]>;
    findById(id: string): Promise<Voucher | null>;
    findByCode(code: string): Promise<Voucher | null>;
    findActive(): Promise<Voucher[]>;
    create(voucher: Voucher): Promise<Voucher>;
    update(id: string, data: Partial<Voucher>): Promise<Voucher | null>;
    delete(id: string): Promise<boolean>;
    incrementUsedCount(id: string): Promise<boolean>;
}
//# sourceMappingURL=IVoucherRepository.d.ts.map