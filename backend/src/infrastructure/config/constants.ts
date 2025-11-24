// Parse CORS origins from environment variable

export const APP_CONFIG = {
  PORT: process.env.PORT || 4000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  CORS_ORIGIN: [  'http://localhost:3000',
      'http://127.0.0.1:3000',
      'http://localhost:3001',  // Admin panel
      'http://127.0.0.1:3001',  // Admin panel
      'http://192.168.1.2:3000',
      'http://192.168.1.3:3000',
      'http://192.168.1.4:3000',
      'http://192.168.1.5:3000',
      'http://localhost:8001'
    ],
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
