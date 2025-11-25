import { Request, Response } from 'express';
import { IUserService } from '../../application/interfaces/IUserService';
export declare class UserController {
    private readonly userService;
    constructor(userService: IUserService);
    getAllUsers(req: Request, res: Response): Promise<void>;
    getUserById(req: Request, res: Response): Promise<void>;
    createUser(req: Request, res: Response): Promise<void>;
    updateUser(req: Request, res: Response): Promise<void>;
    deleteUser(req: Request, res: Response): Promise<void>;
    toggleUserStatus(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=user.controller.d.ts.map