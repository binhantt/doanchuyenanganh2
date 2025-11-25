"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const connection_1 = require("../../infrastructure/database/connection");
const constants_1 = require("../../infrastructure/config/constants");
const startServer = async (app) => {
    try {
        const isConnected = await (0, connection_1.testConnection)();
        if (!isConnected) {
            console.error('❌ Failed to connect to database');
            process.exit(1);
        }
        console.log('✅ Database connected successfully');
        app.listen(constants_1.APP_CONFIG.PORT, () => {
            console.log(`🚀 Server running on port ${constants_1.APP_CONFIG.PORT}`);
            console.log(`📍 Environment: ${constants_1.APP_CONFIG.NODE_ENV}`);
            console.log(`📍 Health check: http://localhost:${constants_1.APP_CONFIG.PORT}/health`);
            console.log(`📍 User API: http://localhost:${constants_1.APP_CONFIG.PORT}/api/user`);
            console.log(`📍 Admin API: http://localhost:${constants_1.APP_CONFIG.PORT}/api/admin`);
        });
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};
exports.startServer = startServer;
//# sourceMappingURL=startServer.js.map