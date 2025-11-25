import { IVoucherRepository } from '../../domain/repositories/IVoucherRepository';
import { Voucher } from '../../domain/entities/Voucher';
export declare class VoucherRepository implements IVoucherRepository {
    private readonly tableName;
    private mapRowToEntity;
    findAll(): Promise<Voucher[]>;
    findById(id: string): Promise<Voucher | null>;
    findByCode(code: string): Promise<Voucher | null>;
    findActive(): Promise<Voucher[]>;
    create(voucher: Voucher): Promise<Voucher>;
    update(id: string, data: Partial<Voucher>): Promise<Voucher | null>;
    delete(id: string): Promise<boolean>;
    incrementUsedCount(id: string): Promise<boolean>;
}
//# sourceMappingURL=VoucherRepository.d.ts.map