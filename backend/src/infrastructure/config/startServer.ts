import { testConnection } from '../../infrastructure/database/connection';
import { APP_CONFIG } from '../../infrastructure/config/constants';

export const startServer = async (app) => {
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
