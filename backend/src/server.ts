import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './interfaces/routes';
import { errorHandler, notFoundHandler } from './interfaces/middlewares/error.middleware';
import { testConnection } from './infrastructure/database/connection';
import { APP_CONFIG } from './infrastructure/config/constants';

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: APP_CONFIG.CORS_ORIGIN }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', apiRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    const isConnected = await testConnection();
    
    if (!isConnected) {
      console.error('❌ Failed to connect to database');
      process.exit(1);
    }

    console.log('✅ Database connected successfully');

    app.listen(APP_CONFIG.PORT, () => {
      console.log(`🚀 Server running on port ${APP_CONFIG.PORT}`);
      console.log(`📍 Environment: ${APP_CONFIG.NODE_ENV}`);
      console.log(`📍 Health check: http://localhost:${APP_CONFIG.PORT}/health`);
      console.log(`📍 User API: http://localhost:${APP_CONFIG.PORT}/api/user`);
      console.log(`📍 Admin API: http://localhost:${APP_CONFIG.PORT}/api/admin`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
