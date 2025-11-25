"use strict";
// import { Request, Response, NextFunction } from 'express';
// export interface AuthRequest extends Request {
//   user?: {
//     id: string;
//     email: string;
//     role: 'user' | 'admin';
//   };
// }
// export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization?.replace('Bearer ', '');
//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: 'Authentication required',
//     });
//   }
//   // Mock user data for now
//   req.user = {
//     id: 'user-123',
//     email: 'admin@wedding.com',
//     role: 'admin',
//   };
//   next();
// };
// export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
//   if (!req.user) {
//     return res.status(401).json({
//       success: false,
//       message: 'Authentication required',
//     });
//   }
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({
//       success: false,
//       message: 'Admin access required',
//     });
//   }
//   next();
// };
// export const requireUser = (req: AuthRequest, res: Response, next: NextFunction) => {
//   if (!req.user) {
//     return res.status(401).json({
//       success: false,
//       message: 'Authentication required',
//     });
//   }
//   next();
// };
//# sourceMappingURL=auth.middleware.js.map