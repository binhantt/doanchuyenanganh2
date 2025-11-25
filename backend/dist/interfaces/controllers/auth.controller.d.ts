import { Request, Response } from 'express';
import { AuthService } from '../../application/services/AuthService';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: Request, res: Response): Promise<void>;
    verify(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=auth.controller.d.ts.map