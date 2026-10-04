/**
 * Privileged Supabase Admin Client (SERVER-ONLY)
 * MD. DANISH RAZA Portfolio — CMS Integration
 * 
 * =========================================================================
 * SECURITY NOTICE:
 * This file MUST NEVER be imported in Client Components ('use client')
 * or exposed to browser code. It uses the SUPABASE_SECRET_KEY which has
 * full administrative privileges and bypasses Row Level Security (RLS).
 * =========================================================================
 */

import { createClient } from '@supabase/supabase-js';

export function isSupabaseAdminConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  return Boolean(url && secretKey && url.trim() !== '' && secretKey.trim() !== '');
}

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    return null;
  }

  return createClient(url, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
