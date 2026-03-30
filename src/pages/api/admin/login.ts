export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
  const formData = await request.formData();
  const password = formData.get('password') as string;

  const adminPassword = import.meta.env.ADMIN_PASSWORD || 'admin';

  if (password === adminPassword) {
    // Simple token — in production, use a proper session/JWT
    const token = btoa(`admin:${Date.now()}`);
    cookies.set('admin_session', token, {
      path: '/',
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
    });
    return redirect('/admin/compositions');
  }

  return redirect('/admin/login?error=1');
};
