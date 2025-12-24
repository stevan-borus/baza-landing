import posthog from 'posthog-js';

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: '/ingest',
  ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  defaults: '2025-05-24',
  capture_exceptions: true,
  debug: process.env.NODE_ENV === 'development',
  // Fix cookie domain issues when using reverse proxy
  // This ensures cookies are set for the current domain, not PostHog's domain
  cross_subdomain_cookie: false,
  // When using reverse proxy, cookies should be set for current domain
  // The browser will handle this automatically, but we disable cross-subdomain
  // to prevent domain mismatch issues
});
