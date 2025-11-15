import knex from 'knex';
import config from '../../../knexfile';

export const db = knex(config);

export const testConnection = async (): Promise<boolean> => {
  try {
    await db.raw('SELECT 1');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
};
