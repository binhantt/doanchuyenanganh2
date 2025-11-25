import { Decoration } from '../entities/Decoration';
export interface IDecorationRepository {
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
//# sourceMappingURL=IDecorationRepository.d.ts.map