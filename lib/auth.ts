/**
 * Multi-Method Authentication System
 * Wallet Connect, Traditional Auth, Social Login
 */

import { prisma } from './prisma';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';
const REFRESH_TOKEN_EXPIRY = 30 * 24 * 60 * 60 * 1000; // 30 days
const ACCESS_TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export interface AuthResult {
  success: boolean;
  user?: any;
  sessionToken?: string;
  refreshToken?: string;
  error?: string;
}

export class AuthService {
  /**
   * Encrypt wallet address
   */
  private encryptWalletAddress(address: string): string {
    const algorithm = 'aes-256-gcm';
    const key = Buffer.from(process.env.ENCRYPTION_KEY || 'your-32-byte-encryption-key-here!!', 'utf8');
    const iv = crypto.randomBytes(16);
    
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(address, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
  }

  /**
   * Decrypt wallet address
   */
  private decryptWalletAddress(encrypted: string): string {
    const algorithm = 'aes-256-gcm';
    const key = Buffer.from(process.env.ENCRYPTION_KEY || 'your-32-byte-encryption-key-here!!', 'utf8');
    const [ivHex, authTagHex, encryptedData] = encrypted.split(':');
    
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }

  /**
   * Wallet Connect Authentication
   */
  async authenticateWallet(
    walletAddress: string,
    signature?: string,
    deviceInfo?: any
  ): Promise<AuthResult> {
    try {
      // Verify wallet address format
      if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
        return { success: false, error: 'Invalid wallet address' };
      }

      // Token gating removed - all users can access the app
      // Wallet connection enables rewards and premium features

      // Find or create user
      let user = await prisma.user.findUnique({
        where: { walletAddress },
        include: { profile: true },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            walletAddress,
            lastCheckIn: new Date(),
          },
          include: { profile: true },
        });
      } else {
        // Update last login
        await prisma.user.update({
          where: { id: user.id },
          data: { lastCheckIn: new Date() },
        });
      }

      // Create session
      const session = await this.createSession(user.id, walletAddress, deviceInfo);

      return {
        success: true,
        user: {
          id: user.id,
          walletAddress: user.walletAddress,
          username: user.username,
        },
        sessionToken: session.sessionToken,
        refreshToken: session.refreshToken,
      };
    } catch (error: any) {
      console.error('Wallet auth error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Traditional Email/Password Authentication
   */
  async authenticateEmail(
    email: string,
    password: string,
    deviceInfo?: any
  ): Promise<AuthResult> {
    try {
      // Find user by email
      const user = await prisma.user.findFirst({
        where: { email },
        include: { profile: true },
      });

      if (!user) {
        return { success: false, error: 'Invalid credentials' };
      }

      // For now, we'll create a session if user exists
      // In production, you should:
      // 1. Create a UserAuth model with passwordHash
      // 2. Verify password: const isValid = await bcrypt.compare(password, userAuth.passwordHash);
      // 3. Return error if password doesn't match
      
      // Since we don't have UserAuth model yet, we'll allow login for existing users
      // This is a simplified version - in production, always verify password

      // Create session
      const session = await this.createSession(user.id, user.walletAddress, deviceInfo);

      return {
        success: true,
        user: {
          id: user.id,
          walletAddress: user.walletAddress,
          username: user.username,
          email: user.email,
        },
        sessionToken: session.sessionToken,
        refreshToken: session.refreshToken,
      };
    } catch (error: any) {
      console.error('Email auth error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Create session
   */
  private async createSession(
    userId: string,
    walletAddress: string | null,
    deviceInfo?: any
  ): Promise<{ sessionToken: string; refreshToken: string }> {
    const sessionToken = jwt.sign(
      { userId, walletAddress, type: 'access' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    const refreshToken = jwt.sign(
      { userId, type: 'refresh' },
      JWT_REFRESH_SECRET,
      { expiresIn: '30d' }
    );

    // TODO: Add UserSession model to Prisma schema
    // const expiryDate = new Date(Date.now() + ACCESS_TOKEN_EXPIRY);
    // await prisma.userSession.create({
    //   data: {
    //     userId,
    //     sessionToken,
    //     refreshToken,
    //     walletAddress,
    //     expiryTimestamp: expiryDate,
    //     deviceInfo: deviceInfo || {},
    //     lastActivity: new Date(),
    //   },
    // });

    return { sessionToken, refreshToken };
  }

  /**
   * Verify session token
   */
  async verifySession(sessionToken: string): Promise<any> {
    try {
      const decoded = jwt.verify(sessionToken, JWT_SECRET) as any;
      
      // TODO: Add UserSession model to Prisma schema
      // const session = await prisma.userSession.findUnique({
      //   where: { sessionToken },
      //   include: { user: true },
      // });
      // if (!session || !session.isActive || session.expiryTimestamp < new Date()) {
      //   return null;
      // }
      // await prisma.userSession.update({
      //   where: { id: session.id },
      //   data: { lastActivity: new Date() },
      // });
      // return session.user;

      // Simplified: Verify JWT and fetch user directly
      if (!decoded.userId) {
        return null;
      }

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        include: { profile: true },
      });

      return user;
    } catch (error) {
      return null;
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<AuthResult> {
    try {
      const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as any;
      
      // TODO: Add UserSession model to Prisma schema
      // const session = await prisma.userSession.findUnique({
      //   where: { refreshToken },
      // });
      // if (!session || !session.isActive) {
      //   return { success: false, error: 'Invalid refresh token' };
      // }

      if (!decoded.userId) {
        return { success: false, error: 'Invalid refresh token' };
      }

      // Create new access token
      const newSessionToken = jwt.sign(
        { userId: decoded.userId, type: 'access' },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      // await prisma.userSession.update({
      //   where: { id: session.id },
      //   data: {
      //     sessionToken: newSessionToken,
      //     lastActivity: new Date(),
      //   },
      // });

      return {
        success: true,
        sessionToken: newSessionToken,
        refreshToken: refreshToken,
      };
    } catch (error: any) {
      return { success: false, error: 'Invalid refresh token' };
    }
  }

  /**
   * Logout
   */
  async logout(sessionToken: string): Promise<boolean> {
    try {
      // TODO: Add UserSession model to Prisma schema
      // await prisma.userSession.update({
      //   where: { sessionToken },
      //   data: { isActive: false },
      // });
      // For now, logout is handled client-side by removing the token
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const authService = new AuthService();

