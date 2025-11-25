"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./interfaces/routes"));
const error_middleware_1 = require("./interfaces/middlewares/error.middleware");
const startServer_1 = require("./infrastructure/config/startServer");
const cors_middleware_1 = require("./interfaces/middlewares/cors.middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(cors_middleware_1.corsMiddleware);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api', routes_1.default);
app.use(error_middleware_1.notFoundHandler);
app.use(error_middleware_1.errorHandler);
(0, startServer_1.startServer)(app);
//# sourceMappingURL=server.js.map