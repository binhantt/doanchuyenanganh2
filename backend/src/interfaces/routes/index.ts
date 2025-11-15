import { Router } from 'express';
import userRoutes from './user';
import adminRoutes from './admin';

const router = Router();

// Mount route groups
router.use('/user', userRoutes);
router.use('/admin', adminRoutes);

// Root health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is healthy',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

export default router;
