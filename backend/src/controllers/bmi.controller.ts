import { Response } from 'express';
import { supabase } from '../config/database';
import { AuthRequest } from '../middleware/auth';

function calculateBMI(heightCm: number, weightKg: number): number {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

export const bmiController = {
  async calculateBMI(req: AuthRequest, res: Response) {
    try {
      const { height_cm, weight_kg, body_fat_estimate, recommendations } = req.body;

      const bmi = calculateBMI(height_cm, weight_kg);
      const category = getBMICategory(bmi);

      const { data: calculation, error } = await supabase
        .from('bmi_calculations')
        .insert({
          user_id: req.user!.id,
          height_cm,
          weight_kg,
          bmi: parseFloat(bmi.toFixed(2)),
          category,
          body_fat_estimate: body_fat_estimate || null,
          recommendations: recommendations || null,
        })
        .select()
        .single();

      if (error) {
        return res.status(400).json({ error: 'BMI calculation failed' });
      }

      res.json(calculation);
    } catch (error) {
      res.status(500).json({ error: 'BMI calculation failed' });
    }
  },

  async getHistory(req: AuthRequest, res: Response) {
    try {
      const { data: history, error } = await supabase
        .from('bmi_calculations')
        .select('*')
        .eq('user_id', req.user!.id)
        .order('created_at', { ascending: false })
        .limit(30);

      if (error) {
        return res.status(500).json({ error: 'Failed to fetch BMI history' });
      }

      res.json(history);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch BMI history' });
    }
  },
};
