/**
 * Redis Cache for Session Management
 * Optional dependency - gracefully handles when ioredis is not installed
 */

let Redis: any = null;
let redisClient: any = null;

// Try to load ioredis (optional dependency)
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  Redis = require('ioredis');
  redisClient = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD,
    retryStrategy: (times: number) => {
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
  });

  redisClient.on('error', (err: unknown) => {
    console.error('Redis Client Error:', err);
  });

  redisClient.on('connect', () => {
    console.log('✅ Redis connected');
  });
} catch {
  // ioredis not installed - Redis operations will be no-ops
  console.warn('ioredis not installed - Redis caching disabled');
}

export class RedisCache {
  /**
   * Get value from cache
   */
  async get(key: string): Promise<string | null> {
    if (!redisClient) return null;
    try {
      return await redisClient.get(key);
    } catch (error) {
      console.error('Redis get error:', error);
      return null;
    }
  }

  /**
   * Set value in cache
   */
  async set(key: string, value: string, expirySeconds?: number): Promise<boolean> {
    if (!redisClient) return false;
    try {
      if (expirySeconds) {
        await redisClient.setex(key, expirySeconds, value);
      } else {
        await redisClient.set(key, value);
      }
      return true;
    } catch (error) {
      console.error('Redis set error:', error);
      return false;
    }
  }

  /**
   * Delete key from cache
   */
  async delete(key: string): Promise<boolean> {
    if (!redisClient) return false;
    try {
      await redisClient.del(key);
      return true;
    } catch (error) {
      console.error('Redis delete error:', error);
      return false;
    }
  }

  /**
   * Cache session
   */
  async cacheSession(sessionToken: string, userData: any, expirySeconds: number = 86400): Promise<boolean> {
    return this.set(`session:${sessionToken}`, JSON.stringify(userData), expirySeconds);
  }

  /**
   * Get cached session
   */
  async getSession(sessionToken: string): Promise<any | null> {
    const data = await this.get(`session:${sessionToken}`);
    return data ? JSON.parse(data) : null;
  }

  /**
   * Cache user progress
   */
  async cacheUserProgress(userId: string, progress: any): Promise<boolean> {
    return this.set(`progress:${userId}`, JSON.stringify(progress), 3600); // 1 hour
  }

  /**
   * Get cached user progress
   */
  async getUserProgress(userId: string): Promise<any | null> {
    const data = await this.get(`progress:${userId}`);
    return data ? JSON.parse(data) : null;
  }
}

export const redisCache = new RedisCache();
export default redisClient;

