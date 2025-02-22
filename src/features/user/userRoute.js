import express from 'express';
import { getUserController } from './userController.js';
import { authenticate } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', authenticate, getUserController);

export default router;
