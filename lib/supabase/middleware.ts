/**
 * Supabase Middleware Session Synchronizer & Route Protector
 * MD. DANISH RAZA Portfolio — CMS Architecture (Step 2D)
 * 
 * Refreshes auth tokens across requests using @supabase/ssr.
 * Redirects unauthenticated requests away from protected /admin routes.
 */

import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin/login';
  const isLoginPage = pathname === '/admin/login';

  // Fallback if Supabase is unconfigured
  if (!url || !anonKey) {
    if (isAdminRoute) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      return NextResponse.redirect(loginUrl);
    }
    return supabaseResponse;
  }

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // Verify active user session
  let user = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    user = null;
  }

  // 1. Unauthenticated request to protected /admin/* -> redirect to /admin/login
  if (isAdminRoute && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/admin/login';
    return NextResponse.redirect(loginUrl);
  }

  // 2. Authenticated user visiting /admin/login -> redirect to /admin
  if (isLoginPage && user) {
    const adminUrl = request.nextUrl.clone();
    adminUrl.pathname = '/admin';
    return NextResponse.redirect(adminUrl);
  }

  return supabaseResponse;
}
