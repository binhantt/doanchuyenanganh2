// Parse CORS origins from environment variable
const parseCorsOrigins = (): string[] => {
  const corsEnv = process.env.CORS_ORIGIN;
  
  if (!corsEnv) {
    return [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'http://192.168.1.2:3000',
      'http://192.168.1.3:3000',
      'http://192.168.1.4:3000',
      'http://192.168.1.5:3000',
    ];
  }

  // If it's a comma-separated string, split it
  if (typeof corsEnv === 'string' && corsEnv.includes(',')) {
    return corsEnv.split(',').map(origin => origin.trim());
  }

  // Otherwise return as array
  return [corsEnv];
};

export const APP_CONFIG = {
  PORT: process.env.PORT || 4000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  CORS_ORIGIN: parseCorsOrigins(),
};

export const DB_CONFIG = {
  HOST: process.env.DB_HOST || '127.0.0.1',
  PORT: Number(process.env.DB_PORT) || 3306,
  USER: process.env.DB_USER || 'root',
  PASSWORD: process.env.DB_PASS || '',
  DATABASE: process.env.DB_NAME || 'wedding_service',
};

export const VALIDATION_RULES = {
  SERVICE_NAME_MAX_LENGTH: 100,
  SERVICE_SHORT_DESC_MAX_LENGTH: 200,
  MIN_FEATURES: 1,
  MIN_PRICE: 0,
};
