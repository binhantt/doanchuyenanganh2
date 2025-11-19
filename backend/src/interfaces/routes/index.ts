import { Router } from 'express';
import userRoutes from './user';
import adminRoutes from './admin';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../../application/services/AuthService';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';

const router = Router();

// Auth routes
const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.post('/auth/login', (req, res) => authController.login(req, res));
router.get('/auth/verify', (req, res) => authController.verify(req, res));

router.use('/user', userRoutes);
router.use('/admin', adminRoutes);

export default router;
