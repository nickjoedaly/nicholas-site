import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async ({ url, cookies, redirect }, next) => {
  const isAdminPage = url.pathname.startsWith('/admin') && url.pathname !== '/admin/login';
  const isAdminApi = url.pathname.startsWith('/api/admin') && url.pathname !== '/api/admin/login';

  if (isAdminPage || isAdminApi) {
    const session = cookies.get('admin_session')?.value;
    if (!session) {
      if (isAdminApi) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return redirect('/admin/login');
    }
  }

  return next();
});
