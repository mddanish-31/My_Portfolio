/**
 * Supabase Server Client & Auth Session Helpers
 * MD. DANISH RAZA Portfolio — CMS Architecture (Step 2D)
 * 
 * For Server Components, Server Actions, and Route Handlers.
 * Synchronizes cookies across requests using @supabase/ssr.
 * Validates admin roles via public.admin_users table.
 */

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { User } from '@supabase/supabase-js';

export interface AdminUserRecord {
  user_id: string;
  role: 'admin' | 'superadmin';
  created_at: string;
}

export interface AdminSession {
  user: User;
  adminRecord: AdminUserRecord;
}

export function isSupabaseServerConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  return Boolean(url && anonKey && url.trim() !== '' && anonKey.trim() !== '');
}

export async function createServerSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !anonKey) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // Ignored if middleware is refreshing user sessions.
        }
      },
    },
  });
}

/**
 * Gets the current authenticated Supabase user (if any).
 */
export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return null;

  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;
    return user;
  } catch {
    return null;
  }
}

/**
 * Validates whether the current authenticated user is an authorized admin.
 * Evaluates authorization securely via PostgreSQL SECURITY DEFINER helpers (is_superadmin, is_admin).
 * Returns the admin session if authorized, or null if unauthenticated / unauthorized.
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return null;

  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return null;

    // Check admin authorization via database SECURITY DEFINER RPC helpers
    const [{ data: isSuperAdmin }, { data: isAdmin }] = await Promise.all([
      supabase.rpc('is_superadmin'),
      supabase.rpc('is_admin'),
    ]);

    if (!isSuperAdmin && !isAdmin) {
      return null;
    }

    const role: 'admin' | 'superadmin' = isSuperAdmin ? 'superadmin' : 'admin';

    let createdAt = user.created_at || new Date().toISOString();
    try {
      const { data: adminRecord } = await supabase
        .from('admin_users')
        .select('created_at')
        .eq('user_id', user.id)
        .maybeSingle();

      if (adminRecord?.created_at) {
        createdAt = adminRecord.created_at;
      }
    } catch {
      // Non-critical fallback to user.created_at
    }

    return {
      user,
      adminRecord: {
        user_id: user.id,
        role,
        created_at: createdAt,
      },
    };
  } catch {
    return null;
  }
}

