"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsMiddleware = void 0;
const constants_1 = require("../../infrastructure/config/constants");
const corsMiddleware = (req, res, next) => {
    const origin = req.headers.origin;
    // Cho phép origin
    if (origin && (constants_1.APP_CONFIG.CORS_ORIGIN.includes(origin) || constants_1.APP_CONFIG.CORS_ORIGIN.includes("*"))) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    // Nếu là preflight OPTIONS request → trả ngay 204
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }
    next();
};
exports.corsMiddleware = corsMiddleware;
//# sourceMappingURL=cors.middleware.js.map