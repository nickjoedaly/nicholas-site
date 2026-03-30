import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async ({ url, redirect }, next) => {
  // Admin routes will require authentication (implemented in Phase 5)
  if (url.pathname.startsWith('/admin')) {
    // TODO: Check session cookie against ADMIN_PASSWORD
    // For now, allow all access during development
  }

  return next();
});
