import knex, { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

export const databaseConfig: Knex.Config = {
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
const db = knex(databaseConfig);

export { db };
export default databaseConfig;
