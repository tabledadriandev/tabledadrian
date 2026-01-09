import { Response } from 'express';
import { getOpenAIClient } from '../config/mcp';
import { AuthRequest } from '../middleware/auth';

export const aiController = {
  async analyzeBody(req: AuthRequest, res: Response) {
    try {
      const { image_base64, height_cm, age, gender } = req.body;
      const openai = getOpenAIClient();

      if (!openai) {
        return res.status(503).json({ error: 'AI service not available' });
      }

      const response = await openai.chat.completions.create({
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'system',
            content: `You are a body composition analysis assistant. Analyze the provided image to estimate body fat percentage and body type. The user has provided: height ${height_cm}cm, age ${age}, gender ${gender}. Provide estimates for body fat percentage range, body type, visible muscle mass assessment, and recommendations for nutrition focus. Be encouraging and health-focused. Always include a disclaimer that this is an estimate and not medical advice.`,
          },
          {
            role: 'user',
            content: [
              { type: 'text', text: 'Please analyze this body composition photo.' },
              { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${image_base64}` } },
            ],
          },
        ],
      });

      const analysis = response.choices[0]?.message?.content;

      res.json({ analysis });
    } catch (error) {
      res.status(500).json({ error: 'Body analysis failed' });
    }
  },

  async getRecipeSuggestions(req: AuthRequest, res: Response) {
    try {
      const { bmi_category, health_conditions, dietary_preferences } = req.body;
      const openai = getOpenAIClient();

      if (!openai) {
        return res.status(503).json({ error: 'AI service not available' });
      }

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a nutrition advisor for a luxury private chef service. Suggest recipes based on BMI category, health conditions, and dietary preferences.',
          },
          {
            role: 'user',
            content: `Suggest recipes for BMI category: ${bmi_category}, Health conditions: ${health_conditions.join(', ')}, Dietary preferences: ${dietary_preferences.join(', ')}`,
          },
        ],
      });

      const suggestions = response.choices[0]?.message?.content;

      res.json({ suggestions });
    } catch (error) {
      res.status(500).json({ error: 'Recipe suggestions failed' });
    }
  },
};
