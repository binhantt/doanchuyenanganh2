"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateActivity = exports.trackConnection = void 0;
const uuid_1 = require("uuid");
const connectionTracker_1 = require("../../shared/utils/connectionTracker");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const trackConnection = (req, res, next) => {
    // Generate unique connection ID
    const connectionId = (0, uuid_1.v4)();
    req.connectionId = connectionId;
    // Get IP address
    const ip = req.headers['x-forwarded-for']?.split(',')[0] ||
        req.socket.remoteAddress ||
        'unknown';
    // Get user agent
    const userAgent = req.headers['user-agent'] || 'unknown';
    // Determine user type from token
    let userType = 'guest';
    let userId;
    let orderId;
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (token) {
        try {
            const secret = process.env.JWT_SECRET || 'wedding-app-secret-key';
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            if (decoded.role === 'admin') {
                userType = 'admin';
                userId = decoded.userId;
            }
            else if (decoded.type === 'customer' || decoded.orderId) {
                userType = 'customer';
                orderId = decoded.orderId;
            }
            req.userType = userType;
            req.userId = userId;
            req.orderId = orderId;
        }
        catch (error) {
            // Invalid token, keep as guest
        }
    }
    // Add connection
    connectionTracker_1.connectionTracker.addConnection(connectionId, {
        userId,
        orderId,
        userType,
        ip,
        userAgent,
        endpoint: `${req.method} ${req.path}`,
    });
    // Update activity on response
    res.on('finish', () => {
        connectionTracker_1.connectionTracker.updateActivity(connectionId, `${req.method} ${req.path}`);
    });
    // Remove connection after response (with delay for stats)
    res.on('close', () => {
        setTimeout(() => {
            connectionTracker_1.connectionTracker.removeConnection(connectionId);
        }, 1000);
    });
    next();
};
exports.trackConnection = trackConnection;
// Middleware to update activity
const updateActivity = (req, res, next) => {
    if (req.connectionId) {
        connectionTracker_1.connectionTracker.updateActivity(req.connectionId, `${req.method} ${req.path}`);
    }
    next();
};
exports.updateActivity = updateActivity;
//# sourceMappingURL=connectionTracker.middleware.js.map