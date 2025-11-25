import { Decoration } from '../../domain/entities/Decoration';
import { CreateDecorationDTO, UpdateDecorationDTO } from '../dto/DecorationDTO';
export interface IDecorationService {
    getAllDecorations(onlyActive?: boolean): Promise<Decoration[]>;
    getDecorationById(id: string): Promise<Decoration | null>;
    getDecorationBySlug(slug: string): Promise<Decoration | null>;
    getDecorationsByTheme(theme: string): Promise<Decoration[]>;
    getDecorationsByStyle(style: string): Promise<Decoration[]>;
    createDecoration(data: CreateDecorationDTO): Promise<Decoration>;
    updateDecoration(id: string, data: UpdateDecorationDTO): Promise<Decoration | null>;
    deleteDecoration(id: string): Promise<boolean>;
}
//# sourceMappingURL=IDecorationService.d.ts.map