import { Request, Response } from 'express';
export declare class MonitoringController {
    getActiveConnections(req: Request, res: Response): Promise<void>;
    getConnectionStats(req: Request, res: Response): Promise<void>;
    getConnectionsByType(req: Request, res: Response): Promise<void>;
    getDashboard(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=monitoring.controller.d.ts.map