import { Router } from 'express';
import { aiController } from '../controllers/ai.controller';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/analyze-body', authenticateToken, aiController.analyzeBody);
router.post('/recipe-suggestions', authenticateToken, aiController.getRecipeSuggestions);

export default router;
