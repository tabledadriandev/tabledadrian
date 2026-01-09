import { Router } from 'express';
import { recipeController } from '../controllers/recipe.controller';

const router = Router();

router.get('/', recipeController.getRecipes);
router.get('/:slug', recipeController.getRecipe);
router.get('/filter/health', recipeController.filterByHealth);

export default router;
