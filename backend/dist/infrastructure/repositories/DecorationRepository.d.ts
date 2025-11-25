import { IDecorationRepository } from '../../domain/repositories/IDecorationRepository';
import { Decoration } from '../../domain/entities/Decoration';
export declare class DecorationRepository implements IDecorationRepository {
    private readonly tableName;
    private mapRowToEntity;
    findAll(): Promise<Decoration[]>;
    findById(id: string): Promise<Decoration | null>;
    findBySlug(slug: string): Promise<Decoration | null>;
    findActive(): Promise<Decoration[]>;
    findByTheme(theme: string): Promise<Decoration[]>;
    findByStyle(style: string): Promise<Decoration[]>;
    create(decoration: Decoration): Promise<Decoration>;
    update(id: string, data: Partial<Decoration>): Promise<Decoration | null>;
    delete(id: string): Promise<boolean>;
}
//# sourceMappingURL=DecorationRepository.d.ts.map