import { Decoration } from '../../domain/entities/Decoration';
import { IDecorationRepository } from '../../domain/repositories/IDecorationRepository';
import { IDecorationService } from '../interfaces/IDecorationService';
import { CreateDecorationDTO, UpdateDecorationDTO } from '../dto/DecorationDTO';
export declare class DecorationService implements IDecorationService {
    private readonly decorationRepository;
    constructor(decorationRepository: IDecorationRepository);
    getAllDecorations(onlyActive?: boolean): Promise<Decoration[]>;
    getDecorationById(id: string): Promise<Decoration | null>;
    getDecorationBySlug(slug: string): Promise<Decoration | null>;
    getDecorationsByTheme(theme: string): Promise<Decoration[]>;
    getDecorationsByStyle(style: string): Promise<Decoration[]>;
    createDecoration(data: CreateDecorationDTO): Promise<Decoration>;
    updateDecoration(id: string, data: UpdateDecorationDTO): Promise<Decoration | null>;
    deleteDecoration(id: string): Promise<boolean>;
}
//# sourceMappingURL=DecorationService.d.ts.map