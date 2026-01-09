import { Request, Response } from 'express';
import { supabase } from '../config/database';

export const recipeController = {
  async getRecipes(req: Request, res: Response) {
    try {
      const { category, dietary, health_condition } = req.query;

      let query = supabase.from('recipes').select('*');

      if (category) {
        query = query.eq('course_type', category);
      }

      if (dietary) {
        query = query.contains('dietary_tags', [dietary as string]);
      }

      if (health_condition) {
        query = query.contains('suitable_for', [health_condition as string]);
      }

      const { data: recipes, error } = await query;

      if (error) {
        return res.status(500).json({ error: 'Failed to fetch recipes' });
      }

      res.json(recipes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch recipes' });
    }
  },

  async getRecipe(req: Request, res: Response) {
    try {
      const { slug } = req.params;

      const { data: recipe, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error || !recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }

      res.json(recipe);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch recipe' });
    }
  },

  async filterByHealth(req: Request, res: Response) {
    try {
      const { conditions } = req.query;
      const conditionArray = Array.isArray(conditions) ? conditions : [conditions];

      const { data: recipes, error } = await supabase
        .from('recipes')
        .select('*')
        .overlaps('suitable_for', conditionArray as string[]);

      if (error) {
        return res.status(500).json({ error: 'Failed to filter recipes' });
      }

      res.json(recipes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to filter recipes' });
    }
  },
};
