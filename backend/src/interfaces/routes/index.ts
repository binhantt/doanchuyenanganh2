import { Router } from 'express';

import userRoutes from './user';
import adminRoutes from './admin';
import appRoutes from './app';
import { trackConnection } from '../middlewares/connectionTracker.middleware';

const router = Router();

// Apply connection tracking middleware to all routes
router.use(trackConnection);

// Protected routes
router.use('/user', userRoutes);
router.use('/admin', adminRoutes);
router.use('/v1/app', appRoutes);

export default router;
