import { Request, Response, NextFunction } from 'express';
declare global {
    namespace Express {
        interface Request {
            connectionId?: string;
            userType?: 'admin' | 'customer' | 'guest';
            userId?: string;
            orderId?: string;
        }
    }
}
export declare const trackConnection: (req: Request, res: Response, next: NextFunction) => void;
export declare const updateActivity: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=connectionTracker.middleware.d.ts.map