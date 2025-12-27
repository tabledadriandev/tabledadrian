/**
 * Sentry Client Configuration
 * Runs in the browser
 */

// Optional dependency - gracefully handles when @sentry/nextjs is not installed
(function() {
  let Sentry: any = null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    Sentry = require('@sentry/nextjs');
  } catch {
    // Sentry not installed - client-side error tracking disabled
    return;
  }

  if (Sentry) {
    Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
    integrations: [
      new Sentry.BrowserTracing(),
      new Sentry.Replay({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    });
  }
})();
