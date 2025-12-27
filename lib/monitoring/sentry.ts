/**
 * Sentry Error Tracking Integration
 * Monitors errors and performance in production
 * Optional dependency - gracefully handles when @sentry/nextjs is not installed
 */

let Sentry: any = null;

// Try to load Sentry (optional dependency)
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  Sentry = require('@sentry/nextjs');
} catch {
  // Sentry not installed - functions will be no-ops
  console.warn('@sentry/nextjs not installed - error tracking disabled');
}

/**
 * Initialize Sentry
 */
export function initSentry() {
  if (!Sentry) {
    console.warn('Sentry not available - error tracking disabled');
    return;
  }

  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  
  if (!dsn) {
    console.warn('Sentry DSN not configured - error tracking disabled');
    return;
  }

  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV || 'development',
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    integrations: [
      new Sentry.BrowserTracing(),
      new Sentry.Replay(),
    ],
  });
}

/**
 * Capture exception
 */
export function captureException(error: Error, context?: Record<string, any>) {
  if (!Sentry) return;
  Sentry.captureException(error, {
    extra: context,
  });
}

/**
 * Capture message
 */
export function captureMessage(message: string, level: 'info' | 'warning' | 'error' | 'fatal' | 'debug' = 'info') {
  if (!Sentry) return;
  Sentry.captureMessage(message, level);
}

/**
 * Set user context
 */
export function setUser(user: { id: string; email?: string; username?: string }) {
  if (!Sentry) return;
  Sentry.setUser(user);
}

/**
 * Add breadcrumb
 */
export function addBreadcrumb(message: string, category?: string, level?: 'info' | 'warning' | 'error' | 'fatal' | 'debug') {
  if (!Sentry) return;
  Sentry.addBreadcrumb({
    message,
    category,
    level: level || 'info',
  });
}
