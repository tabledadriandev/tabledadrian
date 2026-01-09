import { Router } from 'express';
import { bmiController } from '../controllers/bmi.controller';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/calculate', authenticateToken, bmiController.calculateBMI);
router.get('/history', authenticateToken, bmiController.getHistory);

export default router;
