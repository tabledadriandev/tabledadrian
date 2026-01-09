import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  logger.error('Error:', {
    message,
    statusCode,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  if (process.env.NODE_ENV === 'production') {
    return res.status(statusCode).json({
      error: statusCode === 500 ? 'Internal server error' : message,
    });
  }

  return res.status(statusCode).json({
    error: message,
    stack: err.stack,
  });
}

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ error: 'Route not found' });
}
