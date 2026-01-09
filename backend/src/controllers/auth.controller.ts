import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/database';
import { validatePassword } from '../config/security';
import { AuthRequest } from '../middleware/auth';

export const authController = {
  async register(req: Request, res: Response) {
    try {
      const { email, password, full_name, phone } = req.body;

      const passwordValidation = validatePassword(password);
      if (!passwordValidation.valid) {
        return res.status(400).json({ errors: passwordValidation.errors });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

      if (authError || !authUser.user) {
        return res.status(400).json({ error: 'Registration failed' });
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authUser.user.id,
          email,
          full_name,
          phone,
        });

      if (profileError) {
        await supabase.auth.admin.deleteUser(authUser.user.id);
        return res.status(400).json({ error: 'Profile creation failed' });
      }

      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
      }
      const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
      const token = jwt.sign(
        { userId: authUser.user.id, email },
        process.env.JWT_SECRET,
        { expiresIn } as jwt.SignOptions
      );

      res.status(201).json({
        token,
        user: {
          id: authUser.user.id,
          email,
          full_name,
        },
      });
    } catch (error) {
      res.status(500).json({ error: 'Registration failed' });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError || !authData.user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('id, email, full_name, role')
        .eq('id', authData.user.id)
        .single();

      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
      }
      const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
      const token = jwt.sign(
        { userId: authData.user.id, email },
        process.env.JWT_SECRET,
        { expiresIn } as jwt.SignOptions
      );

      res.json({
        token,
        user: profile,
      });
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  },

  async logout(req: Request, res: Response) {
    res.json({ message: 'Logged out successfully' });
  },

  async getProfile(req: AuthRequest, res: Response) {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('id, email, full_name, phone, avatar_url, role, dietary_restrictions, health_conditions')
        .eq('id', req.user!.id)
        .single();

      if (error || !profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }

      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
  },
};
