"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.databaseConfig = void 0;
const knex_1 = __importDefault(require("knex"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.databaseConfig = {
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST || '127.0.0.1',
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || 'wedding_service',
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: 'migrations',
        directory: './src/infrastructure/database/migrations',
    },
    seeds: {
        directory: './src/infrastructure/database/seeds',
    },
};
// Create and export db instance
const db = (0, knex_1.default)(exports.databaseConfig);
exports.db = db;
exports.default = exports.databaseConfig;
//# sourceMappingURL=database.js.map