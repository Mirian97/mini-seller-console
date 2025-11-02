import * as SentryBrowser from "@sentry/browser";
import * as Sentry from "@sentry/tanstackstart-react";

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  sendDefaultPii: true,
  sendDefaultPii: true,
  integrations: [
    SentryBrowser.browserTracingIntegration(),
    SentryBrowser.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
