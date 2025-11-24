import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { connectionTracker } from '../../shared/utils/connectionTracker';
import jwt from 'jsonwebtoken';

// Extend Express Request type
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

export const trackConnection = (req: Request, res: Response, next: NextFunction): void => {
  // Generate unique connection ID
  const connectionId = uuidv4();
  req.connectionId = connectionId;

  // Get IP address
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 
              req.socket.remoteAddress || 
              'unknown';

  // Get user agent
  const userAgent = req.headers['user-agent'] || 'unknown';

  // Determine user type from token
  let userType: 'admin' | 'customer' | 'guest' = 'guest';
  let userId: string | undefined;
  let orderId: string | undefined;

  const token = req.headers.authorization?.replace('Bearer ', '');
  if (token) {
    try {
      const secret = process.env.JWT_SECRET || 'wedding-app-secret-key';
      const decoded = jwt.verify(token, secret) as any;
      
      if (decoded.role === 'admin') {
        userType = 'admin';
        userId = decoded.userId;
      } else if (decoded.type === 'customer' || decoded.orderId) {
        userType = 'customer';
        orderId = decoded.orderId;
      }

      req.userType = userType;
      req.userId = userId;
      req.orderId = orderId;
    } catch (error) {
      // Invalid token, keep as guest
    }
  }

  // Add connection
  connectionTracker.addConnection(connectionId, {
    userId,
    orderId,
    userType,
    ip,
    userAgent,
    endpoint: `${req.method} ${req.path}`,
  });

  // Update activity on response
  res.on('finish', () => {
    connectionTracker.updateActivity(connectionId, `${req.method} ${req.path}`);
  });

  // Remove connection after response (with delay for stats)
  res.on('close', () => {
    setTimeout(() => {
      connectionTracker.removeConnection(connectionId);
    }, 1000);
  });

  next();
};

// Middleware to update activity
export const updateActivity = (req: Request, res: Response, next: NextFunction): void => {
  if (req.connectionId) {
    connectionTracker.updateActivity(req.connectionId, `${req.method} ${req.path}`);
  }
  next();
};
